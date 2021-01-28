# Porsche Design System React

React wrappers for Porsche Design System web components package.

## Installation

```shell script
// install with npm:
npm install @porsche-design-system/components-react

// install with yarn:
yarn add @porsche-design-system/components-react
``` 

## Usage

The React wrappers of web components can be used like every other React component.

After adding the `@porsche-design-system/components-react` package to your project, import component(s).  
The following setup is a standard React (Create React App) setup:

### index.tsx

```tsx
import ReactDOM from 'react-dom';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import { App } from './App';

ReactDOM.render(
  <PorscheDesignSystemProvider>
    <App />
  </PorscheDesignSystemProvider>,
  document.getElementById('root')
);
``` 

### App.tsx

```tsx
import { PHeadline } from '@porsche-design-system/components-react';

export const App = (): JSX.Element => {
  return (
    <div className="App">
      <PHeadline variant="headline-1">Headline</PHeadline>
    </div>
  )
}
```

## Testing

### setupTest.{js|ts}

To make testing with jest work, we provide some polyfills.  
This is required to make custom web components with jsdom.

```tsx
import '@porsche-design-system/components-react/jsdom-polyfill';
```

### App.test.tsx

```tsx
import { PorscheDesignSystemProvider, componentsReady } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

test('some test', async () => {
  const { container } = render(
    <PorscheDesignSystemProvider> {/* required for the component to work */}
      <SomeComponentWithPorscheDesignSystemComponents />
    </PorscheDesignSystemProvider>);

  await componentsReady(); // we need to make sure Porsche Design System components are initialized

  expect(container.firstChild.shadowRoot).not.toBeNull();
});
```