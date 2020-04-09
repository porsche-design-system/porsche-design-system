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

All releases of the Porsche Design System are available as versioned NPM packages called
* `@porsche-design-system/components-js`
* `@porsche-design-system/components-angular`
* `@porsche-design-system/components-react`

Those packages can be consumed by one of the following private NPM registries:
* Porsche Design System NPM registry ([https://porscheui.jfrog.io](https://porscheui.jfrog.io))
* My Porsche NPM registry ([https://porschedev.jfrog.io](https://porschedev.jfrog.io))
* Porsche Highway NPM registry ([https://highway.porsche.com/artifactory/](https://highway.porsche.com/artifactory/))

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

#### Vanilla JS:
``` 
// install with npm:
npm install @porsche-design-system/components-js

// install with yarn:
yarn add @porsche-design-system/components-js
```

#### Angular:
``` 
// install with npm:
npm install @porsche-design-system/components-angular

// install with yarn:
yarn add @porsche-design-system/components-angular
```

#### React:
``` 
// install with npm:
npm install @porsche-design-system/components-react

// install with yarn:
yarn add @porsche-design-system/components-react
```

#### SCSS utils (optional):
``` 
// install with npm:
npm install @porsche-design-system/scss-utils --save-dev

// install with yarn:
yarn add @porsche-design-system/scss-utils --dev
``` 

## Usage

### Vanilla JS

If you're using web components in a static website, the following page setup is recommended (assuming a web server is running):

``` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Porsche Design System</title>
    <script nomodule src="PATH/TO/PACKAGE/@porsche-design-system/components-js/dist/porsche-design-system/porsche-design-system.js"></script>
    <script type="module" src="PATH/TO/PACKAGE/@porsche-design-system/components-js/dist/porsche-design-system/porsche-design-system.esm.js"></script>
  </head>
  <body>
    <p-headline variant="headline-1">Some text</p-headline>
  </body>
</html>
``` 

--- 

### Angular

The Angular components can be used like every other Angular library. 

After adding the `@porsche-design-system/components-angular` package to your project,
you've to import the `PorscheDesignSystemModule` in every module you want to use the
components in. It declares and exports the Porsche Design System Compontents to make
it available in the module that imports it. 
The following setup is a standard Angular CLI project:

#### App module
``` 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PorscheDesignSystemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

``` 

#### App component
``` 
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <p-headline variant="headline-1">Headline</p-headline>
    </div>
  `,
  styles: []
})
export class AppComponent {}
```

### React

The React wrappers for web components can be used like every other React component - even with Typescript support. 

After adding `@porsche-design-system/components-react` package to your project, import component(s).
The following setup is a standard React Scripts (Create React App) setup with SCSS support:

#### Index file
``` 
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

``` 

#### App file
``` 
import React from 'react';
import { PHeadline } from '@porsche-design-system/components-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <PHeadline variant="headline-1">Headline</PHeadline>
    </div>
  )
}

export default App;
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