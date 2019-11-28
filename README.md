![Porsche Marque](https://upload.wikimedia.org/wikipedia/de/thumb/7/70/Porsche_Logo.svg/258px-Porsche_Logo.svg.png)


# Porsche UI Kit

## Build status
[![Actions Status](https://github.com/porscheui/porsche-ui-kit/workflows/Porsche%20UI%20Kit/badge.svg)](https://github.com/porscheui/porsche-ui-kit/actions)

## Setup

### Requirements
* [Node.js](https://nodejs.org)
* [Yarn](https://yarnpkg.com)
* [Docker](https://www.docker.com) ([see below](#docker-installation-steps))

### Getting started
1. Clone [`porsche-ui-kit` repository](https://github.com/porscheui/porsche-ui-kit)
1. Switch to __project root directory__
1. Checkout branch __v1__ by executing `git checkout v1`
1. Execute command `npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/`
1. Enter username, password (Artifactory API Key, __not__ Artifactory password!) and e-mail address when asked in terminal
1. Execute `cat ~/.npmrc`, find following line `//porscheui.jfrog.io/porscheui/api/npm/npm/:_authToken=` and copy the generated _npm registry token_ from the file to your clipboard
1. Create an `.env` file within __project root directory__ (never push this file to Git because it will contain secrets – by default it's ignored by `.gitignore`)
1. Add _npm registry token_ in following format `PORSCHE_NPM_REGISTRY_TOKEN=YOUR_TOKEN_GOES_HERE`
1. Make sure that Docker App is running
1. Run `./docker.sh run-install` - this may take up to 15 minutes at first start

*Note: `./docker.sh run-install` should be executed after every pull.*

### Docker Installation Steps
1. Register your Docker account on [Hub-Docker](https://hub.docker.com)
1. Download Docker app locally on your machine and login
1. Start Docker

### Build
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
 * `./docker.sh run-build` (builds the entire application)
 * `./docker.sh run-build --ui-kit-js` (builds the native web components)
 * `./docker.sh run-build --ui-kit-angular` (builds angular wrappers)
 * `./docker.sh run-build --ui-kit-react` (builds react wrappers)
 * `./docker.sh run-build --design-system` (builds storefront)
 * `./docker.sh run-build --utils` (builds utilities)

### Start
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
 * `./docker.sh run-start` (starts the entire application)
 * `./docker.sh run-start --ui-kit-js` (starts native web components)
 * `./docker.sh run-start --ui-kit-angular` (starts angular wrappers)
 * `./docker.sh run-start --ui-kit-react` (starts react wrappers)
 * `./docker.sh run-start --design-system` (starts storefront)

### Linting
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
 * `./docker.sh run-lint` (lints the entire application)
 * `./docker.sh run-lint --ui-kit-js` (lints native web components)
 * `./docker.sh run-lint --design-system` (lints storefront)

### Unit Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
 * `./docker.sh run-test-unit` (unit tests for the entire application)
 * `./docker.sh run-test-unit --ui-kit-js` (unit tests for the native web components)
 * `./docker.sh run-test-unit --design-system` (unit tests for the storefront)

### E2E Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
* Run `./docker.sh run-test-e2e` (e2e tests for the entire application)
* `./docker.sh run-test-e2e --ui-kit-js` (e2e tests for the native web components)
* `./docker.sh run-test-e2e --design-system` (e2e tests for the storefront)

### Visual Regression Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
 * `./docker.sh run-test-vrt` (vrt tests for the entire application)
 * `./docker.sh run-test-vrt --ui-kit-js` (vrt tests for the native web components)
 * `./docker.sh run-test-vrt --ui-kit-angular` (vrt tests for angular components)
 * `./docker.sh run-test-vrt --ui-kit-react` (vrt tests for react components)
 * `./docker.sh run-test-vrt --design-system` (vrt tests for the storefront)

### Cross Browser Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
 * `./docker.sh run-test-cbt` (cbt tests for the entire application)
 * `./docker.sh run-test-cbt --ui-kit-js` (cbt tests for the native web components)
 * `./docker.sh run-test-cbt --ui-kit-angular` (cbt tests for angular components)
 * `./docker.sh run-test-cbt --ui-kit-react` (cbt tests for react components)

#### What to do when vrt or cbt tests are failing
1. Switch to your results directory in `/packages/{DESIRED_PACKAGE_NAME}/tests/{vrt/cbt}/results`. Here you can find the belonging `diff` and `regression` images.
1. Check if you would like to accept the changes
  * **If yes**: Replace the reference shot in the `/{vrt/cbt}/fixtures` folder with the belonging one in the `/{vrt/cbt}/results` folder and delete the images in the `/{vrt/cbt}/results` directory afterwards manually.
  * **If no**: Recheck your code and run the tests again, when you think you fixed it.

### Deploy
_It's a job exclusively for the CI/CD pipeline, that's why it should not be executed locally._
1. Switch to __project root directory__
1. Run `./docker.sh run-deploy`

### Slack
_It's a job exclusively for the CI/CD pipeline, that's why it should not be executed locally._
1. Switch to __project root directory__
1. Run `./docker.sh run-slack`

## Dependency updates
Every week, we update our npm packages:

1. Switch to __project root directory__
1. Run `./docker.sh run-upgrade`  
This should output the dependencies you might want to update. Select the npm dependencies to be updated and press
_Enter_. Afterwards execute automated tests to make sure application still works.
1. Run `./docker.sh run-build`  
1. Run `./docker.sh run-lint`  
1. Run `./docker.sh run-test-unit`  
1. Run `./docker.sh run-test-e2e`  
1. Run `./docker.sh run-test-vrt`  
1. Run `./docker.sh run-test-cbt`  
As final check start application locally and have a look at it.
1. Run `./docker.sh run-start`

### Hints for updating
1. Make sure you pulled the latest version before starting
1. npm registry is linked to a private one (jFrog Artifactory). Make sure you've followed instructions mentioned in
__Getting started__ section to be able to authenticate during npm dependency update process.


## Build status

[GitHub Actions](https://github.com/porscheui/porsche-ui-kit/actions)


## Developing new components

This tool automatically creates a catalog of ui components. For its magic to work, new components have to follow a few rules:

1. **File location:** A component is developed as a self containing element under `packages/ui-kit-js/src/components`.
1. **Component description:** A component should have a `COMPONENTNAME.code.md` and a `COMPONENTNAME.design.md` file which describes its general purpose, design/development specifications and examples.
1. **Props:** The component has to describe its props using typescript types and documentation.


## Release management - Porsche UI Kit (JS/Angular/React)

### Preparation
1. After merge requirements of a pull request are fulfilled, it can be merged to given release branch (don't forget to delete the PR branch afterwards)
1. Switch to __project root directory__
1. Run `git pull`
1. Run `./docker.sh run-install`
1. Run `./docker.sh run-build --utils`

### UI Kit JS
1. Run `./docker.sh run-build --ui-kit-js`
1. Check for needless auto generated files (e.g. *.props.md) which might be generated by the build task and discard them
1. Switch to __packages/ui-kit-js directory__
1. Execute `yarn version --no-git-tag-version` and enter new patch or minor version
1. Open `CHANGELOG.md` and update release notes with proper date and version

### UI Kit Angular
1. Switch to __packages/ui-kit-angular/projects/ui-kit-wrapper directory__
1. Execute `yarn version --no-git-tag-version` and enter new patch or minor version
1. Update UI Kit JS dependency to corresponding version number (must always be pinned)
1. Update version number of `@porsche-ui/ui-kit-angular` in the example project to corresponding version number
1. Update `src/lib/ui-kit-wrapper.module.ts` if necessary
1. Open `CHANGELOG.md` and update release notes with proper date and version
1. Switch to __project root directory__
1. Run `./docker.sh run-build --ui-kit-angular`

### UI Kit React
1. Switch to __packages/ui-kit-react/projects/ui-kit-wrapper directory__
1. Execute `yarn version --no-git-tag-version` and enter new patch or minor version
1. Update UI Kit JS dependency to corresponding version number (must always be pinned)
1. Update version number of `@porsche-ui/ui-kit-react` in the example project to corresponding version number
1. Open `CHANGELOG.md` and update release notes with proper date and version
1. Switch to __project root directory__
1. Run `./docker.sh run-build --ui-kit-react`

### Test
1. Switch to __project root directory__
1. Run `./docker.sh run-lint --ui-kit-js`
1. Run `./docker.sh run-test-unit --ui-kit-js`
1. Run `./docker.sh run-test-e2e --ui-kit-js`
1. Run `./docker.sh run-test-vrt --ui-kit-js`
1. Run `./docker.sh run-test-vrt --ui-kit-angular`
1. Run `./docker.sh run-test-vrt --ui-kit-react`
1. Run `./docker.sh run-test-cbt --ui-kit-js`
1. Run `./docker.sh run-test-cbt --ui-kit-angular`
1. Run `./docker.sh run-test-cbt --ui-kit-react`
1. Check for needless auto generated files (e.g. *.props.md) which might be generated by the build task and discard them

### Commit
1. Create a commit with following message structure `Release Porsche UI Kit (JS/Angular/React) v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Create a Git tag `git tag v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER}`
1. Push local commit with tag to release branch `git push && git push --tags`

### Publish
1. Switch to __packages/ui-kit-js directory__
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the UI Kit JS artifact to the Artifactory repository.
1. Switch to __packages/ui-kit-angular/dist/ui-kit-wrapper directory__ (make sure to release package within **dist** folder)
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the UI Kit Angular artifact to the Artifactory repository.
1. Switch to __packages/ui-kit-react/projects/ui-kit-wrapper directory__ (make sure to release package within **projects** folder)
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the UI Kit React artifact to the Artifactory repository.

### Communicate
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel of porsche.slack.com workspace


## Release management - Porsche UI Kit (SCSS Utils)

### Preparation
1. After merge requirements of a pull request are fulfilled, it can be merged to given release branch (don't forget to delete the PR branch afterwards)
1. Switch to __project root directory__
1. Run `git pull`

### UI Kit SCSS Utils
1. Switch to __packages/ui-kit-scss-utils directory__
1. Execute `yarn version --no-git-tag-version` and enter new patch or minor version
1. Open `CHANGELOG.md` and update release notes with proper date and version

### Commit
1. Create a commit with following message structure `Release Porsche UI Kit SCSS Utils v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Push local commit to release branch `git push`

### Publish
1. Switch to __packages/ui-kit-scss-utils directory__
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the UI Kit SCSS Utils artifact to the Artifactory repository.

### Communicate
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel of porsche.slack.com workspace


## Release management - Porsche UI Kit (Sketch Libraries)

### Preparation
1. Export related Sketch file from master, e.g. Web Library (https://share.goabstract.com/e9baaa65-1d0b-472a-a134-a50f2c079d5e) or Basic Library (https://share.goabstract.com/401193dc-0054-45f1-b034-8e1a9a25590e)
1. Rename exported file to correct naming format, e.g. porsche-ui-kit-web.sketch
1. Use existing issue branch or create a new branch (for Sketch Update only)

### Sketch Library
1. Switch to __sketch directory__
1. Replace existing file with new file
1. Switch to __docker/node/bin directory__ and open `run-deploy`
1. Increase version increment according to the update `P_LATEST_STABLE_SKETCH_VERSION="v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER}"`

### Commit
1. Create a commit
1. Push local commit to issue branch `git push`
