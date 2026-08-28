/**
 * One-off (re-runnable) backfill of GitHub Releases for versions released before the
 * release automation existed (everything below v4.0.0 plus any release CI ever missed).
 *
 * The release body is generated with the very same awk program the CI action uses
 * (`.github/actions/create-github-release/extract-release-body.awk`), and the releases
 * themselves are created through `.github/actions/create-github-release/create-github-release.sh`,
 * so there is exactly one code path building release bodies and payloads.
 *
 * Workflow (all commands are dry-run by default, pass `--yes` to apply):
 *
 *   1. npx tsx scripts/backfill-github-releases.ts inventory
 *      Lists every stable changelog version with its npm publish state, existing tag,
 *      existing release and the commit SHA resolved for it.
 *
 *   2. npx tsx scripts/backfill-github-releases.ts tags --yes
 *      Creates the missing git tags locally and pushes them (draft releases don't create tags).
 *
 *   3. npx tsx scripts/backfill-github-releases.ts drafts --yes
 *      Creates the missing releases as drafts (never marked as "Latest") for review.
 *
 *   4. npx tsx scripts/backfill-github-releases.ts publish --yes
 *      Publishes all backfilled drafts in one batch (watchers get a single wave of notifications).
 *
 * Requires a token with `contents: write` in `GITHUB_TOKEN` (or `GH_TOKEN`).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as semver from 'semver';

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ACTION_DIR = resolve(ROOT_DIR, '.github/actions/create-github-release');
const CREATE_GITHUB_RELEASE_SH = resolve(ACTION_DIR, 'create-github-release.sh');
const NPM_PACKAGE_NAME = '@porsche-design-system/components-js';
const GITHUB_API_VERSION = '2026-03-10';
// Historic release commit messages of the components packages (see docs/release.md), e.g.
// "Release Porsche Design System Components (JS/Angular/React) v1.0.0 | sas" (2020)
// "Release Porsche Design System - Components (JS/Angular/React) 2.0.2 | as / bh" (no "v" prefix)
// "Release Porsche Design System - Components (JS/Angular/React) v2.11.0| mh" (no space before "|")
// "Release Porsche Design System - Components (JS/Angular/React/Vue) v4.0.0 | hj / sas"
// "Release Porsche Design System v4.6.0 | hj"
// "feat: release components-v2.13.0 | sas" / "feat: prepare release v2.14.0 | sas | #1888"
// Releases of other packages ("... - Assets v1.0.0", "... - Utilities v1.0.0") must not match.
const getReleaseCommitPatterns = (version: string): string[] => {
  const tail = `v?${escapeRegExp(version)}( |\\||$)`;

  return [
    `^Release Porsche Design System( -)?( Components \\(JS/Angular/React(/Vue)?\\))? ${tail}`,
    `^(feat|chore)(\\([^)]*\\))?: (prepare )?release (components-)?${tail}`,
  ];
};
// GitHub throttles bursts of write requests (secondary rate limit).
const WRITE_REQUEST_DELAY = 1500;

type Command = 'inventory' | 'tags' | 'drafts' | 'publish';

type ShaStrategy = 'release-commit' | 'package-json' | 'changelog-date' | 'existing-tag' | 'unresolved';

type ChangelogEntry = {
  version: string;
  date?: string;
};

type ReleaseState = 'none' | 'draft' | 'published';

type BackfillCandidate = ChangelogEntry & {
  tagName: string;
  sha?: string;
  strategy: ShaStrategy;
  tagExists: boolean;
  releaseState: ReleaseState;
  publishedOnNpm: boolean;
};

type GitHubRelease = {
  id: number;
  tag_name: string;
  draft: boolean;
  html_url: string;
};

const args = process.argv.slice(2);
const command = (args.find((arg) => !arg.startsWith('-')) ?? 'inventory') as Command;
const getFlag = (name: string): string | undefined =>
  args
    .find((arg) => arg.startsWith(`--${name}=`))
    ?.split('=')
    .slice(1)
    .join('=');
const hasFlag = (name: string): boolean => args.includes(`--${name}`);

const apply = hasFlag('yes');
const repository = getFlag('repo') ?? 'porsche-design-system/porsche-design-system';
const changelogPath = getFlag('changelog') ?? 'packages/components/CHANGELOG.md';
const remote = getFlag('remote') ?? 'origin';
const minVersion = getFlag('from') ?? '1.0.0';
const limit = Number(getFlag('limit') ?? Number.POSITIVE_INFINITY);
// Versions before 2.13.0 were published to an internal registry only, so a missing npm entry
// is no proof that a version wasn't released – it is reported, but doesn't exclude a version.
const onlyNpm = hasFlag('only-npm');
const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

const absoluteChangelogPath = resolve(ROOT_DIR, changelogPath);

const git = (gitArgs: string[]): string =>
  execFileSync('git', gitArgs, { cwd: ROOT_DIR, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();

const tryGit = (gitArgs: string[]): string => {
  try {
    return git(gitArgs);
  } catch {
    return '';
  }
};

const sleep = (ms: number): Promise<void> => new Promise((done) => setTimeout(done, ms));

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** All stable (non pre-release) versions documented in the changelog, newest first. */
const getStableChangelogEntries = (): ChangelogEntry[] => {
  const entries: ChangelogEntry[] = [];

  for (const line of readFileSync(absoluteChangelogPath, 'utf8').split('\n')) {
    const match = /^## \[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?/.exec(line);
    const version = match?.[1];

    if (!version || semver.valid(version) === null || semver.prerelease(version) !== null) {
      continue; // "Unreleased", pre-releases (incl. odd ones like "1.1.0-0") and other headings
    }

    entries.push({ version, date: match?.[2] });
  }

  return entries;
};

/** Versions actually published to npm – the source of truth for what was really released. */
const getPublishedNpmVersions = async (): Promise<Set<string>> => {
  const response = await fetch(`https://registry.npmjs.org/${NPM_PACKAGE_NAME.replace('/', '%2F')}`, {
    headers: { Accept: 'application/vnd.npm.install-v1+json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to read npm registry metadata for "${NPM_PACKAGE_NAME}": ${response.status}`);
  }

  const { versions } = (await response.json()) as { versions: Record<string, unknown> };

  return new Set(Object.keys(versions));
};

const getExistingTags = (): Set<string> => {
  tryGit(['fetch', '--tags', '--quiet', remote]); // local tags may be stale
  return new Set(tryGit(['tag', '--list', 'v*']).split('\n').filter(Boolean));
};

const githubRequest = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if (!token) {
    throw new Error('Missing GitHub token. Set GITHUB_TOKEN (or GH_TOKEN) with "contents: write" permission.');
  }

  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': GITHUB_API_VERSION,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${init?.method ?? 'GET'} ${path} failed: ${response.status} ${await response.text()}`);
  }

  return (await response.json()) as T;
};

/** All releases incl. drafts (drafts are only returned for authenticated requests). */
const getExistingReleases = async (): Promise<Map<string, GitHubRelease>> => {
  const releases = new Map<string, GitHubRelease>();

  if (!token) {
    console.warn('⚠ No GITHUB_TOKEN/GH_TOKEN set – continuing without knowledge of existing releases.');
    return releases;
  }

  for (let page = 1; ; page++) {
    const pageReleases = await githubRequest<GitHubRelease[]>(
      `/repos/${repository}/releases?per_page=100&page=${page}`
    );

    for (const release of pageReleases) {
      releases.set(release.tag_name, release);
    }

    if (pageReleases.length < 100) {
      return releases;
    }
  }
};

const isCommit = (sha: string): boolean => {
  if (!sha) {
    return false;
  }

  try {
    git(['cat-file', '-e', `${sha}^{commit}`]);
    return true;
  } catch {
    return false;
  }
};

/** Refs searched in descending confidence – release commits live on the release/main lines. */
const getSearchRefs = (): string[] =>
  [
    ...['origin/main', 'main'].filter((ref) => Boolean(tryGit(['rev-parse', '--verify', '--quiet', ref]))),
    '--all',
  ].filter((ref, index, refs) => refs.indexOf(ref) === index);

/**
 * Resolves the commit a version was released from. Strategies in descending confidence:
 * 1. an already existing tag (v1.x and v4.x are tagged, v1.5.0 - v3.35.0 aren't)
 * 2. the release commit itself (see docs/release.md for the message convention). Since git matches
 *    `--grep` per line, the merge commit of the release PR usually wins over the release commit it
 *    contains – which is what we want, as that is the state on main the release was built from.
 * 3. the commit introducing the version into `packages/components/package.json`
 * 4. the newest commit up to the changelog date (imprecise, but better than a gap in the release list)
 */
const resolveSha = (entry: ChangelogEntry, existingTags: Set<string>): { sha?: string; strategy: ShaStrategy } => {
  const tagName = `v${entry.version}`;

  if (existingTags.has(tagName)) {
    const sha = tryGit(['rev-list', '--max-count=1', tagName]);
    if (sha) {
      return { sha, strategy: 'existing-tag' };
    }
  }

  for (const ref of getSearchRefs()) {
    for (const pattern of getReleaseCommitPatterns(entry.version)) {
      const releaseCommitSha = tryGit([
        'log',
        ref,
        '--max-count=1',
        '--format=%H',
        '--extended-regexp',
        `--grep=${pattern}`,
      ]);

      if (isCommit(releaseCommitSha)) {
        return { sha: releaseCommitSha, strategy: 'release-commit' };
      }
    }
  }

  const packageJsonSha = tryGit([
    'log',
    '--all',
    '--reverse',
    '--format=%H',
    `-S"version": "${entry.version}"`,
    '--',
    'packages/components/package.json',
  ]).split('\n')[0];

  if (isCommit(packageJsonSha)) {
    return { sha: packageJsonSha, strategy: 'package-json' };
  }

  if (entry.date) {
    const [ref] = getSearchRefs();
    const dateSha = tryGit(['rev-list', '--max-count=1', `--before=${entry.date}T23:59:59`, ref]);

    if (isCommit(dateSha)) {
      return { sha: dateSha, strategy: 'changelog-date' };
    }
  }

  return { strategy: 'unresolved' };
};

const getCandidates = async (): Promise<BackfillCandidate[]> => {
  const [publishedVersions, existingReleases] = await Promise.all([getPublishedNpmVersions(), getExistingReleases()]);
  const existingTags = getExistingTags();

  return getStableChangelogEntries()
    .filter((entry) => semver.gte(entry.version, minVersion))
    .sort((a, b) => semver.compare(a.version, b.version)) // oldest first, the changelog isn't chronological
    .map((entry) => {
      const tagName = `v${entry.version}`;
      const release = existingReleases.get(tagName);

      return {
        ...entry,
        ...resolveSha(entry, existingTags),
        tagName,
        tagExists: existingTags.has(tagName),
        releaseState: release ? (release.draft ? 'draft' : 'published') : 'none',
        publishedOnNpm: publishedVersions.has(entry.version),
      } satisfies BackfillCandidate;
    });
};

/** Versions that still need a release: no release yet and a commit we can point the tag at. */
const getMissingCandidates = (candidates: BackfillCandidate[]): BackfillCandidate[] =>
  candidates
    .filter(
      (candidate) =>
        candidate.releaseState === 'none' && candidate.sha !== undefined && (!onlyNpm || candidate.publishedOnNpm)
    )
    .slice(0, limit);

const runInventory = async (): Promise<void> => {
  const candidates = await getCandidates();

  console.log(`Repository:  ${repository}`);
  console.log(`Changelog:   ${changelogPath}`);
  console.log(`Stable versions >= ${minVersion}: ${candidates.length}\n`);
  console.table(
    candidates.map(({ version, date, publishedOnNpm, tagExists, releaseState, sha, strategy }) => ({
      version,
      date: date ?? '–',
      npm: publishedOnNpm ? '✔' : '✘',
      tag: tagExists ? '✔' : '✘',
      release: releaseState,
      sha: sha?.slice(0, 8) ?? '–',
      strategy,
    }))
  );

  const missing = getMissingCandidates(candidates);
  const unresolved = candidates.filter((candidate) => candidate.releaseState === 'none' && candidate.sha === undefined);
  const unpublished = candidates.filter((candidate) => !candidate.publishedOnNpm);

  console.log(`\nMissing releases to backfill: ${missing.length}`);
  console.log(`  ... of which need a new tag: ${missing.filter((candidate) => !candidate.tagExists).length}`);
  console.log(`Not on public npm (internal registry era, backfilled anyway unless --only-npm is passed):`);
  console.log(`  ${unpublished.map((candidate) => candidate.version).join(', ') || '–'}`);
  console.log(`Skipped (no commit resolved): ${unresolved.map((candidate) => candidate.version).join(', ') || '–'}`);
};

const runTags = async (): Promise<void> => {
  const candidates = getMissingCandidates(await getCandidates()).filter((candidate) => !candidate.tagExists);

  if (candidates.length === 0) {
    console.log('No tags to create – all backfill candidates are already tagged.');
    return;
  }

  for (const { tagName, sha, strategy } of candidates) {
    console.log(`${apply ? 'Creating' : '[dry-run] Would create'} tag ${tagName} -> ${sha?.slice(0, 8)} (${strategy})`);

    if (apply) {
      git(['tag', tagName, sha as string]);
    }
  }

  const refs = candidates.map(({ tagName }) => `refs/tags/${tagName}`);

  if (!apply) {
    console.log(`\n[dry-run] Would push ${refs.length} tags to "${remote}". Re-run with --yes to apply.`);
    return;
  }

  // Push in batches to keep the payload (and a potential rollback) manageable.
  for (let i = 0; i < refs.length; i += 25) {
    const batch = refs.slice(i, i + 25);
    console.log(`Pushing ${batch.length} tags to "${remote}" ...`);
    git(['push', remote, ...batch]);
  }

  console.log(`\nPushed ${refs.length} tags 🏷️`);
};

const runDrafts = async (): Promise<void> => {
  const candidates = getMissingCandidates(await getCandidates());

  if (candidates.length === 0) {
    console.log('No draft releases to create – every version already has a release.');
    return;
  }

  for (const { version, tagName, sha } of candidates) {
    console.log(apply ? `Creating draft release ${tagName} ...` : `\n[dry-run] ${tagName} -> ${sha?.slice(0, 8)}`);

    // The action script is the single place building release bodies and API payloads.
    execFileSync('bash', [CREATE_GITHUB_RELEASE_SH], {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: 'inherit',
      env: {
        ...process.env,
        INPUT_VERSION: version,
        INPUT_SHA: sha as string,
        INPUT_REPOSITORY: repository,
        INPUT_CHANGELOG_PATH: changelogPath,
        INPUT_MAKE_LATEST: 'false',
        INPUT_DRAFT: 'true',
        INPUT_DRY_RUN: apply ? 'false' : 'true',
        GITHUB_TOKEN: token ?? '',
      },
    });

    if (apply) {
      await sleep(WRITE_REQUEST_DELAY);
    }
  }

  console.log(
    apply
      ? `\nCreated ${candidates.length} draft releases 📝 Review them, then run "publish --yes".`
      : `\n[dry-run] Would create ${candidates.length} draft releases. Re-run with --yes to apply.`
  );
};

const runPublish = async (): Promise<void> => {
  const drafts = [...(await getExistingReleases()).values()]
    .filter((release) => release.draft && semver.valid(release.tag_name.replace(/^v/, '')) !== null)
    .sort((a, b) => semver.compare(a.tag_name.replace(/^v/, ''), b.tag_name.replace(/^v/, '')))
    .slice(0, limit);

  if (drafts.length === 0) {
    console.log('No draft releases to publish.');
    return;
  }

  for (const draft of drafts) {
    if (!apply) {
      console.log(`[dry-run] Would publish ${draft.tag_name} (${draft.html_url})`);
      continue;
    }

    console.log(`Publishing ${draft.tag_name} ...`);
    // "make_latest: false" keeps the badge on the current release, no matter the publish order.
    await githubRequest(`/repos/${repository}/releases/${draft.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ draft: false, make_latest: 'false' }),
    });
    await sleep(WRITE_REQUEST_DELAY);
  }

  console.log(
    apply
      ? `\nPublished ${drafts.length} releases 🚀`
      : `\n[dry-run] Would publish ${drafts.length} releases. Re-run with --yes to apply.`
  );
};

const run = async (): Promise<void> => {
  if (!existsSync(absoluteChangelogPath)) {
    throw new Error(`Changelog not found at "${absoluteChangelogPath}".`);
  }

  if (apply && ['drafts', 'publish'].includes(command) && !token) {
    throw new Error('Missing GitHub token. Set GITHUB_TOKEN (or GH_TOKEN) with "contents: write" permission.');
  }

  switch (command) {
    case 'inventory':
      return runInventory();
    case 'tags':
      return runTags();
    case 'drafts':
      return runDrafts();
    case 'publish':
      return runPublish();
    default:
      throw new Error(`Unknown command "${command}" (expected "inventory", "tags", "drafts" or "publish").`);
  }
};

run().catch((error: Error) => {
  console.error(`✘ ${error.message}`);
  process.exit(1);
});
