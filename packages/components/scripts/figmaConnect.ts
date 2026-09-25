import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { sync as globbySync } from 'fast-glob';

// Runs `figma connect <command>` once per Dev Mode label (one Code Connect config each). `publish` (unless --dry-run)
// first checks the templates are current, then per label publishes every record Figma's renderer and validation accept
// and holds back only the rest: a component the library moved away from (a renamed property, an option the template
// does not list) must not stop the other 56 and the icons. Held-back files are listed at the end and keep their
// previous record. Problems only design can fix are printed by `figma:generate --check` as design lines and never hold
// anything back here; Figma's validation is the only gate per record.
//
// Exit codes: 0 every record Figma accepted was uploaded, the files it refused are listed on stderr; 1 a developer must
// act: a repository mistake (a stale template, an invalid exception) or a CLI failure (token, network, an unreadable
// file) stopped the publish, or a template did not render in preview and was held back while the rest published.
// Labels upload one after another, so on 1 the labels before the failure may already be up.
const unrendered: string[] = [];
const configs = ['figma.config.json', 'figma.react.config.json', 'figma.angular.config.json', 'figma.vue.config.json'];

type Run = { status: number; stdout: string; stderr: string };
const run = (command: string, args: string[], opts: { capture?: boolean; allowFailure?: boolean } = {}): Run => {
  console.log(`\n▶ ${command} ${args.join(' ')}`);
  const { status, stdout, stderr } = spawnSync(command, args, {
    stdio: opts.capture ? ['inherit', 'pipe', 'pipe'] : 'inherit',
    encoding: 'utf8',
  });
  if (opts.capture && stderr) process.stderr.write(stderr); // echo it so the workflow's log carries the CLI's own lines
  if (status !== 0 && !opts.allowFailure) {
    if (opts.capture && stdout) process.stdout.write(stdout); // the caller never gets to print it
    process.exit(status ?? 1);
  }
  return { status: status ?? 1, stdout: stdout ?? '', stderr: stderr ?? '' };
};
// Without --exit-on-unreadable-files the CLI logs a template it cannot parse and goes on without it, so a broken helper
// import would silently drop that template from every command.
const figma = (
  config: string,
  command: string,
  args: string[],
  opts?: { capture?: boolean; allowFailure?: boolean }
): Run => run('npx', ['figma', 'connect', command, '--config', config, '--exit-on-unreadable-files', ...args], opts);

// `figma connect preview` exits non-zero only when every template fails, so one broken template in 228 would pass.
// With --output json the CLI writes exactly one JSON array to stdout (its logger writes to stderr).
type PreviewResult = { filePath: string; success: boolean; error?: string };
const previewResults = (config: string): PreviewResult[] => {
  const { stdout } = figma(config, 'preview', ['--output', 'json'], { capture: true });
  return JSON.parse(stdout);
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

/** Publish one label: everything that renders and validates goes up; the rest is returned. */
const publishValid = (config: string, args: string[]): string[] => {
  const files = filesByNode(config);
  const excluded = new Set<string>();
  for (const result of previewResults(config)) {
    if (!result.success) {
      console.error(`✖ ${result.filePath}: ${result.error}`);
      excluded.add(result.filePath);
      unrendered.push(`${config}: ${result.filePath}`); // a template Figma cannot render is the developer's, not design's
    }
  }
  // The dry run is the CLI's own validation (property names and options against the live component, see
  // patches/@figma+code-connect+2.0.0.patch); it names each failing record by its Figma URL.
  const dry = figma(config, 'publish', ['--dry-run'], { capture: true, allowFailure: true });
  const failed = [...`${dry.stdout}\n${dry.stderr}`.matchAll(/^Validation failed for .+? \((https:\/\/\S+)\): /gm)];
  for (const [, url] of failed) {
    const file = files.get(nodeIdOf(url) ?? '');
    if (file) excluded.add(file);
  }
  if (dry.status !== 0 && failed.length === 0) {
    process.exit(dry.status); // not a validation failure: token, network, unreadable file
  }
  const publishable = [...new Set(files.values())].filter((file) => !excluded.has(file));
  if (publishable.length) {
    // --force overwrites a UI record a designer created for the same node and label; records the CLI published are
    // overwritten either way
    figma(config, 'publish', ['--force', ...args, ...publishable.flatMap((f) => ['--file', f])]);
  }
  return [...excluded];
};

const [command, ...args] = process.argv.slice(2);
if (command === 'publish' && !args.includes('--dry-run')) {
  // A stale file or an invalid exception stops everything; the design lines it prints stop nothing.
  run('npm', ['run', 'figma:generate', '--', '--check']);
  const heldBack = configs.flatMap((config) => publishValid(config, args).map((file) => `${config}: ${file}`));
  if (heldBack.length) {
    console.error(
      `\n✖ held back ${heldBack.length} file(s) Figma did not accept; they keep their previous record, everything else is published:\n${heldBack.map((f) => `  - ${f}`).join('\n')}`
    );
    if (unrendered.length) {
      console.error(
        `\n✖ ${unrendered.length} of them did not render in preview; a developer has to look at the template`
      );
      process.exit(1);
    }
    console.log('\nall other records published');
  } else {
    console.log('\nall records published');
  }
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
