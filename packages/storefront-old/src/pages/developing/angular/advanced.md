# Angular

<TableOfContents></TableOfContents>

## Global Theme

**Since v3.9.0** you can set the `theme` property for all child components by passing an option to
`PorscheDesignSystemModule.load()`.

Possible values for `theme` are: `'auto' | 'dark' | 'light'`  
Local overrides on a per component basis are still possible as usual.

```ts
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PorscheDesignSystemModule, WEB_COMPONENTS_PREFIX } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PorscheDesignSystemModule.load({ theme: 'dark' })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

In case you want to dynamically change the `theme` at runtime, you can use the injectable `THEME_TOKEN` like:

```ts
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { type Theme, THEME_TOKEN } from '@porsche-design-system/components-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <select [ngModel]="theme$ | async" (ngModelChange)="theme$.next($event)">
      <option *ngFor="let item of themes" [value]="item">{{ item }}</option>
    </select>

    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public themes: Theme[] = ['light', 'dark', 'auto'];
  // like this
  public theme$ = inject(THEME_TOKEN);

  // or via constructor dependency injection
  constructor(@Inject(THEME_TOKEN) theme$: BehaviorSubject<Theme>) {
    theme$.next('light');
  }
}
```

### Using Standalone Components

When using [Standalone Components](https://angular.dev/guide/components/importing#standalone-components) the
`PorscheDesignSystemModule.load()` needs to be included in the `bootstrapApplication` config providers section using
[importProvidersFrom](https://angular.dev/api/core/importProvidersFrom).

```ts
// main.ts (standalone setup)

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(PorscheDesignSystemModule.load({ theme: 'dark' }))],
}).catch((err) => console.error(err));
```

## Prefixing

In case of a micro-service architecture, multiple instances and versions of the Porsche Design System can be combined in
a final application. This could cause conflicts due to the way how custom webcomponents are registered in the browser.
During the bootstrap phase of the Porsche Design System, custom elements are defined. If a second application wants to
register Porsche Design System again it will cause issues especially when different versions are used.

A way of preventing those conflicts is by using a unique custom prefix for the components. Simply pass your desired
prefix to the parameter of the static `PorscheDesignSystemModule.load()` function.

When using custom prefixed component tags, you've to add the
[schema `CUSTOM_ELEMENTS_SCHEMA`](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA) to the modules that use the
prefixed components.

```ts
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PorscheDesignSystemModule, WEB_COMPONENTS_PREFIX } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PorscheDesignSystemModule.load({ prefix: 'sample-prefix' })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Be aware, that you still have to set the component name without the prefix as an attribute, otherwise you might get
unexpected results. The component might display as usual, but it is no longer an Angular component which means bindings
of inputs and outputs won't work.

You can now use the prefixed component as follows:

```ts
// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="app">
      <sample-prefix-p-heading p-heading size="xx-large">Heading</sample-prefix-p-heading>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
```

You can add more prefixes by calling `PorscheDesignSystemModule.load()` multiple times or in your sub modules:

```ts
// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PorscheDesignSystemModule.load({ prefix: 'sample-prefix' }),
    PorscheDesignSystemModule.load({ prefix: 'another-prefix' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  item = '{{ item }}'; // to trick interpolation
}
</script>
