# Angular

<TableOfContents></TableOfContents>

## Quick start

To build your own application with the **Angular** components of the Porsche Design System, follow these steps:

* Follow the instructions at [Introduction](start-coding/introduction) to get the required npm package
* Run `ng new my-app` to create a new Angular workspace and initial project
* Install the Porsche Design System

```shell script
// install with npm:
npm install @porsche-design-system/components-angular

// install with yarn:
yarn add @porsche-design-system/components-angular
```

You are ready to start building your own application.

### Integration

After adding the `@porsche-design-system/components-angular` package to your project, you've to import
the `PorscheDesignSystemModule` in every module you want to use the components.

The following setup is a standard Angular CLI project:

```ts
// app.module.ts

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
export class AppModule {}
``` 

Change your AppComponent to use at least one Porsche Design System component, for example:

```ts
// app.component.ts

import { Component } from '@angular/core';

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

Run `yarn start` or `npm start` and check if the components are displayed correctly.

## When are Porsche Design System components initialized?

See [componentsReady()](helpers/components-ready) for further information.

## Sample integration

We provide a public Github repository with a basic sample project setup to show how it is managed in real code.  
You can find the repository of the Angular example project here: [Sample integration Angular](https://github.com/porscheui/sample-integration-angular)

### Get the project up and running

* Clone the repository by executing  
  `git clone https://github.com/porscheui/sample-integration-angular.git`
* Follow the installation guidelines in the README.md file
