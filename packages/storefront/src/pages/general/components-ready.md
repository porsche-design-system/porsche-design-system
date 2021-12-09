# Components Ready

Since the components are loaded lazily, it might be hard to tell when they are ready if you rely on them programmatically.
To solve that we provide the `componentsReady` function which returns a promise that resolves as soon as all currently used components are loaded and ready to use.

If the DOM changes later on you can call it again to know when the new components are loaded.

The `componentsReady` function is provided as part of the following components packages:
* @porsche-design-system/components-js
* @porsche-design-system/components-angular
* @porsche-design-system/components-react

<TableOfContents></TableOfContents>

## Basic Example

`componentsReady` is quite flexible. You can call it wherever and as often as you like.  
By default, it uses the current document's `body` element to look for any web component of the Porsche Design System.  

```tsx
import { componentsReady } from '@porsche-design-system/components-{js|angular|react}';

const doSomeStuff = async () => {
  // doing some changes to the DOM and add new Porsche Design System components to it

  await componentsReady();
  
  // some code that relies on the newly added components
}
```

## Advanced Example

In case you want to limit the search radius of `componentsReady` you can pass any `HTMLElement` as a parameter.  
This is useful when you want to show a loading indicator for only a part of your application's interface, e.g. the sidebar and only care about components inside.

```tsx
import { componentsReady } from '@porsche-design-system/components-{js|angular|react}';

const initSomeSidebar = async () => {
  const sidebarEl = document.querySelector('.sidebar');
  let showSpinner = true;
  
  // wait until all Porsche Design System components used within sidebar are ready
  await componentsReady(sidebarEl);
  showSpinner = false;
}
```