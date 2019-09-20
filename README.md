![Porsche Marque](https://upload.wikimedia.org/wikipedia/de/thumb/7/70/Porsche_Logo.svg/258px-Porsche_Logo.svg.png)


# Porsche UI Kit

## Setup

### Requirements
* [Docker](https://www.docker.com)
* [Node.js](https://nodejs.org)
* [Yarn](https://yarnpkg.com)

### Getting started
1. Clone [`porsche-ui-kit` repository](https://github.com/porscheui/porsche-ui-kit)
1. Switch to __project root directory__
1. Checkout branch __v1__ by executing `git checkout v1`
1. Execute `npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/`
1. Enter username, password (Artifactory API Key __not__ Artifactory password!) and e-mail address when asked in terminal
1. Execute `cat ~/.npmrc`, find following line `//porscheui.jfrog.io/porscheui/api/npm/npm/:_authToken=` and copy generated _npm registry token_ to clipboard
1. Create an `.env` file within __project root directory__ (never push this file to Git because it will contain secrets, – by default it's ignored by `.gitignore`)
1. Add _npm registry token_ in following format `PORSCHE_NPM_REGISTRY_TOKEN=YOUR_TOKEN_GOES_HERE` 
1. In addition add an _npm registry token_ for Stencil Enterprise registry too in following format `IONIC_NPM_REGISTRY_TOKEN=YOUR_TOKEN_GOES_HERE` (the token is managed by Porsche UI team)
1. Run `./docker.sh run-install` (make sure that Docker is running)

*Note: `./docker.sh run-install` should be executed after every pull.*

### Build
* Switch to __project root directory__
* Run `./docker.sh run-build`, `./docker.sh run-build --ui-kit-js`, `./docker.sh run-build --ui-kit-angular`, `./docker.sh run-build --ui-kit-react`, `./docker.sh run-build --design-system` or `./docker.sh run-build --utils`

### Start
* Switch to __project root directory__
* Run `./docker.sh run-start`, `./docker.sh run-start --ui-kit-js`, `./docker.sh run-start --ui-kit-angular`, `./docker.sh run-start --ui-kit-react` or `./docker.sh run-start --design-system`

### Linting
* Switch to __project root directory__
* Run `./docker.sh run-lint`, `./docker.sh run-lint --ui-kit-js` or `./docker.sh run-lint --design-system`

### Unit Tests
* Switch to __project root directory__
* Run `./docker.sh run-test-unit`, `./docker.sh run-test-unit --ui-kit-js` or `./docker.sh run-test-unit --design-system`

### E2E Tests
* Switch to __project root directory__
* Run `./docker.sh run-test-e2e`, `./docker.sh run-test-e2e --ui-kit-js` or `./docker.sh run-test-e2e --design-system`

### Visual Regression Tests
* Switch to __project root directory__
* Run `./docker.sh run-test-vrt`, `./docker.sh run-test-vrt --ui-kit-js`, `./docker.sh run-test-vrt --ui-kit-angular`, `./docker.sh run-test-vrt --ui-kit-react` or `./docker.sh run-test-vrt --design-system`

#### What to do when tests are failing
* Switch to your results directory in `/packages/{DESIRED_PACKAGE_NAME}/tests/vrt/results`. Here you can find the belonging `diff` and `regression` images.
* Check if you would like to accept the changes
  * **If yes**: Replace the reference shot in the `/vrt/fixtures` folder with the belonging one in the `/vrt/results` folder and delete the images in the `/vrt/results` directory afterwards manually.
  * **If no**: Recheck your code and run the tests again, when you think you fixed it.

### Deploy
_It's a job exclusively for the CI/CD pipeline, that's why it should not be executed locally._
* Switch to __project root directory__
* Run `./docker.sh run-deploy`

### Slack
_It's a job exclusively for the CI/CD pipeline, that's why it should not be executed locally._
* Switch to __project root directory__
* Run `./docker.sh run-slack`

## Dependency updates
Every week, we update our npm packages:

* Switch to __project root directory__
* Run `./docker.sh run-upgrade`  
This should output the dependencies you might want to update. Select the npm dependencies to be updated and press
_Enter_. Afterwards execute automated tests to make sure application still works.
* Run `./docker.sh run-build`  
* Run `./docker.sh run-lint`  
* Run `./docker.sh run-test-unit`  
* Run `./docker.sh run-test-e2e`  
* Run `./docker.sh run-test-vrt`  
As final check start application locally and have a look at it.
* Run `./docker.sh run-start`

### Hints for updating
* Make sure you pulled the latest version before starting
* npm registry is linked to a private one (jFrog Artifactory). Make sure you've followed instructions mentioned in
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
1. Either execute `yarn version patch` for a patch release or `yarn version minor` for a minor release
1. Open `CHANGELOG.md` and update release notes with proper date and version

### UI Kit Angular
1. Switch to __packages/ui-kit-angular/projects/ui-kit-wrapper directory__
1. Either execute `yarn version patch` for a patch release or `yarn version minor` for a minor release
1. Update UI Kit JS dependency to corresponding version number (must always be pinned)
1. Update `src/lib/ui-kit-wrapper.module.ts` if necessary
1. Switch to __project root directory__
1. Run `./docker.sh run-build --ui-kit-angular`

### UI Kit React
1. Switch to __packages/ui-kit-react/projects/ui-kit-wrapper directory__
1. Either execute `yarn version patch` for a patch release or `yarn version minor` for a minor release
1. Update UI Kit JS dependency to corresponding version number (must always be pinned)
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
1. Run `./docker.sh run-start --ui-kit-js` and validate with BrowserStack that IE11/Edge polyfill works
1. Run `./docker.sh run-start --ui-kit-angular` and validate with BrowserStack that IE11/Edge polyfill works
1. Run `./docker.sh run-start --ui-kit-react` and validate with BrowserStack that IE11/Edge polyfill works

### Commit
1. Create a commit with following message structure `Release Porsche UI Kit (JS/Angular/React) v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Create a Git tag `git tag v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER}`
1. Push local commit with tag to release branch `git push && git push --tags`

### Publish
1. Switch to __packages/ui-kit-js directory__
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the UI Kit JS artifact to the Artifactory repository.
1. Switch to __packages/ui-kit-angular/dist/ui-kit-wrapper directory__
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the UI Kit Angular artifact to the Artifactory repository.
1. Switch to __packages/ui-kit-react/projects/ui-kit-wrapper directory__
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
1. Either execute `yarn version patch` for a patch release or `yarn version minor` for a minor release
1. Open `CHANGELOG.md` and update release notes with proper date and version

### Commit
1. Create a commit with following message structure `Release Porsche UI Kit SCSS Utils v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Push local commit to release branch `git push`

### Publish
1. Switch to __packages/ui-kit-scss-utils directory__
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the UI Kit SCSS Utils artifact to the Artifactory repository.

### Communicate
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel of porsche.slack.com workspace