import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import * as semver from 'semver';

export const isStableVersion = (version: string): boolean => /^\d+\.\d+\.\d+$/.test(version) && !!semver.valid(version);

export function parseReleaseTags(output: string): Map<string, string> {
  const tags = new Map<string, string>();
  // Annotated tags have a second, peeled ref pointing at the commit rather than the tag object.
  const refs = output.trim().split('\n');
  for (const line of [...refs.filter((ref) => !ref.endsWith('^{}')), ...refs.filter((ref) => ref.endsWith('^{}'))]) {
    const match = /^([a-f0-9]{40})\s+refs\/tags\/v(\d+\.\d+\.\d+)(?:\^\{\})?$/.exec(line);
    if (match && isStableVersion(match[2])) tags.set(match[2], match[1]);
  }
  return tags;
}

export function isReleaseCommit(
  version: string,
  sha: string,
  previousVersion: string,
  tags: ReadonlyMap<string, string>
): boolean {
  if (!isStableVersion(version)) return false;
  const taggedSha = tags.get(version);
  return taggedSha ? taggedSha === sha : previousVersion !== version;
}

export function canPromoteMajor(version: string, sha: string, tags: ReadonlyMap<string, string>): boolean {
  if (!isStableVersion(version) || tags.get(version) !== sha) return false;
  return ![...tags.keys()].some(
    (released) => semver.major(released) === semver.major(version) && semver.gt(released, version)
  );
}

function packageVersion(content: string): string {
  const pkg: unknown = JSON.parse(content);
  if (
    typeof pkg !== 'object' ||
    pkg === null ||
    !('version' in pkg) ||
    typeof pkg.version !== 'string' ||
    !semver.valid(pkg.version)
  ) {
    throw new Error('Missing or invalid component package version');
  }
  return pkg.version;
}

export function resolveStorefrontRelease(mode: string): Record<string, string | boolean> {
  const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' }).trim();
  const version = packageVersion(readFileSync('packages/components/package.json', 'utf8'));
  const sha = git('rev-parse', 'HEAD');
  const major = semver.major(version);
  const tags = parseReleaseTags(git('ls-remote', '--tags', 'origin', `refs/tags/v${major}.*`));

  if (mode === 'source') {
    const previousVersion = packageVersion(git('show', 'HEAD^:packages/components/package.json'));
    const eligible = isReleaseCommit(version, sha, previousVersion, tags);
    const branch = process.env.GITHUB_REF_NAME;
    if (eligible && branch !== 'main' && branch !== `v${major}`) {
      throw new Error(`Release ${version} does not belong to branch ${branch}`);
    }
    return { 'is-stable': isStableVersion(version), 'is-release-commit': eligible, 'major-slug': `v${major}` };
  }

  if (mode !== 'promotion') throw new Error(`Unknown storefront release mode: ${mode}`);

  const promote = canPromoteMajor(version, sha, tags);
  if (promote) {
    const repository = process.env.GITHUB_REPOSITORY;
    if (!repository) throw new Error('GITHUB_REPOSITORY is required');
    const release: unknown = JSON.parse(
      execFileSync('gh', ['api', `repos/${repository}/releases/tags/v${version}`], { encoding: 'utf8' })
    );
    if (
      typeof release !== 'object' ||
      release === null ||
      !('tag_name' in release) ||
      release.tag_name !== `v${version}` ||
      !('draft' in release) ||
      release.draft !== false ||
      !('prerelease' in release) ||
      release.prerelease !== false
    ) {
      throw new Error(`v${version} is not a published stable GitHub Release`);
    }
  }
  process.stdout.write(`${promote ? 'Promoting' : 'Not promoting'} ${version} at ${sha} to v${major}\n`);
  return { promote, slug: `v${major}` };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const output = process.env.GITHUB_OUTPUT;
  if (!output) throw new Error('GITHUB_OUTPUT is required');
  const values = resolveStorefrontRelease(process.argv[2]);
  appendFileSync(
    output,
    Object.entries(values)
      .map(([key, value]) => `${key}=${value}\n`)
      .join('')
  );
}
