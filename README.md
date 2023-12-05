# Porsche Design System

## Build status

[![Actions Status](https://github.com/porsche-design-system/porsche-design-system/workflows/Porsche%20Design%20System/badge.svg)](https://github.com/porsche-design-system/porsche-design-system/actions)

## Setup

### Install Volta

We recommend using [Volta](https://volta.sh) to manage the correct Node and Yarn version. To get started, install Volta
like this:

```bash
curl https://get.volta.sh | bash
```

Volta should automatically pick up the correct Node and Yarn version set in `package.json`.

### Install Node & Yarn

To get Yarn installed, you need to setup a default version of Node, run these commands:

```bash
volta install node
volta install yarn
```

### Install Docker

1. Register your Docker account on [Hub-Docker](https://hub.docker.com)
2. Download Docker app locally on your machine and login
3. Start Docker

### Getting started

1. Clone [`porsche-design-system` repository](https://github.com/porsche-design-system/porsche-design-system)
2. Switch to **project root directory**
3. Checkout branch **main** by executing `git checkout main`
4. Create an `.env` file within **project root directory** (never push this file to Git because it will contain secrets
   – by default it's ignored by `.gitignore`)
5. Make sure that Docker app is running
6. Create a personal access token with the scopes `delete:packages`, `read:packages`, `write:packages`, `repo` at
   <https://github.com/settings/tokens>
7. Add the personal access token to the `.env` file in following format `GITHUB_PERSONAL_ACCESS_TOKEN=YOUR_TOKEN`
8. Login to the GitHub docker registry via
   `grep GITHUB_PERSONAL_ACCESS_TOKEN .env | cut -d '=' -f2 | docker login https://ghcr.io -u YOUR_USERNAME --password-stdin`
9. Run `./docker.sh run-install` (to have npm dependencies installed within Docker container) - this may take up to
   several minutes at first start depending on your internet connection
10. Run `yarn` (to have npm dependencies installed on your machine for better IDE support) - this may take up to several
    minutes at first start depending on your internet connection

#### Common errors during installation

1. `Error: spawn node-gyp ENOENT` => You need to install `node-gyp` manually via `yarn global add node-gyp`
2. `node-pre-gyp ERR! install response status 404 Not Found on https://github.com/Automattic/node-canvas/releases/download/v2.11.2/canvas-v2.11.2-node-v108-darwin-unknown-arm64.tar.gz` => Check out [this page](https://github.com/Automattic/node-canvas/wiki/Installation%3A-Mac-OS-X)

_Note: `./docker.sh run-install` and `yarn` should be executed after every pull._

### Setup prettier

1. Go to Webstorm `Preferences`
2. Click on the Plugins tab and search for `prettier`
3. Install prettier
4. In `Preferences` go to `Languages and Frameworks` -> `Javascript` -> `Prettier`
5. Set `Prettier Package` to `{PATH_TO_YOUR_DIRECTORY}/node_modules/prettier`
6. Change `Run for files` to `{**/*,*}.{js,ts,jsx,tsx,vue,scss,json,css,html,md}`
7. Click checkbox `on save` and apply
8. You should be good to go.
9. If you have to exclude code fom being prettified, see
   [Prettier configuration](https://prettier.io/docs/en/ignore.html#javascript)

### Build

1. Switch to **project root directory**
2. For the different applications, select one of the following commands:

- `./docker.sh run-build` (builds the entire application)
- `./docker.sh run-build --assets` (builds the assets with icons, fonts and marque)
- `./docker.sh run-build --components` (builds the native stencil web components)
- `./docker.sh run-build --components-prod` (builds the native stencil production web components)
- `./docker.sh run-build --components-js` (builds the native web components)
- `./docker.sh run-build --components-js-prod` (builds the native production web components)
- `./docker.sh run-build --components-angular` (builds angular components)
- `./docker.sh run-build --components-react` (builds react components)
- `./docker.sh run-build --core-dependencies` (builds utilities, icons, fonts, marque and assets)
- `./docker.sh run-build --fonts` (builds the font set)
- `./docker.sh run-build --icons` (builds the optimized icon set)
- `./docker.sh run-build --marque` (builds the marque)
- `./docker.sh run-build --partials` (builds the partials)
- `./docker.sh run-build --storefront` (builds storefront)
- `./docker.sh run-build --utilities` (builds utilities)

### Start

**Important:** before executing a start command it's necessary to have `./docker.sh run-build` executed.

1. Switch to **project root directory**
2. For the different applications, select one of the following commands:

- `./docker.sh run-start` (starts storefront as default)
- `./docker.sh run-start --components`
- `./docker.sh run-start --components-js`
- `./docker.sh run-start --components-angular`
- `./docker.sh run-start --components-react`
- `./docker.sh run-start --storefront`
- `./docker.sh run-start --utilities`

### Linting

1. Switch to **project root directory**
2. For the different applications, select one of the following commands:

- `./docker.sh run-lint` (lints the entire application)
- `./docker.sh run-lint --components-js` (lints native web components)
- `./docker.sh run-lint --storefront` (lints storefront)

### All Tests

1. Switch to **project root directory**
2. Run `./docker.sh run-test`

### Unit Tests

1. Switch to **project root directory**
2. For the different applications, select one of the following commands:

- `./docker.sh run-test-unit` (unit tests for the entire application)
- `./docker.sh run-test-unit --components-js` (unit tests for the native web components)
- `./docker.sh run-test-unit --components-react` (unit tests for the generated react wrappers)
- `./docker.sh run-test-unit --storefront` (unit tests for the storefront)
- `./docker.sh run-test-unit --utilities` (unit tests for the utilities)

### Mock Tests

1. Switch to **project root directory**
2. For the different applications, select one of the following commands:

- `./docker.sh run-test-mocks` (mock tests for the entire application)
- `./docker.sh run-test-mocks --components-react` (mock tests for the react components)

### E2E Tests

1. Switch to **project root directory**
2. For the different applications, select one of the following commands:

- `./docker.sh run-test-e2e` (e2e tests for the entire application)
- `./docker.sh run-test-e2e-puppeteer --components-js` (e2e tests for the native web components for Chromium)
- `./docker.sh run-test-e2e-playwright --components-js` (e2e tests for the native web components for Webkit)
- `./docker.sh run-test-e2e --components-angular` (e2e tests for angular components)
- `./docker.sh run-test-e2e --components-react` (e2e tests for react components)
- `./docker.sh run-test-e2e --components-vue` (e2e tests for vue components)
- `./docker.sh run-test-e2e --crawler` (e2e tests for crawler package)
- `./docker.sh run-test-e2e --storefront` (e2e tests for the storefront)

### Visual Regression Tests

1. Switch to **project root directory**
2. For the different applications, select one of the following commands:

- `./docker.sh run-test-vrt-puppeteer --components-js` (vrt tests for the native web components for Chromium)
- `./docker.sh run-test-vrt-playwright --components-js` (vrt tests for the native web components for Webkit)
- `./docker.sh run-test-vrt --components-angular` (vrt tests for angular components)
- `./docker.sh run-test-vrt --components-react` (vrt tests for react components)
- `./docker.sh run-test-vrt --components-react/nextjs` (vrt tests for react ssr components in nextjs setup)
- `./docker.sh run-test-vrt --components-react/remix` (vrt tests for react ssr components in remix setup)
- `./docker.sh run-test-vrt --components-vue` (vrt tests for vue components)
- `./docker.sh run-test-vrt --storefront` (vrt tests for the storefront)
- `./docker.sh run-test-vrt --utilities` (vrt tests for the utilities)
- `./docker.sh run-test-vrt --fallbacks` (vrt tests for the fallbacks)

#### What to do when VRT Puppeteer tests are failing

1. Switch to your results directory in `/packages/{DESIRED_PACKAGE_NAME}/tests/vrt/(puppeteer?)/results`. Here you can
   find the belonging `diff` and `regression` images.
2. Check if you would like to accept the changes

- **If yes**: Replace the reference shot in the `/vrt/fixtures` folder with the belonging one in the
  `/vrt/(puppeteer?)/results` folder and delete the images in the `/vrt/(puppeteer?)/results` directory afterwards
  manually.
- **If no**: Recheck your code and run the tests again, when you think you fixed it.

### Smoke Tests

**Note:** In most of the cases this test only make sense to be executed in CI/CD

1. Switch to **project root directory**
2. For the different applications, select one of the following commands:

- `./docker.sh run-test-smoke` (smoke tests for the entire application)
- `./docker.sh run-test-smoke --components-js` (smoke tests for the native web components)

---

## Docker

#### What to do after adjusting docker scripts

1. Bump the docker image tag everywhere **except** for the first layer of our Dockerfile (e.g.
   `FROM mcr.microsoft.com/playwright:v1.39.0-focal` needs to stay) to not break all CI runs of your colleagues, e.g.
   change `v1.39.0-focal` to `v1.39.0-focal-test` (not doing this will essentially replace the previous image that is
   used everywhere else)
2. Commit and push your changes
3. Go to
   [Build and Push Docker Image workflow](https://github.com/porsche-design-system/porsche-design-system/actions/workflows/build-and-push-docker-image.yml)
4. Hit the `Run workflow` button on the right, choose the branch with your changes and click `Run workflow` CTA button
   to queue a manual build
5. Once the job is complete, you can verify the new image at
   [GitHub-Packages Page](https://github.com/porsche-design-system/porsche-design-system/pkgs/container/porsche-design-system%2Fplaywright)
6. Now you can rerun your regular CI job (since it failed due to relying on the not yet existing docker image)

## Dependency updates

Every week, we update our NPM packages:

1. Switch to **project root directory**
2. Run `./docker.sh run-upgrade`  
   This should output the dependencies you might want to update. Select the NPM dependencies to be updated and press _
   Enter_. Afterwards execute automated tests to make sure application still works.
3. Angular has to be updated with `ng update`.
4. Run `./docker.sh bash`
5. `cd packages/components-angular`
6. `./node_modules/.bin/ng update`
7. `./node_modules/.bin/ng update @angular/cli @angular/core`
8. Check `MAX_TS_VERSION` in `packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js`
   which indicates whether `typescript` can be updated for Angular packages or not.
9. `exit` to leave the docker container
10. Run `./docker.sh run-install`
11. Run `./docker.sh run-build`
12. Run `./docker.sh run-test`  
    As final check start application locally and have a look at it.
13. Run `./docker.sh run-start`

### Hints for updating

1. Make sure you pulled the latest version before starting.
2. To avoid corrupting the `yarn.lock` start with Angular (by using `ng update`). The following upgrades should be
   grouped e.g. if React types can be upgraded also look if React can be upgraded.
3. Don't upgrade too many dependencies at once, keep them logically together.
4. Certain dependencies can not be upgraded which are documented in `docs/dependencies.md`
5. In case you discover new dependencies that can not be upgraded, e.g. due to esm builds not compatible with nodejs,
   add them to the list
6. Update `docs/dependencies.md` to reflect the current date and adjust framework versions if needed
7. Once you updated everything possible, delete `yarn.lock` and have it created again by running `yarn` in order to
   update dependencies of our dependencies

## Build status

[GitHub Actions](https://github.com/porsche-design-system/porsche-design-system/actions)

## Developing new components

This tool automatically creates a catalog of ui components. For its magic to work, new components have to follow a few
rules:

1. **File location:** A component is developed as a self containing element under `packages/components/src/components`.
2. **Component description:** A component should have a `COMPONENTNAME.code.md` and a `COMPONENTNAME.design.md` file
   which describes its general purpose, design/development specifications and examples.
3. **Props:** The component has to describe its props using typescript types and documentation.

---

## AWS

In order to deploy something to AWS from your local machine, you need to follow these steps.

1. Install `awscli` as described here
   <https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html#cliv2-linux-install>
2. Retrieve the credentials from our keepass, they are stored in the entry `AWS + QuickSight` under the fields
   `Zugriffsschlüssel-ID` and `Geheimer Zugriffsschlüssel`
3. Run `aws configure` and enter the credentials, default region `eu-central-1` and default output format `json`
4. If you prefer to run commands via `docker.sh` you need to extend your `.env` file by `AWS_ACCESS_KEY_ID` and
   `AWS_SECRET_ACCESS_KEY` with the credentials from the previous step

---

## Open Source Check via OSS Review Toolkit (ORT) by Porsche's Open Source Office (OSO)

The OSS Review Toolkit (ORT) aims to assist with the tasks that commonly needs to be performed in the context of license
compliance checks, especially for Free and Open Source Software dependencies.

### When should the ORT - Analyzer be running?

A zipped ORT analysis file, `analyzer-result.yml`, is generated on every first day of month and is sent by GitHub
Actions to OSO automatically.

### Where can I check FOSS status report?

[OSO service desk](https://skyway.porsche.com/jira/plugins/servlet/desk/portal/261)

### Where can I access the list of licenses which can be used in product development lifecycle?

[Porsche License List](https://skyway.porsche.com/confluence/download/attachments/89643039/23112020_Porsche%20Lizenzliste.xlsx?version=2&modificationDate=1611828503000&api=v2)

---

# Release management

## Porsche Design System - Components (JS/Angular/React)

### Note

When publishing a stable release then it's necessary an RC release is made immediately before, integrated and tested in
all sample integration projects. The stable release needs to be exactly the same as the RC release to make sure
everything works under real conditions.

- [Vanilla JS](https://github.com/porsche-design-system/sample-integration-vanillajs)
- [Angular](https://github.com/porsche-design-system/sample-integration-angular)
- [React](https://github.com/porsche-design-system/sample-integration-react)
- [NextJS](https://github.com/porsche-design-system/sample-integration-nextjs)

### Preparation

1. Switch to **project root directory**
2. Run `git pull origin {main- or v-branch}`
3. Create a new branch e.g. **release/components-v1.2.3**
4. Make sure all relevant changes for the new release to be documented in following `CHANGELOG.md` file(s) under section
   **[Unreleased]** (this file will also be used to show on Storefront)

- `./packages/components/CHANGELOG.md`

1. Run `./docker.sh run-prepare-release-components ${TARGET_VERSION}` (If something goes wrong, make sure to revert all
   local changes before executing the task again.)

### Release

#### Stable

1. Create a commit with following message structure
   `Release Porsche Design System - Components (JS/Angular/React/Vue) v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
2. Push the local commit to release branch, e.g. `git push origin release/components-v1.2.3`
3. Create pull request and start review
4. Merge into **main- or v-branch** branch (then CI/CD will trigger a release automatically)

### Update sample projects

1. Go to according examples Projects:

- https://github.com/porsche-design-system/sample-integration-angular
- https://github.com/porsche-design-system/sample-integration-react
- https://github.com/porsche-design-system/sample-integration-nextjs
- https://github.com/porsche-design-system/sample-integration-vanillajs

1. Run `yarn upgrade-interactive` and upgrade `@porsche-design-system/components-(js/react/angular)` version.
2. Run `yarn`
3. Run `yarn build`
4. Run `yarn start` and check if everything works.

### Communicate

1. Write a Slack notification by coping last entry of `./packages/components-js/CHANGELOG.md` in public Porsche Design
   System Slack channel

---

## Porsche Design System - New Icons

1. Copy new Icon-file (eg. `newIcon.svg`) to the correct category **"./packages/icons/src/CHOOSE_RIGHT_CATEGORY"**
2. Release Assets `@porsche-design-system/assets` (see below)

---

## Porsche Design System - Assets

### Preparation

1. Switch to **project root directory**
2. Run `git pull origin {main- or v-branch}`
3. Create a new branch e.g. **release/assets-v1.2.3**
4. Make sure all relevant changes for the new release to be documented in following `CHANGELOG.md` file(s) under section
   **[Unreleased]**

- `./packages/assets/CHANGELOG.md`

1. Run `./docker.sh run-prepare-release-assets ${TARGET_VERSION}` (If something goes wrong, make sure to revert all
   local changes before executing the task again.)

### Release

1. Create a commit with following message structure
   `Release Porsche Design System - Assets v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
2. Push the local commit to release branch, e.g. `git push origin release/assets-v1.2.3`
3. Create pull request and start review
4. Merge into **main- or v-branch** branch (then CI/CD will trigger a release automatically)

### Communicate

1. For the moment it's treated as silent release, so no communication is required
