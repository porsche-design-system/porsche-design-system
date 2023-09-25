# Angular

<TableOfContents></TableOfContents>

## Quick start

To build your own application with the **Angular** components of the Porsche Design System, follow these steps:

- Follow the instructions at [Introduction](developing/introduction) to get the required npm package
- Run `ng new my-app` to create a new Angular workspace and initial project
- Install the Porsche Design System

```shell script
// install with npm:
npm install @porsche-design-system/components-angular

// install with yarn:
yarn add @porsche-design-system/components-angular
```

You are ready to start building your own application.

### Integration

After adding the `@porsche-design-system/components-angular` package to your project, you've to import the
`PorscheDesignSystemModule` in every module you want to use the components.

The following setup is a standard Angular CLI project:

```ts
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PorscheDesignSystemModule],
  providers: [],
  bootstrap: [AppComponent],
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
      <p-heading>Welcome to Angular</p-heading>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
```

Run `yarn start` or `npm start` and check if the components are displayed correctly.

<Notification heading="Attention" state="warning">
  Now, when you look at the result in your browser you should see an error message like 
  <code>The Porsche Design System is used without using the getInitialStyles() partial.</code><br>
  To fix this, you have to apply the <a href="partials/initial-styles">getInitialStyles() partial</a> which is mandatory since v3.7.0.
</Notification>

## When are Porsche Design System components initialized?

See [componentsReady()](developing/components-ready) for further information.

## Sample integration

We provide a public GitHub repository with a basic sample project setup to show how it is managed in real code.  
You can find the repository of the Angular example project here:
[Sample integration Angular](https://github.com/porsche-design-system/sample-integration-angular)

### Get the project up and running

- Clone the repository by executing  
  `git clone https://github.com/porsche-design-system/sample-integration-angular.git`
- Follow the installation guidelines in the README.md file
