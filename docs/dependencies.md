# Dependencies

## Dependency updates

Every week, we update our NPM packages:

1. Switch to **project root directory**
2. Run `npm outdated` to check for outdated dependencies, then update as needed in `package.json` and run `npm install`.  
   Afterwards execute automated tests to make sure application still works.
3. Angular has to be updated with `ng update`.
4. `cd packages/components-angular`
5. `./node_modules/.bin/ng update`
6. `./node_modules/.bin/ng update @angular/cli @angular/core`
7. Check `MAX_TS_VERSION` in `packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js`
   which indicates whether `typescript` can be updated for Angular packages or not.
8. `exit` to leave the docker container
9. Run `npm install`

### Hints for updating

1. Make sure you pulled the latest version before starting.
2. To avoid corrupting the `package-lock.json` start with Angular (by using `ng update`). The following upgrades should be
   grouped e.g. if React types can be upgraded also look if React can be upgraded.
3. Don't upgrade too many dependencies at once, keep them logically together.
4. Certain dependencies can not be upgraded which are documented in `docs/dependencies.md`
5. In case you discover new dependencies that can not be upgraded, e.g. due to esm builds not compatible with nodejs,
   add them to the list
6. Update `docs/dependencies.md` to reflect the current date and adjust framework versions if needed
7. Once you updated everything possible, delete `package-lock.json` and have it created again by running `npm install` in order to
   update dependencies of our dependencies

We are using Dependabot to manage our dependencies. Every note about not updatable dependencies in this document is also
reflected in the configuration file under `.github/dependabot.yml` and must be kept in sync!

## Not updatable dependencies

These dependencies are intentionally held back and are ignored in `.github/dependabot.yml`:

- `@porsche-design-system/*` – internal workspace packages, versioned via the release process.
- `@playwright/test` – pinned to keep browser binaries and committed VRT snapshots in sync; upgrade deliberately.
- `@stencil/core` – pinned because a `patch-package` patch (`patches/@stencil+core+4.43.3.patch`) targets this exact
  version. Bumping it breaks `patch-package` on `postinstall`. To upgrade, regenerate the patch for the new version first.
- `@angular/*` (incl. `ng-packagr`, `zone.js`) – upgrade Angular separately via `ng update` (see steps above), not via
  `npm-check-updates`, and verify `typescript` stays within Angular's `MAX_TS_VERSION`.

## Overview of Framework Versions

|         | Monorepo | Sample Integrations   |
| ------- | -------- | --------------------- |
| Angular | 21.2.8   | 21.1.2                |
| React   | 19.2.7   | 19.2.4                |
| Next.js | 16.2.9   | 16.1.6 (React 19.2.4) |
