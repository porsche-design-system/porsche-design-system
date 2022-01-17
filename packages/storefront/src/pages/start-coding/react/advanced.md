# React

<TableOfContents></TableOfContents>

## Prefixing

In case of a micro-service architecture, multiple instances and versions of the Porsche Design System can be combined in
a final application. This could cause conflicts due to the way how custom webcomponents are registered in the browser.
During the bootstrap phase of the Porsche Design System, custom elements are defined. If a second application wants to
register Porsche Design System again it will cause issues especially when different versions are used.

A way of preventing those conflicts is by using a unique custom prefix for the components. Simply pass your desired
prefix to the `prefix` property of `PorscheDesignSystemProvider`.

```tsx
// index.tsx

import ReactDOM from 'react-dom';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <PorscheDesignSystemProvider prefix="sample-prefix">
      <App />
    </PorscheDesignSystemProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

In the following example the `PHeadline` component will render as `<sample-prefix-p-headline>`.

```tsx
// App.tsx

import { PHeadline } from '@porsche-design-system/components-react';

export const App = (): JSX.Element => (
  <PHeadline>Some headline</PHeadline>
)
```
