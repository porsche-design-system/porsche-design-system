# Angular - Sample integration

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

* Follow the instructions at [Introduction](https://designsystem.porsche.com/v1/#/start-coding/introduction) to get the required npm package
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

### Prefixing
Another way of preventing conflicts is by using a unique custom prefix for the components.
If you choose to use a prefix you can set it via the `WEB_COMPONENTS_PREFIX` inject token.  
When using custom prefixed component tags, you've to add also the
[schema `CUSTOM_ELEMENTS_SCHEMA`](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA)
to the modules that use the prefixed components.  
Keep in mind. that prefixed versions only work with components that use shadow root. This means, that if you
do use prefixes, you can't use `p-grid`, `p-grid-item`, `p-flex` or `p-flex-item`.

You can provide the token as follows:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PorscheDesignSystemModule, WEB_COMPONENTS_PREFIX } from '@porsche-design-system/components-angular';
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
      provide: WEB_COMPONENTS_PREFIX,
      useValue: 'sample-prefix'
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You can now use the components as follows:

``` 
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <sample-prefix-p-headline p-headline variant="headline-1">Headline</sample-prefix-p-headline>
    </div>
  `,
  styles: []
})
export class AppComponent {}
```

Be aware, that you still have to set the component name without the prefix as an
attribute, else you might get unexpected results in some edge cases.

You can even add more prefixes with the `PrefixService`:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PorscheDesignSystemModule, WEB_COMPONENTS_PREFIX, PrefixService } from '@porsche-design-system/components-angular';
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
      provide: WEB_COMPONENTS_PREFIX,
      useValue: 'sample-prefix'
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private prefixService: PrefixService) {
    prefixService.load('another-prefix');
  }
}
```