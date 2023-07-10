# Introduction

<TableOfContents></TableOfContents>

## Start Coding

Porsche Design System provides developers with versioned packages of **Web components**, **Angular components**, **React
components** and **Vue components** to build clean and high-quality frontends that innately come with the latest design
definitions.

To enable a smooth start with the Porsche Design System we have created **sample projects** in all common frameworks.
These projects show how to install and the usage of the Porsche Design System. Furthermore, the example projects contain
examples and solutions for testing.

## Requirements

- [Node.js & NPM](https://nodejs.org)

### Get required NPM-Packages

All releases of the Porsche Design System are available as versioned NPM packages. Please read more about them on the
corresponding docs.

- [Web components](developing/vanilla-js): `@porsche-design-system/components-js`
- [Angular components](developing/angular): `@porsche-design-system/components-angular`
- [React components](developing/react): `@porsche-design-system/components-react`
- [Next.js components](developing/next-js): `@porsche-design-system/components-react/ssr`
- [Remix components](developing/remix): `@porsche-design-system/components-react/ssr`
- [Vue components](developing/vue): `@porsche-design-system/components-vue`

Those packages can be consumed by the following public NPM registry:

- NPM registry ([https://www.npmjs.com](https://www.npmjs.com))

Alternatively, they can also be found on the following private NPM registries:

- Porsche Design System NPM registry ([https://porscheui.jfrog.io](https://porscheui.jfrog.io))
- My Porsche NPM registry ([https://porschedev.jfrog.io](https://porschedev.jfrog.io))
- Porsche Highway NPM registry ([https://highway.porsche.com/artifactory](https://highway.porsche.com/artifactory))

## Web components used with a not-supported framework

At the time of writing, we only provide wrappers for Angular, React and Vue. But this doesn't mean that our web
components can't be used with other frameworks like Ember. Just follow these guidelines to make our web components work
in other frameworks:

- [Guidelines for Ember](https://stenciljs.com/docs/ember)
