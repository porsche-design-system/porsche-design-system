import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { sync as globbySync } from 'fast-glob';
import {
  nodesUnreachable,
  type PreviewResult,
  unreachable,
  uploadFailures,
  validationFailures,
} from '../figma/cliOutput';

// Runs `figma connect <command>` per Dev Mode label; `publish` uploads every record that renders and validates, after
// `figma:generate --check`. Exit codes and rationale: docs/figma-code-connect.md.
const unrendered: string[] = [];
const unreached: string[] = [];
const configs = ['figma.config.json', 'figma.react.config.json', 'figma.angular.config.json', 'figma.vue.config.json'];

type Run = { status: number; stdout: string; stderr: string };
const run = (command: string, args: string[], opts: { capture?: boolean; allowFailure?: boolean } = {}): Run => {
  console.log(`\n▶ ${command} ${args.join(' ')}`);
  const { status, stdout, stderr } = spawnSync(command, args, {
    stdio: opts.capture ? ['inherit', 'pipe', 'pipe'] : 'inherit',
    encoding: 'utf8',
  });
  if (opts.capture && stderr) process.stderr.write(stderr); // the workflow's log needs the CLI's own lines
  if (status !== 0 && !opts.allowFailure) {
    if (opts.capture && stdout) process.stdout.write(stdout);
    process.exit(status ?? 1);
  }
  return { status: status ?? 1, stdout: stdout ?? '', stderr: stderr ?? '' };
};
// Without --exit-on-unreadable-files the CLI silently drops a template it cannot parse.
const figma = (
  config: string,
  command: string,
  args: string[],
  opts?: { capture?: boolean; allowFailure?: boolean }
): Run => run('npx', ['figma', 'connect', command, '--config', config, '--exit-on-unreadable-files', ...args], opts);

// With --output json stdout is exactly one JSON array, also when `preview` exits 1 because every template failed.
const previewResults = (config: string, files: string[] = []): PreviewResult[] => {
  const { status, stdout } = figma(config, 'preview', ['--output', 'json', ...files.flatMap((f) => ['--file', f])], {
    capture: true,
    allowFailure: true,
  });
  try {
    return JSON.parse(stdout);
  } catch {
    process.stdout.write(stdout);
    process.exit(status || 1); // no result at all: a token or CLI error, or Figma's preview switched off
  }
};

const nodeIdOf = (url: string): string | undefined =>
  url
    .match(/node-id=(\d+)-(\d+)/)
    ?.slice(1)
    .join(':');

/** Every file a label config publishes, keyed by the node id its `// url=` (or each batch entry) points at. */
const filesByNode = (config: string): Map<string, string> => {
  const { codeConnect } = JSON.parse(readFileSync(config, 'utf8'));
  const map = new Map<string, string>();
  for (const file of globbySync(codeConnect.include, { ignore: codeConnect.exclude ?? [] })) {
    const urls: string[] = file.endsWith('.json')
      ? JSON.parse(readFileSync(file, 'utf8')).components.map((c: { url: string }) => c.url)
      : [readFileSync(file, 'utf8').match(/^\/\/ url=(.+)$/m)?.[1] ?? ''];
    for (const url of urls) {
      const id = nodeIdOf(url);
      if (id) map.set(id, file);
    }
  }
  return map;
};

/** Publish one label: everything that renders and validates goes up; the refused files are returned. */
const publishValid = (config: string, args: string[], dryRun: boolean): string[] => {
  const files = filesByNode(config);
  const excluded = new Set<string>();
  const unchecked = new Set<string>();
  // a preview failure counts only when it repeats: Figma's preview also fails now and then on its own
  const failedOnce = [
    ...new Set(
      previewResults(config)
        .filter((r) => !r.success)
        .map((r) => r.filePath)
    ),
  ];
  for (const result of failedOnce.length ? previewResults(config, failedOnce) : []) {
    if (!result.success) {
      console.error(`✖ ${result.filePath}: ${result.error}`);
      if (unreachable(result)) {
        unchecked.add(result.filePath);
        unreached.push(`${config}: ${result.filePath}`);
      } else {
        excluded.add(result.filePath);
        unrendered.push(`${config}: ${result.filePath}`); // a template that does not render is the developer's problem
      }
    }
  }
  // the dry run is the CLI's validation of each record's node: it exists and is a component set
  const dry = figma(config, 'publish', ['--dry-run'], { capture: true, allowFailure: true });
  const log = `${dry.stdout}\n${dry.stderr}`;
  const failed = validationFailures(log);
  for (const url of failed) {
    const file = files.get(nodeIdOf(url) ?? '');
    if (file) excluded.add(file);
  }
  if (dry.status !== 0 && failed.length === 0) {
    // not a validation failure: Figma could not be reached, exit 2 as in figma:generate, or a token or CLI error
    process.exit(nodesUnreachable(log) ? 2 : dry.status);
  }
  const publishable = [...new Set(files.values())].filter((file) => !excluded.has(file) && !unchecked.has(file));
  if (publishable.length && !dryRun) {
    // --force overwrites a designer's UI record; --skip-validation because the dry run just validated the same records
    const upload = figma(
      config,
      'publish',
      ['--force', '--skip-validation', ...args, ...publishable.flatMap((f) => ['--file', f])],
      { capture: true }
    );
    process.stdout.write(upload.stdout);
    for (const failure of uploadFailures(`${upload.stdout}\n${upload.stderr}`)) {
      const file = files.get(nodeIdOf(failure.url) ?? '');
      if (file) {
        console.error(`✖ ${file}: the server refused ${failure.component} (${failure.reason})`);
        excluded.add(file);
      }
    }
  }
  if (dryRun) console.log(`dry run: ${publishable.length} file(s) would be published for ${config}`);
  return [...excluded];
};

const [command, ...args] = process.argv.slice(2);
if (command === 'publish') {
  const dryRun = args.includes('--dry-run');
  // a stale file or a failed pull stops everything; a pull that could not read Figma keeps its exit 2
  const { status } = run('npm', ['run', 'figma:generate', '--', '--check'], { allowFailure: true });
  if (status !== 0) process.exit(status === 2 ? 2 : 1);
  const refused = configs.flatMap((config) => publishValid(config, args, dryRun).map((file) => `${config}: ${file}`));
  if (unreached.length) {
    console.error(
      `\n✖ Figma's preview could not be reached for ${unreached.length} file(s); they keep their previous record:\n${unreached.map((f) => `  - ${f}`).join('\n')}`
    );
  }
  if (refused.length) {
    console.error(
      `\n✖ Figma refused ${refused.length} file(s); they keep their previous record, everything else is published:\n${refused.map((f) => `  - ${f}`).join('\n')}`
    );
    if (unrendered.length) {
      console.error(
        `\n✖ ${unrendered.length} of them did not render in preview; a developer has to look at the template`
      );
    }
    // red wherever something was refused: a pull request's author fixes it there, and after a release no run retries it
    process.exit(1);
  }
  // exit 2 as figma:generate's: a pull request's dry run only warns, a release's publish is red
  if (unreached.length) process.exit(2);
  if (dryRun) console.log('\ndry run: nothing uploaded');
  else console.log('\nall records published');
} else {
  for (const config of configs) {
    if (command === 'preview') {
      const failed = previewResults(config).filter((r) => !r.success);
      if (failed.length) {
        console.error(failed.map((r) => `✖ ${r.filePath}: ${r.error}`).join('\n'));
        process.exit(1);
      }
      console.log('all templates rendered without error');
    } else {
      figma(config, command, args);
    }
  }
}
