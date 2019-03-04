# Porsche UI Kit React

## Installation

This project is a yarn monorepo, so you need to use yarn instead of npm for everything.

### Development

Running `yarn start` will start a webpack dev server. You can reach it at `http://localhost:8080/`.

### Distribution

Running `yarn build` creates a ES6 and CommonJS build under `dist`.

## Developing New Components

This tool automatically creates a catalog of ui components. For its magic to work, new components have to follow a few rules:

1. **File Location:** A component is developed as an atom, molecule, organism or screen under `src/components`.
1. **Export:** The component needs to be exported in `src/index.ts`.
1. **Meta Info:** A component needs a `_meta` object that includes the name, meta type, and optional parent of the component.
1. **Component Description:** A component should have a preceding block comment describing its general purpose.
1. **Props:** The component has to describe its props using typescript types and documentation.
1. **Examples:** The examples of the component are developed under `ui-kit-react-docs/src/examples` with a mirroring folder structure.

### Parent Components

### @see References

Different components can be cross-referenced using the `@see` annotation inside the component description.
Simply put the components name after the annotation and a link to it will automatically appear in the header of the documentation page.

## Publishing artifacts

## Release Management
1. After merge requirements of a pull request are fulfilled, it can be merged to master branch (don't forget to delete the branch afterwards)
1. Goto ui-kit-react project in terminal and pull latest commits with `git pull`
1. Open `CHANGELOG.md` and update release notes with proper date and version
1. Update version of ui-kit-react dependency in `ui-kit-react-docs/package.json` and `ui-kit-react-starter/package.json`
1. Run project with `yarn start` to be sure everything works as expected
1. Create a commit with following message structure `Release react:v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
1. Run `yarn run publish:artifactory` which will deploy the artifact to the Artifactory repository an creates a git tag.
1. Create a Git tag `git tag v0.{MINOR_NUMBER}.{PATCH_NUMBER}/react`
1. Push local commit with tag to master branch `git push --tags`
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel of porsche.slack.com workspace
