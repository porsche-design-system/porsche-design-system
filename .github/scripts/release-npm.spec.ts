import { execFileSync } from 'node:child_process';
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('npm release tags', () => {
  let directory: string;

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'pds-npm-release-'));
    mkdirSync(join(directory, 'package'));
    writeFileSync(
      join(directory, 'npm'),
      '#!/bin/sh\nif [ "$1" = view ]; then printf "%s\\n" "$LATEST_VERSION"; else printf "%s\\n" "$@" > "$PUBLISH_ARGS"; fi\n'
    );
    chmodSync(join(directory, 'npm'), 0o755);
  });

  afterEach(() => rmSync(directory, { recursive: true, force: true }));

  const publish = (version: string, latest: string) => {
    writeFileSync(join(directory, 'package/package.json'), JSON.stringify({ name: '@pds/test', version }));
    execFileSync('bash', [resolve('.github/scripts/release-npm.sh'), 'package'], {
      cwd: directory,
      env: {
        ...process.env,
        PATH: `${directory}:${process.env.PATH}`,
        NODE_PATH: resolve('node_modules'),
        LATEST_VERSION: latest,
        PUBLISH_ARGS: join(directory, 'args'),
      },
      timeout: 10000,
      stdio: 'pipe',
    });
    return readFileSync(join(directory, 'args'), 'utf8').split('\n');
  };

  it.each([
    ['4.7.0', '4.6.0', 'latest'],
    ['5.0.0', '4.7.0', 'latest'],
    ['4.7.1', '5.0.0', 'latest-v4'],
    ['4.7.1', '4.10.0', 'latest-v4'],
    ['5.0.0-rc.0', '4.7.0', 'rc'],
  ])('publishes %s after %s with tag %s', (version, latest, tag) => {
    expect(publish(version, latest)).toEqual([
      'publish',
      '--tag',
      tag,
      '--access',
      'public',
      '--provenance',
      'package',
      '',
    ]);
  });

  it('fails instead of silently publishing to latest when registry data is invalid', () => {
    expect(() => publish('4.7.0', '')).toThrow('Missing or invalid npm latest version');
  });
});
