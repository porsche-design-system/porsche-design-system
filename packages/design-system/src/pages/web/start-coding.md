# Start Coding

Porsche UI Kit provides developers with a collection of presentational web components and corresponding wrappers for React and Angular to build clean and high-quality front-ends that innately come with the latest design definitions.

## Installation

All releases of the Porsche UI Kit are available as a versioned npm package called `@porscheui/ui-kit-js`, `@porscheui/ui-kit-react` and `@porscheui/ui-kit-angular` in the private npm registry ([https://porscheui.jfrog.io](https://porscheui.jfrog.io)). Please [request a Porsche UI npm registry account](http://eepurl.com/gnOIXD).  

After receiving account credentials, you can install the appropriate npm package:

#### Web components:
``` 
// install with npm:
npm install @porscheui/ui-kit-js

// install with yarn:
yarn add @porscheui/ui-kit-js
```

#### React:
``` 
// install with npm:
npm install @porscheui/ui-kit-react

// install with yarn:
yarn add @porscheui/ui-kit-react
```

#### Angular:
``` 
// install with npm:
npm install @porscheui/ui-kit-angular

// install with yarn:
yarn add @porscheui/ui-kit-angular
```

#### SCSS utils (optional):
``` 
// install with npm:
npm install @porscheui/ui-kit-scss-utils --save-dev

// install with yarn:
yarn add @porscheui/ui-kit-scss-utils --dev
``` 

## Usage

### Web components in static environment

If using native web components in a static website (with no specific framework dependencies), the following page setup is recommended:

``` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>p-button-icon</title>
    <link rel="stylesheet" href="PATH/TO/PACKAGE/@porscheui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css">
    <script type="module" src="PATH/TO/PACKAGE/@porscheui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.esm.js"></script>
    <script nomodule src="PATH/TO/PACKAGE/@porscheui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.js"></script>
  </head>
  <body>
    <p-headline variant="headline-1">Lorem ipsum</p-headline>
  </body>
</html>
``` 

--- 

### React components

The React wrapper of web components can be used like every other React component (even with Typescript support). 

After adding the React components package to your project, import component(s) and (S)CSS.
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
import { PHeadline } from '@porscheui/ui-kit-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <PHeadline variant="headline-1">Headline</PHeadline>
    </div>
  )
}

export default App;
``` 

#### Load CSS and SCSS utils
In your `index.scss` import mandatory Porsche UI Kit stylesheet and optional SCSS utilities:

``` 
@import "~@porscheui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css";
@import '~@porscheui/ui-kit-scss-utils/index';
``` 

--- 

### Angular components

The Angular wrapper of web components can be used like every other Angular component (even with Typescript support). 

After adding the Angular components package to your project, set declarations and import (S)CSS. 
The following setup is a standard Angular setup with SCSS support:

#### App module
``` 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComponentLibraryModule } from '@porscheui/ui-kit-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentLibraryModule
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

#### Load CSS and SCSS utils
In your `styles.scss` import mandatory Porsche UI Kit stylesheet and optional SCSS utilities:

``` 
@import "~@porscheui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css";
@import '~@porscheui/ui-kit-scss-utils/index';
``` 

--- 

### SCSS utils

SCSS utils can be used for easier SCSS/SASS development. See [SCSS utils section](#/web/scss-utils/introduction) for further informations.

--- 

### Web components used with non supported framework

AToW we only provide wrappers for React and Angular. But this doesn't mean, that web components can't be used with other frameworks like Vue or Ember. Just follow these guidelines to make web components work in other frameworks:

- [Guidelines for Vue](https://stenciljs.com/docs/vue)
- [Guidelines for Ember](https://stenciljs.com/docs/ember)
