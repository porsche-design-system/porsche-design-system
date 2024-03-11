# Porsche Design System - Components Angular

Porsche Design System is a component library designed to help developers create the best experience for software or
services distributed by Dr. Ing. h.c. F. Porsche AG. Visit the [Porsche Design System](https://designsystem.porsche.com)
to learn more.

## Using the Porsche Design System

### Installation

Run the following command using [npm](https://npmjs.com):

```bash
npm install @porsche-design-system/components-angular
```

If you prefer [Yarn](https://yarnpkg.com), use the following command instead:

```bash
yarn add @porsche-design-system/components-angular
```

### Usage

After adding the `@porsche-design-system/components-angular` package to your project, you've to import the
`PorscheDesignSystemModule` in every module you want to use the component library.

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

Change your App file to use at least one Porsche Design System component, for example:

```ts
// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <p-button>Some label</p-button>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
```

## Methodology

Our goal is to provide easy-to-use and well-documented components so that developers don’t need to worry about the
implementation but can focus on easily creating qualitative and consistent digital Porsche experiences. We ensure that
our components are made for everyone and meet latest quality standards of usability, accessibility, performance and
compatibility. In some points the components are built restrictive to define consistent standards for diverse Porsche
applications but ensure enough flexibility to meet different context requirements.

## License

- See **Custom License** within npm package
