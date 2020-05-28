# Components Ready

Since the components are lazily loaded, it might be hard to tell, when they
are ready, if you rely programmatically on them. To solve that we provide
the `componentsReady` function which returns a promise that resolves as
soon as all currently used components are loaded and ready to use.

If the DOM changes later on you can call it again to know when the
new components are loaded.

Example:
```javascript
import { componentsReady } from '@porsche-design-system/components-js';

async function doSomeStuff() {
  // doing some changes to the DOM and add new porsche design system
  // components to it

  await componentsReady();
  
  // some code that relies on the newly added components
}
```