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

Different components can be cross-referenced using the `@see` annotation inside the component description. Simply put the components name after the annotation and a link to it will automatically appear in the header of the documentation page.

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
1. Push local commit with tag to `0.x` branch `git push --tags`
1. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel of porsche.slack.com workspace

## Generating React Components from SVGs

### Using svgr

If you have many project specific icons, you probably don't want to create their component counterparts by hand. We automatically generate Typescript React components from svg files using [https://github.com/smooth-code/svgr](svgr) by following a couple rules:

Note: The paths need to be converted to contourlines right before export (eg. Illustrator)

1.  Every black (#000 or #000000) fill will be replaced with "currentColor" so that we can change the color of the icon using the css color attribute

2.  Every white (#fff or #ffffff) fill will be replaced with "none". Use this to create masks.

3.  Every other color will be kept statically and won't change no matter what css class is set. This is almost certainly never a use case, so don't use any other color than black or white.

4.  The width and size of the svg is replaced with "1em" so that we can change the size of the icon using the css font-size attribute.

We use the following template for svgr:

```
function typescriptTemplate({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const typescriptTpl = template.smart({ plugins: ["typescript"] })
    return typescriptTpl.ast`
      import * as React from 'react';
      const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
      export default ${componentName};
    `
}
module.exports = typescriptTemplate
```

And we run svgr with the following command:

```
svgr --icon --replace-attr-values '#000000=currentColor' --replace-attr-values '#000=currentColor' --replace-attr-values '#ffffff=none' --replace-attr-values '#fff=none' --ext tsx --template <template-path> -d <source-directory> <target-directory>
```

### By Hand

If you create the components by hand, they should have a shape similar to this:

```
import * as React from "react"

const SvgIcon = (props: React.SVGProps<SVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        ...
    </svg>
)

export default SvgIcon
```

The viewbox can be sized however you like, but width and height need to be 1em.
