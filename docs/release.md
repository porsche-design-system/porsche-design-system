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

Releases for versions published before this automation existed (`1.0.0` - `3.35.0`) were added retroactively, so the
release list is complete. Their tags point at the release commit (usually the merge commit of the release PR), and
because GitHub derives `created_at` from the tagged commit they keep their historic date and ordering – only
`published_at` ("released this …") shows when they were backfilled.

## Git tags

The only tags in this repository are `v{MAJOR}.{MINOR}.{PATCH}` of stable releases – one per GitHub Release, nothing
else. Pre-release versions (`-rc.*`, `-beta.*`, `-alpha.*`) are published to npm but are not tagged.

The legacy per-package tags of the old release process (e.g. `components-js-v3.33.0`, `assets-v5.0.2`, `v0.13.0/core`,
`v0.8.0/react`) as well as all pre-release tags were deleted, since the released code is fully covered by the
`v{version}` tags and the npm registry. When a tag has to be recreated, use the commit of the corresponding release and
create it as a lightweight tag:

```bash
git update-ref refs/tags/v4.6.0 <sha> "" && git push origin refs/tags/v4.6.0
```

To create a release manually (e.g. if CI ever misses one), run the action script locally with a token that has
`contents: write`:

```bash
INPUT_VERSION=4.6.0 \
INPUT_SHA=main \
INPUT_REPOSITORY=porsche-design-system/porsche-design-system \
INPUT_CHANGELOG_PATH=packages/components/CHANGELOG.md \
INPUT_DRY_RUN=true \
GITHUB_TOKEN=$(gh auth token) \
bash .github/actions/create-github-release/create-github-release.sh
```

`INPUT_DRY_RUN=true` only prints the payload; drop it to actually create the release. `INPUT_SHA` may be left empty when
the tag already exists – GitHub answers `404 Not Found` when a plain commit SHA is passed as `target_commitish` for an
existing tag, so it is omitted from the payload in that case.
