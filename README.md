<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/de/thumb/7/70/Porsche_Logo.svg/258px-Porsche_Logo.svg.png" />
</div>

# Porsche UI-Kit [WIP]

## Build Status

[![CircleCI](https://circleci.com/gh/porscheui/porsche-ui-kit.svg?style=svg&circle-token=c41c837d241f2dd5cdb806c786e577c2d55c5672)](https://circleci.com/gh/porscheui/porsche-ui-kit)

## Mission

Give every designer and developer working at the digital Porsche ecosystem a qualitative and brand-aligned collection of design elements with complemented guidance to improve their design workflow in efficiency and focus on user value.

## Installation

Run `npm install`

### Development

Running `npm start` will start storybook and its development server. You can reach it at `http://localhost:8080/`.

### Distribution

Running `npm build` creates a ES6 and CommonJS build under `dist`.

## Developing New Components

This tool automatically creates a catalog of ui components. For its magic to work, new components have to follow a few rules:

1. **File Location:** A component is developed as a self containing element under `src/components`.
1. **Export:** The component needs to be exported in `src/index.ts`.
1. **Component Description:** A component should have a `readme.md` file which describes its general purpose, design/development specifications.
1. **Props:** The component has to describe its props using typescript types and documentation.
1. **Examples:** The examples of the component are developed with a `.story` file inside the same component folder.

## Publishing artifacts and release management

1. After merge requirements of a pull request are fulfilled, it can be merged to given release branch (don't forget to delete the branch afterwards)
1. Goto project in terminal and pull latest commits with `git pull`
1. Open `CHANGELOG.md` and update release notes with proper date and version
1. Run project with `npm start` to be sure everything works as expected
1. Create a commit with following message structure `Release v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Run `npm run publish` which will deploy the artifact to the Artifactory repository and creates a git tag.
1. Push local commit with tag to release branch `git push --tags`
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel of porsche.slack.com workspace
