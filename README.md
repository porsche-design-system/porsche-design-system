![Porsche Marque](https://upload.wikimedia.org/wikipedia/de/thumb/7/70/Porsche_Logo.svg/258px-Porsche_Logo.svg.png)


# Porsche Design System

## Build status
[![Actions Status](https://github.com/porscheui/porsche-design-system/workflows/Porsche%20Design%20System/badge.svg)](https://github.com/porscheui/porsche-design-system/actions)

## Setup

### Requirements
* [Node.js](https://nodejs.org)
* [Yarn](https://yarnpkg.com)
* [Docker](https://www.docker.com) ([see below](#docker-installation-steps))

### Getting started
1. Clone [`porsche-design-system` repository](https://github.com/porscheui/porsche-design-system)
1. Switch to __project root directory__
1. Checkout branch __v1__ by executing `git checkout v1`
1. Execute command `npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/`
1. Enter username, password (Artifactory API Key, __not__ Artifactory password!) and e-mail address when asked in terminal
1. Execute `cat ~/.npmrc`, find following line `//porscheui.jfrog.io/porscheui/api/npm/npm/:_authToken=` and copy the generated _npm registry token_ from the file to your clipboard
1. Create an `.env` file within __project root directory__ (never push this file to Git because it will contain secrets – by default it's ignored by `.gitignore`)
1. Add _npm registry token_ in following format `PORSCHE_NPM_REGISTRY_TOKEN=YOUR_TOKEN_GOES_HERE`
1. Make sure that Docker app is running
1. Run `./docker.sh run-install` - this may take up to several minutes at first start depending on your internet connection

*Note: `./docker.sh run-install` should be executed after every pull.*

### Docker installation steps
1. Register your Docker account on [Hub-Docker](https://hub.docker.com)
1. Download Docker app locally on your machine and login
1. Start Docker

### Build
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
    * `./docker.sh run-build` (builds the entire application)
    * `./docker.sh run-build --icons` (builds the optimized icon set)
    * `./docker.sh run-build --fonts` (builds the font set)
    * `./docker.sh run-build --marque` (builds the marque)
    * `./docker.sh run-build --components-js` (builds the native web components)
    * `./docker.sh run-build --components-angular` (builds angular components)
    * `./docker.sh run-build --components-react` (builds react components)
    * `./docker.sh run-build --storefront` (builds storefront)
    * `./docker.sh run-build --utils` (builds utilities)

### Start
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
    * `./docker.sh run-start` (starts the entire application)
    * `./docker.sh run-start --components-js` (starts native web components)
    * `./docker.sh run-start --components-angular` (starts angular components)
    * `./docker.sh run-start --components-react` (starts react components)
    * `./docker.sh run-start --storefront` (starts storefront)

### Linting
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
    * `./docker.sh run-lint` (lints the entire application)
    * `./docker.sh run-lint --components-js` (lints native web components)
    * `./docker.sh run-lint --storefront` (lints storefront)

### Unit Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
    * `./docker.sh run-test-unit` (unit tests for the entire application)
    * `./docker.sh run-test-unit --components-js` (unit tests for the native web components)
    * `./docker.sh run-test-unit --storefront` (unit tests for the storefront)
    
### Mock Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
    * `./docker.sh run-test-mocks` (mock tests for the entire application)
    * `./docker.sh run-test-mocks --components-react` (mock tests for the react components)

### E2E Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
    * Run `./docker.sh run-test-e2e` (e2e tests for the entire application)
    * `./docker.sh run-test-e2e --components-js` (e2e tests for the native web components)
    * `./docker.sh run-test-e2e --storefront` (e2e tests for the storefront)

### Visual Regression Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
    * `./docker.sh run-test-vrt` (vrt tests for the entire application)
    * `./docker.sh run-test-vrt --components-js` (vrt tests for the native web components)
    * `./docker.sh run-test-vrt --components-angular` (vrt tests for angular components)
    * `./docker.sh run-test-vrt --components-react` (vrt tests for react components)
    * `./docker.sh run-test-vrt --storefront` (vrt tests for the storefront)

### Cross Browser Tests
1. Switch to __project root directory__
1. For the different applications, select one of the following commands:
    * `./docker.sh run-test-cbt` (cbt tests for the entire application)
    * `./docker.sh run-test-cbt --components-js` (cbt tests for the native web components)
    * `./docker.sh run-test-cbt --components-angular` (cbt tests for angular components)
    * `./docker.sh run-test-cbt --components-react` (cbt tests for react components)

#### What to do when vrt or cbt tests are failing
1. Switch to your results directory in `/packages/{DESIRED_PACKAGE_NAME}/tests/{vrt/cbt}/results`. Here you can find the belonging `diff` and `regression` images.
1. Check if you would like to accept the changes
     * **If yes**: Replace the reference shot in the `/{vrt/cbt}/fixtures` folder with the belonging one in the `/{vrt/cbt}/results` folder and delete the images in the `/{vrt/cbt}/results` directory afterwards manually.
     * **If no**: Recheck your code and run the tests again, when you think you fixed it.

### Prepare Release
_Caution: only use this task if you know exactly what you are doing. In case something goes wrong make sure to revert all local changes before executing the task again._
1. Switch to __project root directory__
1. Run `./docker.sh run-prepare-release ${VERSION}`

### Deploy
_It's a job exclusively for the CI/CD pipeline, that's why it should not be executed locally._
1. Switch to __project root directory__
1. Run `./docker.sh run-deploy`

### Slack
_It's a job exclusively for the CI/CD pipeline, that's why it should not be executed locally._
1. Switch to __project root directory__
1. Run `./docker.sh run-slack`

## Dependency updates
Every week, we update our NPM packages:

1. Switch to __project root directory__
1. Run `./docker.sh run-upgrade`  
This should output the dependencies you might want to update. Select the NPM dependencies to be updated and press
_Enter_. Afterwards execute automated tests to make sure application still works.
1. Angular has to be updated with `ng update`.
    1. Run `./docker.sh bash`
    1. `cd packages/components-angular`
    1. `./node_modules/.bin/ng update`
    1. `./node_modules/.bin/ng update @angular/cli @angular/core`
    1. `exit` to leave the docker container
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
1. NPM registry is linked to a private one (jFrog Artifactory). Make sure you've followed instructions mentioned in
__Getting started__ section to be able to authenticate during NPM dependency update process.


## Build status

[GitHub Actions](https://github.com/porscheui/porsche-design-system/actions)


## Developing new components

This tool automatically creates a catalog of ui components. For its magic to work, new components have to follow a few rules:

1. **File location:** A component is developed as a self containing element under `packages/components-js/src/components`.
1. **Component description:** A component should have a `COMPONENTNAME.code.md` and a `COMPONENTNAME.design.md` file which describes its general purpose, design/development specifications and examples.
1. **Props:** The component has to describe its props using typescript types and documentation.

---

## Release management - Porsche Design System Icons

1. Run `./docker.sh run-build --icons`
1. Switch to __packages/icons/dist/icons directory__
1. Upload all `.svg` files to [CDN](https://cdn.ui.porsche.com) (__/assets/porsche-design-system/icons directory__)
1. If filename already exists on CDN skip upload for this specific file (__never overwrite/delete a file hosted on CDN!__)

---

## Release management - Porsche Design System Fonts

1. Run `./docker.sh run-build --fonts`
1. Switch to __packages/fonts/dist/fonts directory__
1. Upload all `.woff|.woff2` files to [CDN](https://cdn.ui.porsche.com) (__/assets/porsche-design-system/fonts directory__)
1. If filename already exists on CDN skip upload for this specific file (__never overwrite/delete a file hosted on CDN!__)

---

## Release management - Porsche Design System Marque

1. Run `./docker.sh run-build --marque`
1. Switch to __packages/marque/dist/marque directory__
1. Upload all `.png` files to [CDN](https://cdn.ui.porsche.com) (__/assets/porsche-design-system/marque directory__)
1. If filename already exists on CDN skip upload for this specific file (__never overwrite/delete a file hosted on CDN!__)

---

## Release management - Porsche Design System Components (JS/Angular/React)

### Preparation
1. After merge requirements of a pull request are fulfilled, it can be merged to given release branch (don't forget to delete the PR branch afterwards)
1. Switch to __project root directory__
1. Run `git pull origin {current master- or v-branch}`
1. Run `./docker.sh run-prepare-release ${VERSION}` (If something goes wrong, make sure to revert all local changes before executing the task again.)

### Storefront
1. Update `updates.md`

### Test
1. Switch to __project root directory__
1. Run `./docker.sh run-test-cbt --components-js`
1. Run `./docker.sh run-test-cbt --components-angular`
1. Run `./docker.sh run-test-cbt --components-react`

### Update CDN assets
1. Update (only if something has changed!) `/assets/porsche-design-system/styles` on CDN by creating a new folder with version (v1, v2, v3,…) and upload generated `porsche-design-system.css` from __packages/components-js/dist/porsche-design-system directory__.
1. Make sure CDN path fits in file `inject-global-style.ts` (lives in __packages/components-js/src/utils directory__).

### Commit
1. Review local changes
1. Create a commit with following message structure `Release Porsche Design System Components (JS/Angular/React) v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Create a Git tag `git tag v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER}`

### Push
1. Push local commit with tag to release branch `git push origin {current master- or v-branch} && git push --tags`

### Publish
1. Switch to __packages/components-js directory__
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the Design System Components JS artifact to the Artifactory repository.
1. Switch to __packages/components-angular/dist/components-wrapper directory__ (make sure to release package within **dist** folder)
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the Design System Components Angular artifact to the Artifactory repository.
1. Switch to __packages/components-react/projects/components-wrapper directory__ (make sure to release package within **projects** folder)
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the Design System Components React artifact to the Artifactory repository.

### Icon platform
1. Switch to __packages/icons/database directory__
1. Upload file to CDN (`https://cdn.ui.porsche.com/porsche-icons/icons.json`)
1. Switch to Icon platform Git repository (`https://github.com/porscheui/porsche-icon-frontend`)
1. Update `@porsche-design-system/components-js` to latest version
1. Build icon platform
1. Deploy icon platform

### Communicate
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche Design System channel of porsche.slack.com workspace

---

## Release management - Porsche Design System Utils (SCSS)

### Preparation
1. After merge requirements of a pull request are fulfilled, it can be merged to given release branch (don't forget to delete the PR branch afterwards)
1. Switch to __project root directory__
1. Run `git pull origin {current master- or v-branch}`

### Design System SCSS Utils
1. Switch to __packages/scss-utils directory__
1. Execute `yarn version --patch --no-git-tag-version` or `yarn version --minor --no-git-tag-version` and enter new patch or minor version
1. Update version number of `@porsche-design-system/utilities` in the mono repo to corresponding version number
1. Open `CHANGELOG.md` and update release notes with proper date and version

### Commit
1. Create a commit with following message structure `Release Porsche Design System SCSS Utils v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Push local commit to release branch `git push origin {current master- or v-branch}`

### Publish
1. Switch to __packages/scss-utils directory__
1. Run `yarn publish --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm-local/` which will deploy the Design System SCSS Utils artifact to the Artifactory repository.

### Communicate
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche Design System channel of porsche.slack.com workspace

---

## Release management - Porsche Design System Sketch Libraries (Basic, Web)

### Preparation
1. Export related Sketch file from master, e.g. Web Library (https://share.goabstract.com/e9baaa65-1d0b-472a-a134-a50f2c079d5e) or Basic Library (https://share.goabstract.com/401193dc-0054-45f1-b034-8e1a9a25590e)
1. Rename exported file to correct naming format, e.g. porsche-design-system-web.sketch
1. Use existing issue branch or create a new branch (for Sketch Update only)

### Sketch Library
1. Switch to __sketch directory__
1. Replace existing file with new file
1. Switch to __docker/node/bin directory__ and open `run-deploy`
1. Increase version increment according to the update `P_LATEST_STABLE_SKETCH_VERSION="{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER}"`

### Commit
1. Create a commit
1. Push local commit to issue branch `git push`

### Release
1. Create Pull Request & Review
1. Merge into "master" branch