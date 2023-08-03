# Components Ready

Since the components are loaded lazily, it might be hard to tell when they are ready if you rely on them
programmatically. To solve that we provide the `componentsReady` function which returns a promise that resolves as soon
as all currently used components are loaded and ready to use.

The resolved value is a number with the amount of ready components.

If the DOM changes later on you can call it again to know when the new components are loaded.

The `componentsReady` function is provided as part of the following components packages:

- @porsche-design-system/components-js
- @porsche-design-system/components-angular
- @porsche-design-system/components-react
- @porsche-design-system/components-vue

<TableOfContents></TableOfContents>

## Basic Example

`componentsReady` is quite flexible. You can call it wherever and as often as you like.  
By default, it uses the current document's `body` element to look for any web component of the Porsche Design System.

```tsx
import { componentsReady } from '@porsche-design-system/components-{js|angular|react|vue}';

const doSomeStuff = async () => {
  // doing some changes to the DOM and add new Porsche Design System components to it

  await componentsReady();

  // some code that relies on the newly added components
};
```

## Advanced Example

In case you want to limit the search radius of `componentsReady` you can pass any `HTMLElement` as a parameter.  
This is useful when you want to show a loading indicator for only a part of your application's interface, e.g. the
sidebar and only care about components inside.

```tsx
import { componentsReady } from '@porsche-design-system/components-{js|angular|react|vue}';

const initSomeSidebar = async () => {
  const sidebarEl = document.querySelector('.sidebar');
  let showSpinner = true;

  // wait until all Porsche Design System components used within sidebar are ready
  await componentsReady(sidebarEl);
  showSpinner = false;
};
```

## Testing

In this section you can find basic examples for the default test setups of each framework.

- Vanilla JS: `jest`, `jsdom` with `@testing-library`
- Angular: `jasmine`, `karma` with `TestBed`
- React: `jest`, `jsdom` with `@testing-library/react`

Other Angular setups can be found further down.

<p-inline-notification heading="Important note" state="warning" dismiss-button="false">
  All test environments that don't use a real browser typically run in <strong>jsdom</strong> which requires our <strong>@porsche-design-system/components-{js|angular|react|vue}/jsdom-polyfill</strong> subpackage in order to have real working Porsche Design System components.<br>
  Without it, you are just rendering "dead" component markup without any functionality.
</p-inline-notification>

<Playground :frameworkMarkup="codeSampleDefault" :showCodeEditor="false"></Playground>

### Angular Jest with TestBed

Setup: `jest`, `jsdom` with `TestBed`

<Playground :frameworkMarkup="codeSampleAngularTestBed" :showCodeEditor="false"></Playground>

### Angular Jest with Testing Library

Setup: `jest`, `jsdom` with `@testing-library/angular`

<Playground :frameworkMarkup="codeSampleAngularTestingLibrary" :showCodeEditor="false"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getComponentsReadyCodeSamples } from '@porsche-design-system/shared';

@Component
export default class Code extends Vue {
  codeSampleDefault = getComponentsReadyCodeSamples('default');
  codeSampleAngularTestBed = getComponentsReadyCodeSamples('testbed');
  codeSampleAngularTestingLibrary = getComponentsReadyCodeSamples('testing-library');
}
</script>
