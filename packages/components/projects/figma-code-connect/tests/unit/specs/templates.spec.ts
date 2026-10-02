import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { describe, expect, it } from 'vitest';
import { baselinePath, generate } from '../../../figma/generate';
import { componentsPackagePath, pdsVersion } from '../../../figma/library';
import type { Snapshot } from '../../../figma/snapshot';

// Every generated file, rendered from a pull built from component-meta with made-up node ids: no Figma data committed.
// Templates read Figma properties when the snippet renders, so the sets need none.
const packageRoot = resolve(__dirname, '../../..');
const snapshotDir = resolve(__dirname, '__snapshots__');
const baseline: Record<string, string[]> = JSON.parse(readFileSync(resolve(packageRoot, baselinePath), 'utf8'));
const tags = TAG_NAMES.filter((tag) => !(INTERNAL_TAG_NAMES as readonly string[]).includes(tag));
const iconMeta = getComponentMeta('p-icon')?.propsMeta?.name?.allowedValues;
// what design draws: no deprecated component, nothing the baseline accepts as missing
const pull: Snapshot = {
  components: tags
    .filter((tag) => !getComponentMeta(tag)?.isDeprecated && !baseline[tag]?.includes('component-set'))
    .map((tag, i) => ({ id: `1:${i + 1}`, name: tag.replace(/^p-/, ''), componentPropertyDefinitions: {} })),
  icons: Object.fromEntries(
    (Array.isArray(iconMeta) ? iconMeta.map(String) : [])
      .filter((name) => !baseline['p-icon']?.includes(`name=${name}`))
      .map((name, i) => [`2:${i + 1}`, name])
  ),
};
const { files } = generate(pull, baseline, {
  getComponentMeta,
  tags,
  outputRoot: 'generated',
  fileUrl: 'https://www.figma.com/design/KEY/Library',
  // the version figma:generate reads, so the snapshots show the docs links that get published
  version: pdsVersion(resolve(packageRoot, componentsPackagePath)),
});
const generated = Object.keys(files)
  .filter((file) => file !== baselinePath)
  .sort();
const snapshotOf = (file: string): string => `${basename(file)}.snap`;
const configs = readdirSync(packageRoot).filter((name) => /^figma.*\.config\.json$/.test(name));
// the package's exports hide bin/, so it is found from the main entry, dist/react/index_react.js
const entry = createRequire(resolve(packageRoot, 'package.json')).resolve('@figma/code-connect');
const cli = resolve(dirname(entry), '../../bin/figma');

describe('generated files', () => {
  it.each(generated)('%s matches its snapshot', async (file) => {
    await expect(files[file]).toMatchFileSnapshot(resolve(snapshotDir, snapshotOf(file)));
  });

  it('has no snapshot left for a file that is no longer generated', () => {
    const expected = new Set(generated.map(snapshotOf));
    // file snapshots are written after this file runs, so a first run finds no folder yet
    const present = existsSync(snapshotDir) ? readdirSync(snapshotDir) : [];
    expect(present.filter((name) => !expected.has(name))).toEqual([]);
  });

  it('parses with the pinned Code Connect CLI, as the workflow does before it publishes', () => {
    // the CLI bundles a helper only from inside its project folder, so the files get a folder of their own
    const project = mkdtempSync(join(tmpdir(), 'figma-code-connect-'));
    try {
      cpSync(resolve(packageRoot, 'figma/helpers'), join(project, 'figma/helpers'), { recursive: true });
      for (const file of generated) {
        mkdirSync(dirname(join(project, file)), { recursive: true });
        writeFileSync(join(project, file), files[file]);
      }
      for (const config of configs) {
        cpSync(resolve(packageRoot, config), join(project, config));
        const { status, stderr } = spawnSync(
          process.execPath,
          [cli, 'connect', 'parse', '--config', config, '--exit-on-unreadable-files', '--skip-update-check'],
          { cwd: project, encoding: 'utf8', stdio: ['ignore', 'ignore', 'pipe'] }
        );
        expect(status, `${config}\n${stderr}`).toBe(0);
      }
    } finally {
      rmSync(project, { recursive: true, force: true });
    }
  }, 120_000);
});
