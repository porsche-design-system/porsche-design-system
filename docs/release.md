# Release management

Whenever a new stable version of the npm package `@porsche-design-system/components-{js|angular|react|vue}` is to be
released publicly, it is necessary to first create a release candidate (RC) version. This RC must be integrated and
tested in all sample integration projects.

In the second step, if the integration tests are successful and no additional commits have been merged, the stable
version can be released.

## Release Candidate (RC)

### Prepare

1. Switch to **project root directory**
2. Run `git pull origin {main- or v-branch}`
3. Create a new branch e.g. `git checkout -b release/components-v4.0.0-rc.0`
4. Make sure all relevant changes for the new release to be documented in `./packages/components/CHANGELOG.md`
5. Run `npm run prepare-release ${TARGET_VERSION}` (e.g. `npm run prepare-release 4.0.0-rc.0`)

### Publish

1. Create a commit with following message structure
   `Release Porsche Design System v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}` (e.g.
   `Release Porsche Design System v4.0.0-rc.0 | sas`)
2. Push the local commit to the release branch, e.g. `git push origin release/components-v4.0.0-rc.0`
3. Create pull request and start review
4. Merge into `main` branch (then CI/CD will trigger a release automatically)

### Integration test

1. Go to according sample integration projects:

- https://github.com/porsche-design-system/examples/frameworks/{angular/astro/next-js/react-router/react/vanilla-js/vue}/

1. Open `package.json` and change `@porsche-design-system/components-(js/angular/react/vue)` version to the newly
   published RC.
2. Run `npm run build:{angular/astro/next-js/react-router/react/vanilla-js/vue}`
3. Run `npm run preview:{angular/astro/next-js/react-router/react/vanilla-js/vue}` and check if everything works.

## Stable Release

When all previous steps were successful and nothing was merged into the **main** branch in the meantime, then a stable
release can be published.

### Prepare

1. Switch to **project root directory**
2. Run `git pull origin {main- or v-branch}`
3. Create a new branch e.g. `git checkout -b release/components-v4.0.0`
4. Run `npm run prepare-release ${TARGET_VERSION}` (e.g. `npm run prepare-release 4.0.0`)

### Publish

1. Create a commit with following message structure
   `Release Porsche Design System - Components (JS/Angular/React/Vue) v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
   (e.g. `Release Porsche Design System - Components (JS/Angular/React/Vue) v4.0.0 | sas`)
2. Push the local commit to the release branch, e.g. `git push origin release/components-v4.0.0`
3. Create pull request and start review
4. Merge into `main` branch (then CI/CD will trigger a release automatically)

### Deploy

1. Create a new housekeeping branch from `main` e.g. `git checkout -b housekeeping/components-v4.0.0`
2. Adapt PDS version in Stackblitz framework `package.json` files, e.g.
   `./packages/storefront/projects/stackblitz/src/(js/angular/react/vue)/package.json` to the newly released stable
   version.
3. Create new pull request from e.g. `housekeeping/components-v4.0.0` into `main` branch and merge
4. Create pull request from `main` into `v4` branch
5. Merge into `v4` branch (then CI/CD will trigger a Storefront deployment automatically)

### Communicate

1. Write a Slack notification by coping last entry of `./packages/components-js/CHANGELOG.md` in public Porsche Design
   System Slack channel

## GitHub Releases

Every stable release is published as a
[GitHub Release](https://github.com/porsche-design-system/porsche-design-system/releases) by the `Release` workflow via
`.github/actions/create-github-release`. The action creates the git tag `v{version}` at the released commit and builds
the release body from `./packages/components/CHANGELOG.md`: the section of the stable version and all its pre-release
sections (`-rc.*`, `-beta.*`, …) are merged, so each `### Added|Changed|Fixed` heading appears once (see
`extract-release-body.awk`). Pre-release versions don't get a release.

The `make-latest` input defaults to `auto`: a release is only marked as **Latest** if it is the highest stable version
in the changelog, so maintenance releases of an older major (e.g. `3.36.0` after `4.6.0`) don't steal the badge.

### Backfilling legacy releases

Versions released before the automation existed can be added afterwards with `scripts/backfill-github-releases.ts`. It
reuses the action script (and therefore the same bodies and payloads), creates the releases as **drafts** first and
publishes them in one batch. All commands are dry runs unless `--yes` is passed; a token with `contents: write` is
required in `GITHUB_TOKEN` (or `GH_TOKEN`) for everything but the dry runs.

```bash
# 1. What's missing? (npm state, existing tag, existing release, resolved commit per version)
npm run backfill-github-releases -- inventory

# 2. Create and push the missing tags (draft releases don't create tags)
npm run backfill-github-releases -- tags --yes

# 3. Create the missing releases as drafts, never marked as "Latest"
npm run backfill-github-releases -- drafts --yes

# 4. Publish all drafts in one batch (watchers get a single wave of notifications)
npm run backfill-github-releases -- publish --yes
```

Useful flags: `--from=2.0.0` (lowest version), `--limit=5` (batch size), `--repo=owner/name`, `--remote=origin`,
`--only-npm` (skip versions missing on the public npm registry – note that everything below `2.13.0` was published to an
internal registry only).

The commit a version is tagged at is resolved in descending confidence: existing tag → release commit (all historic
message conventions are covered, and the merge commit of the release PR is preferred as it is the state on `main` the
release was built from) → commit introducing the version into `packages/components/package.json` → newest commit up to
the changelog date. The `inventory` command shows which strategy matched, and versions without a resolvable commit are
skipped.

Note: GitHub sets the release date to the moment of publishing; backfilled releases therefore show the current date,
while the changelog and the tagged commit carry the original one.
