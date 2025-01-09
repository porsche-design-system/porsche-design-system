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

<Notification heading="Attention" heading-tag="h2" state="warning">
Before proceeding, consider using the <code>whenDefined</code> function from the <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry">CustomElementRegistry</a> API.
If you're unsure, review our <a href="developing/components-ready#component-readiness-explained">comparison</a> and <a href="developing/components-ready#basic-example-when-defined">example usage</a> for guidance.
</Notification>

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

You can also specify the [`readyState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState) that the
document or component should reach before the promise resolves. The default `readyState` is set to `complete`, but you
can adjust it to other states like `interactive` or `loading` based on your requirements.

```tsx
import { componentsReady } from '@porsche-design-system/components-{js|angular|react|vue}';

const initSomeSidebar = async () => {
  const sidebarEl = document.querySelector('.sidebar');
  let showSpinner = true;

  // wait until all Porsche Design System components used within sidebar are ready
  await componentsReady(sidebarEl, 'interactive');
  showSpinner = false;
};
```

## Testing

In this section you can find basic examples for the default test setups of each framework.

- Vanilla JS: `jest`, `jsdom` with `@testing-library`
- Angular: `jasmine`, `karma` with `TestBed`
- React: `jest`, `jsdom` with `@testing-library/react`

Other Angular setups can be found further down.

<Notification heading="Important note" heading-tag="h3" state="warning">
  All test environments that don't use a real browser typically run in <strong>jsdom</strong> which requires our <strong>@porsche-design-system/components-{js|angular|react|vue}/jsdom-polyfill</strong> subpackage in order to have real working Porsche Design System components.<br>
  Without it, you are just rendering "dead" component markup without any functionality.
</Notification>

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

## Component Readiness Explained

- **[`componentOnReady`](https://stenciljs.com/docs/api#componentonready) (Stencil):** Resolves when a single Stencil
  component and its internal DOM are fully initialized. Ideal for ensuring readiness before operations.

- **[`componentsReady`](developing/components-ready#basic-example) (PDS):** A Porsche Design System (PDS) utility that
  wraps `componentOnReady`, resolving when all currently used PDS components are fully loaded and operational.

- **[`whenDefined`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined) (Web API):**
  Resolves when a custom element is registered in the browser, ensuring availability but not readiness.

## Basic Example (When Defined)

This example demonstrates how to use the `whenDefined` function to track and wait for the definition of all custom
elements within the document's body. The function returns the number of elements that were initially undefined but have
now been defined.

```tsx
const whenDefined = async (el: HTMLElement = document.body): Promise<number> => {
  // select all elements that are not yet defined as custom elements.
  const undefinedElements = el.querySelectorAll(':not(:defined)');

  // create a list of promises that resolve when each undefined element is defined.
  const promises = Array.from(undefinedElements).map((el) => customElements.whenDefined(el.localName));

  try {
    // wait for all elements to be defined.
    await Promise.all(promises);

    // return the number of elements that were undefined but are now defined.
    return promises.length;
  } catch (err) {
    console.error('[CustomElementRegistry: whenDefined()]', err); // eslint-disable-line no-console

    // return 0 if an error occurs.
    return 0;
  }
};

const doSomeStuff = async () => {
  // modify the DOM and add new custom elements to it.

  await whenDefined();

  // execute code that depends on the newly added custom elements being registered and available in the browser.
};
```
