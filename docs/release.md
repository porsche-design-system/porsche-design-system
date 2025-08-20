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
3. Create a new branch e.g. `git checkout -b release/components-v3.0.0-rc.0`
4. Make sure all relevant changes for the new release to be documented in `./packages/components/CHANGELOG.md`
5. Run `yarn prepare-release ${TARGET_VERSION}` (e.g. `yarn prepare-release 3.0.0-rc.0`)

### Publish

1. Create a commit with following message structure
   `Release Porsche Design System - Components (JS/Angular/React/Vue) v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
   (e.g. `Release Porsche Design System - Components (JS/Angular/React/Vue) v3.0.0-rc.0 | sas`)
2. Push the local commit to the release branch, e.g. `git push origin release/components-v3.0.0-rc.0`
3. Create pull request and start review
4. Merge into `main` branch (then CI/CD will trigger a release automatically)

### Integration test

1. Go to according sample integration projects:

- https://github.com/porsche-design-system/sample-integration-angular
- https://github.com/porsche-design-system/sample-integration-react
- https://github.com/porsche-design-system/sample-integration-nextjs
- https://github.com/porsche-design-system/sample-integration-vanillajs

1. Open `package.json` and change `@porsche-design-system/components-(js/angular/react/vue)` version to the newly
   published RC.
2. Run `yarn`
3. Run `yarn build`
4. Run `yarn start` and check if everything works.

## Stable Release

When all previous steps were successful and nothing was merged into the **main** branch in the meantime, then a stable
release can be published.

### Prepare

1. Switch to **project root directory**
2. Run `git pull origin {main- or v-branch}`
3. Create a new branch e.g. `git checkout -b release/components-v3.0.0`
4. Run `yarn prepare-release ${TARGET_VERSION}` (e.g. `yarn prepare-release 3.0.0`)

### Publish

1. Create a commit with following message structure
   `Release Porsche Design System - Components (JS/Angular/React/Vue) v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
   (e.g. `Release Porsche Design System - Components (JS/Angular/React/Vue) v3.0.0 | sas`)
2. Push the local commit to the release branch, e.g. `git push origin release/components-v3.0.0`
3. Create pull request and start review
4. Merge into `main` branch (then CI/CD will trigger a release automatically)

### Deploy

1. Create pull request from `main` into `v3` branch
2. Merge into `v3` branch (then CI/CD will trigger a Storefront deployment automatically)

### Communicate

1. Write a Slack notification by coping last entry of `./packages/components-js/CHANGELOG.md` in public Porsche Design
   System Slack channel
