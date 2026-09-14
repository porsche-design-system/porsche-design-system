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
      [
        '#!/bin/sh',
        'if [ "$1" = view ]; then',
        '  case "$3" in',
        '    dist-tags.latest) printf "%s\\n" "$LATEST_VERSION" ;;',
        '    *) printf "%s\\n" "$MAJOR_TAG_VERSION" ;;',
        '  esac',
        'else',
        '  printf "%s " "$@" >> "$COMMANDS"',
        '  printf "\\n" >> "$COMMANDS"',
        'fi',
        '',
      ].join('\n')
    );
    chmodSync(join(directory, 'npm'), 0o755);
  });

  afterEach(() => rmSync(directory, { recursive: true, force: true }));

  const publish = (version: string, latest: string, majorTagVersion = '') => {
    writeFileSync(join(directory, 'package/package.json'), JSON.stringify({ name: '@pds/test', version }));
    execFileSync('bash', [resolve('.github/scripts/release-npm.sh'), 'package'], {
      cwd: directory,
      env: {
        ...process.env,
        PATH: `${directory}:${process.env.PATH}`,
        NODE_PATH: resolve('node_modules'),
        LATEST_VERSION: latest,
        MAJOR_TAG_VERSION: majorTagVersion,
        COMMANDS: join(directory, 'commands'),
      },
      timeout: 10000,
      stdio: 'pipe',
    });
    return readFileSync(join(directory, 'commands'), 'utf8')
      .trimEnd()
      .split('\n')
      .map((command) => command.trimEnd());
  };

  const publishedWith = (tag: string) => `publish --tag ${tag} --access public --provenance package`;

  it.each([
    ['4.7.0', '4.6.0', '', 'latest'],
    ['5.0.0', '4.7.0', '4.7.0', 'latest'],
    ['4.7.1', '5.0.0', '', 'latest-v4'],
    ['4.10.1', '5.0.0', '4.7.1', 'latest-v4'],
    ['10.0.1', '11.0.0', '10.0.0', 'latest-v10'],
    ['5.0.0-rc.0', '4.7.0', '', 'rc'],
  ])('publishes %s (latest %s, major tag %s) with tag %s', (version, latest, majorTagVersion, tag) => {
    expect(publish(version, latest, majorTagVersion)).toEqual([publishedWith(tag)]);
  });

  it.each([
    ['older patch of a maintained major', '4.7.2', '4.10.1'],
    ['republished major-tag version', '4.10.1', '4.10.1'],
  ])('does not move latest-v4 backwards for an %s', (_case, version, majorTagVersion) => {
    expect(publish(version, '5.0.0', majorTagVersion)).toEqual([
      publishedWith(`superseded-v${version}`),
      `dist-tag rm @pds/test superseded-v${version}`,
    ]);
  });

  it('fails instead of silently publishing to latest when registry data is invalid', () => {
    expect(() => publish('4.7.0', '')).toThrow('Missing or invalid npm latest version');
  });

  it('fails instead of guessing when the major dist-tag is invalid', () => {
    expect(() => publish('4.7.2', '5.0.0', 'not-a-version')).toThrow('Invalid npm latest-v4 version');
  });
});
