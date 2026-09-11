import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('release source CLI', () => {
  let directory: string;
  const git = (...args: string[]) =>
    execFileSync('git', ['-c', 'tag.gpgSign=false', '-c', 'core.hooksPath=/dev/null', ...args], {
      cwd: directory,
      encoding: 'utf8',
      timeout: 10000,
    }).trim();
  const commit = () => {
    git('add', '.');
    git(
      '-c',
      'user.name=Release Test',
      '-c',
      'user.email=release-test@example.invalid',
      'commit',
      '--no-gpg-sign',
      '-m',
      'fixture'
    );
  };
  const setVersion = (version: string) => {
    writeFileSync(join(directory, 'packages/components/package.json'), JSON.stringify({ version }));
    commit();
  };
  const run = (mode = 'source', branch = 'main') => {
    const output = join(directory, 'output');
    execFileSync(process.execPath, [resolve('.github/scripts/storefront-release.ts'), mode], {
      cwd: directory,
      env: { ...process.env, GITHUB_OUTPUT: output, GITHUB_REF_NAME: branch },
      stdio: 'pipe',
      timeout: 10000,
    });
    return readFileSync(output, 'utf8');
  };

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'pds-release-'));
    git('init', '--initial-branch=main');
    git('remote', 'add', 'origin', directory);
    mkdirSync(join(directory, 'packages/components'), { recursive: true });
    setVersion('4.7.0-rc.0');
    setVersion('4.7.0');
  });

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true });
  });

  it('writes release outputs with native Node before npm publication or tagging', () => {
    expect(run()).toBe('is-stable=true\nis-release-commit=true\nmajor-slug=v4\n');
  });

  it('recognizes a tagged release retry but not a later housekeeping commit', () => {
    git('tag', 'v4.7.0');
    expect(run()).toContain('is-release-commit=true');
    writeFileSync(join(directory, 'housekeeping'), 'documentation changes');
    commit();
    expect(run()).toContain('is-release-commit=false');
    expect(run('promotion')).toContain('promote=false');
  });

  it('rejects a release on the wrong maintenance branch', () => {
    expect(() => run('source', 'v5')).toThrow('Release 4.7.0 does not belong to branch v5');
  });

  it('allows matching maintenance branches', () => {
    expect(run('source', 'v4')).toContain('is-release-commit=true');
  });

  it('does not identify prereleases as stable releases', () => {
    setVersion('5.0.0-rc.0');
    expect(run()).toContain('is-stable=false\nis-release-commit=false\nmajor-slug=v5');
  });

  it('surfaces remote lookup failures instead of assuming a new release', () => {
    git('remote', 'set-url', 'origin', join(directory, 'missing-repository'));
    expect(() => run()).toThrow('ls-remote');
  });
});
