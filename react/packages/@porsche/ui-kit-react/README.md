# Finder UI Kit

## Installation

This project is a yarn monorepo, so you need to use yarn instead of npm for everything.

### Development

Running `npm run docs` will start a webpack dev server. You can reach it at `http://localhost:8080/`.

### Distribution

Running `npm run build` creates a ES6 and CommonJS build under `dist`.

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

### Login credentials
To be able to publish artifacts to the Artifactory repository you have to provide some meta information. First of all you have to provide the login credentials for the Artifactory. In this project we are using NPM scopes to distinguish which artifact should retrieve the dependency from which repository. Therefore you have to execute `curl -uadmin:password "https://porschedev.jfrog.io/porschedev/api/npm/pouikit-npm/auth/porsche"` where admin is your Artifactory ID and password is the genereated API Key (Base64 encoded) which you can generate in the Artifactory's profile section. You'll have to create a .npmrc file in the project folder and paste the information you will get into it. This will look similiar to:
`@porsche:registry=https://porschedev.jfrog.io/porschedev/api/npm/pouikit-npm/
 //porschedev.jfrog.io/porschedev/api/npm/pouikit-npm/:_password=<password>
 //porschedev.jfrog.io/porschedev/api/npm/pouikit-npm/:username=8354932
 //porschedev.jfrog.io/porschedev/api/npm/pouikit-npm/:email=<YOUR_EMAIL>
 //porschedev.jfrog.io/porschedev/api/npm/pouikit-npm/:always-auth=true`
 The user is a technical user created only for the Artifactory publishing use case.
 The password can be obtained from Aleksandar Tolev (aleksandar.tolev@porsche.de) or Christoph Albert (christoph.albert@mhp.com).
 
## Release Management
1. Lookup for local `.yarnrc` file inside `react/packages/@porsche/ui-kit-react/` and check if the following config entry exists: *version-tag-prefix "react/v"*. If not, create file with config line.
2. After merge requirements of a pull request are fulfilled, it can be merged to master branch (don't forget to delete the branch afterwards)
3. Goto ui-kit-react project in terminal and pull latest commits with `git pull`
4. Open `CHANGELOG.md` and update release notes with proper date and version
5. Update version of ui-kit-react dependency in `ui-kit-react-docs/package.json` and `ui-kit-react-starter/package.json`
6. Run project with `yarn start` to be sure everything works as expected
7. Create a commit with following message structure `Release react:v{MAJOR_NUMBER}.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION}`
8. Run `yarn run publish:artifactory` which will deploy the artifact to the Artifactory repository an creates a git tag.
9. Push local commit with tag to master branch `git push --tags`
10. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel of porsche.slack.com workspace
