import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { sync as globbySync } from 'fast-glob';

// Runs `figma connect <command>` per Dev Mode label; `publish` uploads every record that renders and validates, after
// `figma:generate --check`. Exit codes and rationale: docs/runbooks/figma-code-connect.md.
const unrendered: string[] = [];
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

// `preview` exits non-zero only when every template fails. With --output json stdout is exactly one JSON array.
type PreviewResult = { filePath: string; success: boolean; error?: string };
const previewResults = (config: string): PreviewResult[] => {
  const { stdout } = figma(config, 'preview', ['--output', 'json'], { capture: true });
  return JSON.parse(stdout);
};

// Figma's refusals exist only as these CLI log lines: an upload with refused records still exits successfully.
const validationFailures = (log: string): string[] =>
  [...log.matchAll(/^Validation failed for .+? \((https:\/\/\S+)\): /gm)].map(([, url]) => url);

type UploadFailure = { component: string; url: string; reason: string };
const uploadFailures = (log: string): UploadFailure[] => {
  const failures: UploadFailure[] = [];
  let inFailures = false;
  for (const raw of log.split('\n')) {
    // biome-ignore lint/suspicious/noControlCharactersInRegex: the CLI colours the component name and underlines the URL
    const line = raw.replace(/\x1b\[[0-9;]*m/g, '');
    if (/^Failed to upload to Figma, for .+:$/.test(line)) {
      inFailures = true;
      continue;
    }
    const record = line.match(/^-> (.+?) (https:\/\/\S+) \((.*)\)$/);
    if (inFailures && record) failures.push({ component: record[1], url: record[2], reason: record[3] });
    else if (line.trim() && !line.startsWith('->')) inFailures = false;
  }
  return failures;
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
  for (const result of previewResults(config)) {
    if (!result.success) {
      console.error(`✖ ${result.filePath}: ${result.error}`);
      excluded.add(result.filePath);
      unrendered.push(`${config}: ${result.filePath}`); // a template that does not render is the developer's problem
    }
  }
  // the dry run is the CLI's validation of each record's node: it exists and is a component set
  const dry = figma(config, 'publish', ['--dry-run'], { capture: true, allowFailure: true });
  const failed = validationFailures(`${dry.stdout}\n${dry.stderr}`);
  for (const url of failed) {
    const file = files.get(nodeIdOf(url) ?? '');
    if (file) excluded.add(file);
  }
  if (dry.status !== 0 && failed.length === 0) {
    process.exit(dry.status); // not a validation failure: token, network, unreadable file
  }
  const publishable = [...new Set(files.values())].filter((file) => !excluded.has(file));
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
  // a stale file or a failed pull stops everything
  if (run('npm', ['run', 'figma:generate', '--', '--check'], { allowFailure: true }).status !== 0) process.exit(1);
  const refused = configs.flatMap((config) => publishValid(config, args, dryRun).map((file) => `${config}: ${file}`));
  if (refused.length) {
    console.error(
      `\n✖ Figma refused ${refused.length} file(s); they keep their previous record, everything else is published:\n${refused.map((f) => `  - ${f}`).join('\n')}`
    );
    if (unrendered.length) {
      console.error(
        `\n✖ ${unrendered.length} of them did not render in preview; a developer has to look at the template`
      );
      process.exit(1);
    }
  }
  if (dryRun) console.log('\ndry run: nothing uploaded');
  else console.log(refused.length ? '\nall other records published' : '\nall records published');
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
