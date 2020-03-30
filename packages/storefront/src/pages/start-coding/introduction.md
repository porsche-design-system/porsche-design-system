# Start Coding

Porsche Design System provides developers with a collection of Web components, Angular components and React components to build clean and high-quality frontends 
that innately come with the latest design definitions. If you are working for a digital product of Porsche we are happy to invite you to our UX onboarding process 
and tell you more about our culture of designing great digital experiences and give you access to all of our frameworks standards and tools: [Sign Up for the Onboarding](https://ux.porsche.com/). 

To enable a smooth start with the Porsche Design System we have created sample projects in all common frameworks.
These projects show how to install and the usage of the Porsche Design System. Furthermore, the example projects contain examples and solutions for testing.

--- 

## Requirements
* [Node.js & NPM](https://nodejs.org)

### Get required NPM-Packages

All releases of the Porsche Design System are available as versioned NPM package called `@porsche-design-system/components-js`, `@porsche-design-system/components-angular` 
and `@porsche-design-system/components-react`.

Those packages can be consumed by one of the following private NPM registries:
* Porsche Design System NPM registry ([https://porscheui.jfrog.io](https://porscheui.jfrog.io))
* My Porsche NPM registry ([https://porschedev.jfrog.io](https://porschedev.jfrog.io))

If you don't have an account for one of the those NPM registries, you can easily register for the Porsche Design System NPM registry like as follows:


<p-link target="_blank" href="http://eepurl.com/ghVSjH">Request a Porsche Design System npm registry account</p-link>

1. Follow the instructions sent by e-mail
1. Execute `npm login --registry=https://porscheui.jfrog.io/porscheui/api/npm/npm/`
1. Enter username, password (Artifactory API Key, __not__ Artifactory password!) and e-mail address when asked in the terminal (this will add the credentials to your global user `~/.npmrc`)
1. Add local `.npmrc` at the root of your NPM project and add the following lines of code:
``` 
always-auth = true
@porsche-design-system:registry = https://porscheui.jfrog.io/porscheui/api/npm/npm/
``` 
--- 

### SCSS utils

SCSS utils can be used for easier Scss/Sass development. See [SCSS utils section](#/scss-utils/introduction) for further information.

--- 

### Web components used with non-supported framework

At time of writing we only provide wrappers for Angular and React. But this doesn't mean that our web components can't be used with other frameworks like Vue or Ember. 
Just follow these guidelines to make our web components work in other frameworks:

- [Guidelines for Vue](https://stenciljs.com/docs/vue)
- [Guidelines for Ember](https://stenciljs.com/docs/ember)
