# Sample project integration angular
You can find the repository of the angular example project here: [Sample integration angular](https://github.com/porscheui/sample-integration-angular)

---
## Requirement
* Get the Angular cli by executing `npm install -g @angular/cli`

### Get the project up and running
* Clone the repository by executing <br>
`git clone https://github.com/porscheui/sample-integration-angular.git`

### npm
* Install dependencies via `npm install`
* Run tests via `npm test`
* Run the application via `npm start`
* Build the application via `npm run build`

### yarn
* Install dependencies via `yarn install`
* Run tests via `yarn test`
* Run the application via `yarn start`
* Build the application via `yarn build`

---

## Reproduce on your own
To build your own application which is provided with the Porsche Design System follow these simple steps:

* Run `ng new my-app` to create a new angular workspace and initial project
* Install the Porsche Design System
<br>
<br>
``` 
// install with npm:
npm install @porsche-design-system/components-angular

// install with yarn:
yarn add @porsche-design-system/components-angular
```
<br>
<br>

After adding the `@porsche-design-system/components-angular` package to your project,
you've to import the `PorscheDesignSystemModule` in every module you want to use the
components in. It declares and exports the Porsche Design System Compontents to make
it available in the module that imports it. 
The following setup is a standard Angular CLI project: 

### App module
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

You are now ready to build your own angular application using the Porsche Desing System.