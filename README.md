![Porsche Marque](https://upload.wikimedia.org/wikipedia/de/thumb/7/70/Porsche_Logo.svg/258px-Porsche_Logo.svg.png)

# Porsche Design System

## Build status

[![Actions Status](https://github.com/porscheui/porsche-design-system/workflows/Porsche%20Design%20System/badge.svg)](https://github.com/porscheui/porsche-design-system/actions)

## Setup

### Requirements

- [Node.js](https://nodejs.org) - make sure to use the same node version as defined in `./docker/node/Dockerfile`
- [Yarn](https://yarnpkg.com)
- [Docker](https://www.docker.com) ([see below](#docker-installation-steps))

### Getting started

1. Clone [`porsche-design-system` repository](https://github.com/porscheui/porsche-design-system)
1. Switch to **project root directory**
1. Checkout branch **master** by executing `git checkout master`
1. Execute command `npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/`
1. Enter username, password (Artifactory API Key, **not** Artifactory password!) and e-mail address when asked in terminal
1. Execute `cat ~/.npmrc`, find following line `//porscheui.jfrog.io/porscheui/api/npm/npm/:_authToken=` and copy the generated _npm registry token_ from the file to your clipboard
1. Create an `.env` file within **project root directory** (never push this file to Git because it will contain secrets – by default it's ignored by `.gitignore`)
1. Add _npm registry token_ in following format `PORSCHE_NPM_REGISTRY_TOKEN=YOUR_TOKEN_GOES_HERE`
1. Make sure that Docker app is running
1. Create a personal access token with the scopes `delete:packages`, `read:packages`, `write:packages`, `repo` at <https://github.com/settings/tokens>
1. Add the personal access token to the `.env` file in following format `GITHUB_PERSONAL_ACCESS_TOKEN=YOUR_TOKEN`
1. Login to the GitHub docker registry via `grep GITHUB_PERSONAL_ACCESS_TOKEN .env | cut -d '=' -f2 | docker login https://ghcr.io -u YOUR_USERNAME --password-stdin`
1. Run `./docker.sh run-install` (to have npm dependencies installed within Docker container) - this may take up to several minutes at first start depending on your internet connection
1. Run `yarn` (to have npm dependencies installed on your machine for better IDE support) - this may take up to several minutes at first start depending on your internet connection

_Note: `./docker.sh run-install` and `yarn` should be executed after every pull._

### Setup prettier

1. Go to Webstorm `Preferences`
1. Click on the Plugins tab and search for `prettier`
1. Install prettier
1. In `Preferences` go to `Languages and Frameworks` -> `Javascript` -> `Prettier`
1. Set `Prettier Package` to `{PATH_TO_YOUR_DIRECTORY}/node_modules/prettier`
1. Change `Run for files` to `{**/*,*}.{js,ts,jsx,tsx,vue,scss,json,css,html}`
1. Click checkbox `on save` and apply
1. You should be good to go.
1. If you have to exclude code fom being prettified, see [Prettier configuration](https://prettier.io/docs/en/ignore.html#javascript)

### Docker installation steps

1. Register your Docker account on [Hub-Docker](https://hub.docker.com)
1. Download Docker app locally on your machine and login
1. Start Docker

### Build

1. Switch to **project root directory**
1. For the different applications, select one of the following commands:
   - `./docker.sh run-build` (builds the entire application)
   - `./docker.sh run-build --assets` (builds the assets with icons, fonts and marque)
   - `./docker.sh run-build --components` (builds the native stencil web components)
   - `./docker.sh run-build --components-prod` (builds the native stencil production web components) 
   - `./docker.sh run-build --components-js` (builds the native web components)
   - `./docker.sh run-build --components-js-prod` (builds the native production web components)
   - `./docker.sh run-build --components-angular` (builds angular components)
   - `./docker.sh run-build --components-react` (builds react components)
   - `./docker.sh run-build --core-dependencies` (builds utilities, icons, fonts, marque and assets)
   - `./docker.sh run-build --email` (builds the email marque)
   - `./docker.sh run-build --fonts` (builds the font set)
   - `./docker.sh run-build --icons` (builds the optimized icon set)
   - `./docker.sh run-build --marque` (builds the marque)
   - `./docker.sh run-build --partials` (builds the partials)
   - `./docker.sh run-build --storefront` (builds storefront)
   - `./docker.sh run-build --utilities` (builds utilities)

### Start

**Important:** before executing a start command it's necessary to have `./docker.sh run-build` executed.

1. Switch to **project root directory**
1. For the different applications, select one of the following commands:
   - `./docker.sh run-start` (starts storefront as default)
   - `./docker.sh run-start --components`
   - `./docker.sh run-start --components-js`
   - `./docker.sh run-start --components-angular`
   - `./docker.sh run-start --components-react`
   - `./docker.sh run-start --storefront`
   - `./docker.sh run-start --utilities`

### Linting

1. Switch to **project root directory**
1. For the different applications, select one of the following commands:
   - `./docker.sh run-lint` (lints the entire application)
   - `./docker.sh run-lint --components-js` (lints native web components)
   - `./docker.sh run-lint --storefront` (lints storefront)

### All Tests

1. Switch to **project root directory**
1. Run `./docker.sh run-test`

### Unit Tests

1. Switch to **project root directory**
1. For the different applications, select one of the following commands:
   - `./docker.sh run-test-unit` (unit tests for the entire application)
   - `./docker.sh run-test-unit --components-js` (unit tests for the native web components)
   - `./docker.sh run-test-unit --components-react` (unit tests for the generated react wrappers)
   - `./docker.sh run-test-unit --storefront` (unit tests for the storefront)
   - `./docker.sh run-test-unit --utilities` (unit tests for the utilities)

### Mock Tests

1. Switch to **project root directory**
1. For the different applications, select one of the following commands:
   - `./docker.sh run-test-mocks` (mock tests for the entire application)
   - `./docker.sh run-test-mocks --components-react` (mock tests for the react components)

### E2E Tests

1. Switch to **project root directory**
1. For the different applications, select one of the following commands:
   - `./docker.sh run-test-e2e` (e2e tests for the entire application)
   - `./docker.sh run-test-e2e --components-js` (e2e tests for the native web components)
   - `./docker.sh run-test-e2e --storefront` (e2e tests for the storefront)

### Visual Regression Tests

1. Switch to **project root directory**
1. For the different applications, select one of the following commands:
   - `./docker.sh run-test-vrt` (vrt tests for the entire application)
   - `./docker.sh run-test-vrt --components-js` (vrt tests for the native web components)
   - `./docker.sh run-test-vrt --components-angular` (vrt tests for angular components)
   - `./docker.sh run-test-vrt --components-react` (vrt tests for react components)
   - `./docker.sh run-test-vrt --storefront` (vrt tests for the storefront)
   - `./docker.sh run-test-vrt --utilities` (vrt tests for the utilities)

### Smoke Tests

**Note:** In most of the cases this test only make sense to be executed in CI/CD

1. Switch to **project root directory**
1. For the different applications, select one of the following commands:
   - `./docker.sh run-test-smoke` (smoke tests for the entire application)
   - `./docker.sh run-test-smoke --components-js` (smoke tests for the native web components)

#### What to do when VRT tests are failing

1. Switch to your results directory in `/packages/{DESIRED_PACKAGE_NAME}/tests/vrt/results`. Here you can find the belonging `diff` and `regression` images.
1. Check if you would like to accept the changes
   - **If yes**: Replace the reference shot in the `/vrt/fixtures` folder with the belonging one in the `/vrt/results` folder and delete the images in the `/vrt/results` directory afterwards manually.
   - **If no**: Recheck your code and run the tests again, when you think you fixed it.

---

## Docker

#### What to do after adjusting docker scripts

1. Communicate breaking changes of the pipeline to the team (currently the same docker image is used for dev and prod builds: [#1124](https://github.com/porscheui/porsche-design-system/issues/1124))
1. Switch to `docker/node` directory
1. Run `bash build-and-push-base-image.sh`
1. View new package on [GitHub-Packages Page](https://github.com/orgs/porscheui/packages?repo_name=porsche-design-system)

## Dependency updates

Every week, we update our NPM packages:

1. Switch to **project root directory**
1. Run `./docker.sh run-upgrade`  
   This should output the dependencies you might want to update. Select the NPM dependencies to be updated and press _Enter_. Afterwards execute automated tests to make sure application still works.
1. Angular has to be updated with `ng update`.
   1. Run `./docker.sh bash`
   1. `cd packages/components-angular`
   1. `./node_modules/.bin/ng update`
   1. `./node_modules/.bin/ng update @angular/cli @angular/core`
   1. Check `MAX_TS_VERSION` in `packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js` which indicates whether `typescript` can be updated for Angular packages or not.
   1. `exit` to leave the docker container
1. Run `./docker.sh run-install`
1. Run `./docker.sh run-build`
1. Run `./docker.sh run-test`  
   As final check start application locally and have a look at it.
1. Run `./docker.sh run-start`

### Hints for updating

1. Make sure you pulled the latest version before starting
2. NPM registry is linked to a private one (jFrog Artifactory). Make sure you've followed instructions mentioned in **Getting started** section to be able to authenticate during NPM dependency update process.
3. To avoid corrupting the yarn.lock start with angular. The following upgrades should be grouped e.g. if react types can be upgraded also look if react can be upgraded
4. Dont upgrade too many dependencies at once, keep them logically together

## Build status

[GitHub Actions](https://github.com/porscheui/porsche-design-system/actions)

## Developing new components

This tool automatically creates a catalog of ui components. For its magic to work, new components have to follow a few rules:

1. **File location:** A component is developed as a self containing element under `packages/components/src/components`.
1. **Component description:** A component should have a `COMPONENTNAME.code.md` and a `COMPONENTNAME.design.md` file which describes its general purpose, design/development specifications and examples.
1. **Props:** The component has to describe its props using typescript types and documentation.

---

## AWS

In order to deploy something to AWS from your local machine, you need to follow these steps.

1. Install `awscli` as described here <https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html#cliv2-linux-install>
1. Retrieve the credentials from our keepass, they are stored in the entry `AWS + QuickSight` under the fields `Zugriffsschlüssel-ID` and `Geheimer Zugriffsschlüssel`
1. Run `aws configure` and enter the credentials, default region `eu-central-1` and default output format `json`
1. If you prefer to run commands via `docker.sh` you need to extend your `.env` file by `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with the credentials from the previous step

---

## Open Source Check via OSS Review Toolkit (ORT)

The OSS Review Toolkit (ORT) aims to assist with the tasks that commonly needs to be performed in the context of license compliance checks, especially for Free and Open Source Software dependencies.

### When should the ORT - Analyzer be running?
An ORT analysis file, `analyzer-result.yml`, is generated on every merge into `master` or `v*` branch by our CI/CD and stored as artifact in GitHub Actions.

### How often should the ORT - Analyzer be running?
The ORT analysis on the source code files for generating `analyzer-result.yml` file should be submitted to OSO (F.4) prior to any production release of feature(s) which includes either a new or update existing FOSS component(s).

### How should I provide "analyzer-result.yml" file?
Once the `analyzer-result.yml` file is generated, it needs to be attached to a [OSO service desk](https://skyway.porsche.com/jira/plugins/servlet/desk/portal/261) Jira Ticket to be analyzed by the OSO team of Porsche to check against license violations of FOSS component(s).

### Where can I access the list of licenses which can be used in product development lifecycle?
Please refer to the link below for accessing license list: [Porsche License List](https://skyway.porsche.com/confluence/download/attachments/89643039/23112020_Porsche%20Lizenzliste.xlsx?version=2&modificationDate=1611828503000&api=v2)

---

# Release management

## Porsche Design System - Components (JS/Angular/React)

### Note

When publishing a stable release then it's necessary an RC release is made immediately before, integrated and tested in all sample integration projects. The stable release needs to be exactly the same as the RC release to make sure everything works under real conditions.

- [Vanilla JS](https://github.com/porscheui/sample-integration-vanillajs)
- [Angular](https://github.com/porscheui/sample-integration-angular)
- [React](https://github.com/porscheui/sample-integration-react)
- [Gatsby](https://github.com/porscheui/sample-integration-gatsby)
- [NextJS](https://github.com/porscheui/sample-integration-nextjs)

### Preparation

1. Switch to **project root directory**
1. Run `git pull origin {master- or v-branch}`
1. Create a new branch e.g. **release/components-v1.2.3**
1. Make sure all relevant changes for the new release to be documented in following `CHANGELOG.md` file(s) under section **[Unreleased]** (this file will also be used to show on Storefront)

- `./packages/components/CHANGELOG.md`

1. Run `./docker.sh run-prepare-release-components ${TARGET_VERSION}` (If something goes wrong, make sure to revert all local changes before executing the task again.)

### Release

1. Create a commit with following message structure `Release Porsche Design System - Components (JS/Angular/React) v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Push the local commit to release branch, e.g. `git push origin release/components-v1.2.3`
1. Create pull request and start review
1. Merge into **master- or v-branch** branch (then CI/CD will trigger a release automatically)

### Update sample projects

1. Go to according examples Projects:
   - https://github.com/porscheui/sample-integration-angular
   - https://github.com/porscheui/sample-integration-react
   - https://github.com/porscheui/sample-integration-nextjs
   - https://github.com/porscheui/sample-integration-gatsby
   - https://github.com/porscheui/sample-integration-vanillajs
1. Run `yarn upgrade-interactive` and upgrade `@porsche-design-system/components-(js/react/angular)` version.
1. Run `yarn`
1. Run `yarn build`
1. Run `yarn start` and check if everything works.

### Communicate

1. Write a Slack notification by coping last entry of `./packages/components-js/CHANGELOG.md` in public Porsche Design System Slack channel

---

## Porsche Design System - Utilities

### Note

When publishing a stable release then it's necessary an RC release is made immediately before, integrated and tested in all sample integration projects. The stable release needs to be exactly the same as the RC release to make sure everything works under real conditions.

- [Vanilla JS](https://github.com/porscheui/sample-integration-vanillajs)
- [Angular](https://github.com/porscheui/sample-integration-angular)
- [React](https://github.com/porscheui/sample-integration-react)
- [Gatsby](https://github.com/porscheui/sample-integration-gatsby)
- [NextJS](https://github.com/porscheui/sample-integration-nextjs)

### Preparation

1. Switch to **project root directory**
1. Run `git pull origin {master- or v-branch}`
1. Create a new branch e.g. **release/utilities-deprecated-v1.2.3**
1. Make sure all relevant changes for the new release to be documented in following `CHANGELOG.md` file(s) under section **[Unreleased]** (this file will also be used to show on Storefront)

- `./packages/utilities-deprecated/projects/utilities/CHANGELOG.md`

1. Run `./docker.sh run-prepare-release-utilities-deprecated ${TARGET_VERSION}` (If something goes wrong, make sure to revert all local changes before executing the task again.)

### Release

1. Create a commit with following message structure `Release Porsche Design System - Utilities Deprecated v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Push the local commit to release branch, e.g. `git push origin release/utilities-deprecated-v1.2.3`
1. Create pull request and start review
1. Merge into **master- or v-branch** branch (then CI/CD will trigger a release automatically)

### Communicate

1. Write a Slack notification by coping last entry of `./packages/utilities-deprecated/projects/utilities/CHANGELOG.md` in public Porsche Design System Slack channel

---

## Porsche Design System - New Icons

1. Copy new Icon-file (eg. `newIcon.svg`) to the correct category **"./packages/icons/src/CHOOSE_RIGHT_CATEGORY"**
1. run `./docker.sh run-install`
1. run `./docker.sh run-build --icons`
1. Switch to **"./packages/icons/database" directory**
1. Upload file to CDN (`https://cdn.ui.porsche.com/porsche-icons/icons.json`)
1. Release Assets

---

## Porsche Design System - Assets

### Preparation

1. Switch to **project root directory**
1. Run `git pull origin {master- or v-branch}`
1. Create a new branch e.g. **release/assets-v1.2.3**
1. Make sure all relevant changes for the new release to be documented in following `CHANGELOG.md` file(s) under section **[Unreleased]**

- `./packages/assets/CHANGELOG.md`

1. Run `./docker.sh run-prepare-release-assets ${TARGET_VERSION}` (If something goes wrong, make sure to revert all local changes before executing the task again.)

### Release

1. Create a commit with following message structure `Release Porsche Design System - Assets v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Push the local commit to release branch, e.g. `git push origin release/assets-v1.2.3`
1. Create pull request and start review
1. Merge into **master- or v-branch** branch (then CI/CD will trigger a release automatically)

### Communicate

1. For the moment it's treated as silent release, so no communication is required

---

## Porsche Design System - Sketch Library Basic

### Preparation

1. Switch to **project root directory**
1. Run `git pull origin {master- or v-branch}`
1. Create a new branch e.g. **release/sketch-library-basic-v1.2.3**
1. Make sure all relevant changes for the new release to be documented in following `CHANGELOG.md` file under section **[Unreleased]** (this file will also be used to show on Storefront)

- `./sketch/basic/CHANGELOG.md`

1. Run `./docker.sh run-prepare-release-sketch-library basic ${TARGET_VERSION}` (If something goes wrong, make sure to revert all local changes before executing the task again.)

### Sketch Library

1. Switch to **"./sketch/basic" directory**
1. Export related Sketch file from master branch in Abstract:
   - [Basic Library](https://share.goabstract.com/401193dc-0054-45f1-b034-8e1a9a25590e)
1. Rename the exported file to correct naming format:
   - `porsche-design-system-basic.sketch`
1. Replace the existing Sketch file with new one

### Release

1. Create a commit with following message structure `Release Porsche Design System - Sketch Library Basic v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Push the local commit to release branch, e.g. `git push origin release/sketch-library-basic-v1.2.3`
1. Create pull request and start review
1. Merge into **master- or v-branch** branch (then CI/CD will trigger a release automatically)

### Communicate

1. Write a Slack notification by coping last entry of `./sketch/basic/CHANGELOG.md` in public Porsche Design System Slack channel

---

## Porsche Design System - Sketch Library Web

### Preparation

1. Switch to **project root directory**
1. Run `git pull origin {master- or v-branch}`
1. Create a new branch e.g. **release/sketch-library-web-v1.2.3**
1. Make sure all relevant changes for the new release to be documented in following `CHANGELOG.md` file under section **[Unreleased]** (this file will also be used to show on Storefront)

- `./sketch/web/CHANGELOG.md`

1. Run `./docker.sh run-prepare-release-sketch-library web ${TARGET_VERSION}` - e.g. **./docker.sh run-prepare-release-sketch-library web 2.2.3 make sure major and minor version is in sync with components release** (If something goes wrong, make sure to revert all local changes before executing the task again.)

### Sketch Library

1. Switch to **"./sketch/web" directory**
1. Export related Sketch file from master branch in Abstract:
   - [Web Library](https://share.goabstract.com/e9baaa65-1d0b-472a-a134-a50f2c079d5e)
1. Rename the exported file to correct naming format:
   - `porsche-design-system-web.sketch`
1. Replace the existing Sketch file with new one

### Release

1. Create a commit with following message structure `Release Porsche Design System - Sketch Library Web v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}` e.g. **.Release Porsche Design System - Sketch Library Web v1.1.1 | aa**
1. Push the local commit to release branch, e.g. `git push origin release/sketch-library-web-v1.2.3`
1. Create pull request and start review
1. Merge into **master- or v-branch** branch (then CI/CD will trigger a release automatically)

### Communicate

1. Write a Slack notification by coping last entry of `./sketch/web/CHANGELOG.md` in public Porsche Design System Slack channel
