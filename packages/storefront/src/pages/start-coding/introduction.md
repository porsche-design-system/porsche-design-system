# Introduction

<TableOfContents></TableOfContents>

## Start Coding

Porsche Design System provides developers with versioned packages of **Web components**, **Angular components** and **React components** to build clean and high-quality frontends that innately come with the latest design definitions.

To enable a smooth start with the Porsche Design System we have created **sample projects** in all common frameworks. These projects show how to install and the usage of the Porsche Design System. Furthermore, the example projects contain examples and solutions for testing.

## Requirements
* [Node.js & NPM](https://nodejs.org)

### Get required NPM-Packages

All releases of the Porsche Design System are available as versioned NPM packages. Please read more about them on the corresponding docs.
* [Web components](start-coding/vanilla-js): `@porsche-design-system/components-js`
* [Angular components](start-coding/angular): `@porsche-design-system/components-angular`
* [React components](start-coding/react): `@porsche-design-system/components-react`

Those packages can be consumed by one of the following private NPM registries:
* Porsche Design System NPM registry ([https://porscheui.jfrog.io](https://porscheui.jfrog.io))
* My Porsche NPM registry ([https://porschedev.jfrog.io](https://porschedev.jfrog.io))
* Porsche Highway NPM registry ([https://highway.porsche.com/artifactory/](https://highway.porsche.com/artifactory/))

If you don't have an account for one of the those NPM registries, you can easily register for the Porsche Design System NPM registry like as follows:

<p-link target="_blank" href="https://ux.porsche.com/sign-up">Request a Porsche Design System npm registry account</p-link>

1. Follow the instructions sent by e-mail
1. Execute `npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/`
1. Enter username, password (Artifactory API Key, __not__ Artifactory password!) and e-mail address when asked in the terminal (this will add the credentials to your global user `~/.npmrc`)
1. Add local `.npmrc` at the root of your NPM project and add the following lines of code:
``` 
always-auth = true
@porsche-design-system:registry = https://porscheui.jfrog.io/porscheui/api/npm/npm/
``` 

### Get optional NPM-Packages

We provide some additional packages which could help you in your daily business and hopefully make your coding life easier. These packages are optional and not directly needed to use our Porsche Design System components.

All releases of the Porsche Design System additional packages are available as versioned NPM packages. Please read more about them on the corresponding docs.
* [Utilities](utilities/introduction): `@porsche-design-system/utilities`
* [Assets](assets/introduction): `@porsche-design-system/assets`

## Web components used with a not-supported framework

At the time of writing, we only provide wrappers for Angular and React. But this doesn't mean that our web components can't be used with other frameworks like Vue or Ember. 
Just follow these guidelines to make our web components work in other frameworks:

- [Guidelines for Vue](https://stenciljs.com/docs/vue)
- [Guidelines for Ember](https://stenciljs.com/docs/ember)