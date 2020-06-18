# Angular
## Sample integration

You can find the repository of the angular example project here: [Sample integration angular](https://github.com/porscheui/sample-integration-angular)

## Requirement
* Get the Angular cli by executing `npm install -g @angular/cli`

### Get the project up and running
* Clone the repository by executing <br>
`git clone https://github.com/porscheui/sample-integration-angular.git`

### yarn
* Install dependencies via `yarn install`
* Run tests via `yarn test`
* Run the application via `yarn start`
* Build the application via `yarn build`

### npm
* Install dependencies via `npm install`
* Run tests via `npm test`
* Run the application via `npm start`
* Build the application via `npm run build`

---

## Reproduce on your own
To build your own application with the components of the Porsche Design System, follow these steps:

* Follow the instructions at [Introduction](#/start-coding/introduction) to get the required npm package
* Run `ng new my-app` to create a new Angular workspace and initial project
* Install the Porsche Design System

``` 
// install with npm:
npm install @porsche-design-system/components-angular

// install with yarn:
yarn add @porsche-design-system/components-angular
```

After adding the `@porsche-design-system/components-angular` package to your project,
you've to import the `PorscheDesignSystemModule` in every module you want to use the components.
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
Run the application by executing `yarn start` or `npm start` and see if the Porsche Design System component is rendered correctly.

You are now ready to build your own Angular application using the Porsche Design System.

## Advanced usage
By default the `PorscheDesignSystemModule` takes care of registering the Web Components via the Porsche Design
System Loader automatically.  
But in some cases, for example if you want to include the Porsche Design System in Web Components that
you build with Angular, you might need more control on who is registering those components to prevent
conflicts. In this case you can provide the `PREVENT_WEB_COMPONENTS_REGISTRATION` inject token with the
value `true`. This will prevent the loading of polyfills and registration of the Web Components provided
by the Porsche Design System, while keeping you able to use the Angular components.  
Caution, if you opt-out of the automatic registering you've to take care that they are registered in some
other place, else the Angular components won't work as expected.

You can provide the token as follows:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheDesignSystemModule, PREVENT_WEB_COMPONENTS_REGISTRATION } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PorscheDesignSystemModule
  ],
  providers: [
    {
      provide: PREVENT_WEB_COMPONENTS_REGISTRATION,
      useValue: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
