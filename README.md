![Porsche Marque](https://upload.wikimedia.org/wikipedia/de/thumb/7/70/Porsche_Logo.svg/258px-Porsche_Logo.svg.png)

# Porsche UI-Kit

## Development

### Requirements
* [Docker](https://www.docker.com)
* [Node.js](https://nodejs.org)
* [Yarn](https://yarnpkg.com)

### Getting started
1. Clone [`porsche-ui-kit` repository](https://github.com/porscheui/porsche-ui-kit)
1. Switch to __project root directory__
1. Checkout branch __1.x__ by executing `git checkout 1.x`
1. Execute `npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/`
1. Enter username, password (Artifactory API Key __not__ Artifactory password!) and e-mail address when asked in terminal
1. Execute`cat ~/.npmrc`, find following line `//porscheui.jfrog.io/porscheui/api/npm/npm/:_authToken=` and copy generated _npm registry token_ to clipboard
1. Create an `.env` file within __project root directory__ (never push this file to Git because it will contain secrets, – by default it's ignored by `.gitignore`)
1. Add _npm registry token_ in following format `ARTIFACTORY_TOKEN=YOUR_TOKEN_GOES_HERE` 
1. Run `./docker.sh run-install` (make sure that Docker is running)

*Note: `./docker.sh run-install` should be executed after every pull.*

### Run application
* Switch to __project root directory__
* Run `./docker.sh run-app`

### Linting
* Switch to __project root directory__
* Run `./docker.sh run-lint`

### Visual Regression Tests
* Switch to __project root directory__
* Run `./docker.sh run-vrt`

### Build
* Switch to __project root directory__
* Run `./docker.sh run-build`

### Deploy
_It's a job exclusively for the CI/CD pipeline, that's why it won't be executable locally._
* Switch to __project root directory__
* Run `./docker.sh run-deploy`


## Build Status

[![CircleCI](https://circleci.com/gh/porscheui/porsche-ui-kit.svg?style=svg&circle-token=c41c837d241f2dd5cdb806c786e577c2d55c5672)](https://circleci.com/gh/porscheui/por`sche-ui-kit)

## Mission

Give every designer and developer working at the digital Porsche ecosystem a qualitative and brand-aligned collection of design elements with complemented guidance to improve their design workflow in efficiency and focus on user value.

## Installation

Run `yarn install`

### Development

Running `yarn start` will start storefront and its development server. You can reach it at `http://localhost:3000/`.

### Distribution

Running `yarn build` creates a ES6 and CommonJS build under `dist`.

## Developing New Components

This tool automatically creates a catalog of ui components. For its magic to work, new components have to follow a few rules:

1. **File Location:** A component is developed as a self containing element under `packages/workshop/src/components`.
1. **Export:** The component needs to be exported in `packages/workshop/src/index.ts`.
1. **Component Description:** A component should have a `COMPONENTNAME.code.mdx` and a `COMPONENTNAME.design.mdx` file which describes its general purpose, design/development specifications and examples.
1. **Props:** The component has to describe its props using typescript types and documentation.


## Publishing artifacts and release management

1. After merge requirements of a pull request are fulfilled, it can be merged to given release branch (don't forget to delete the branch afterwards)
1. Goto project in terminal and pull latest commits with `git pull`
1. Open `CHANGELOG.md` and update release notes with proper date and version
1. Run project with `npm start` to be sure everything works as expected
1. Create a commit with following message structure `Release v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Run `npm run publish` which will deploy the artifact to the Artifactory repository and creates a git tag.
1. Push local commit with tag to release branch `git push --tags`
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel of porsche.slack.com workspace
