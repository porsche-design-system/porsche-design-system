# Porsche Design System Angular

Angular wrappers for Porsche Design System web components package.

## Installation

```shell script
// install with npm:
npm install @porsche-design-system/components-angular

// install with yarn:
yarn add @porsche-design-system/components-angular
```

## Usage

The Angular wrapper of web components can be used like every other Angular library.

After adding `@porsche-design-system/components-angular` package to your project, import the `PorscheDesignSystemModule`
to your root module. The following setup is a standard Angular CLI project:

### app.module.ts

```ts
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

### app.component.ts

```ts
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