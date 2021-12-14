# React

<TableOfContents></TableOfContents>

## Quick start

To build your own application with the **React** components of Porsche Design System, follow these steps:

- Follow the instructions at (Introduction)[/start-coding/introduction] to get the required npm package
- Run `yarn create react-app my-app --template typescript` or `npx create-react-app my-app --template typescript` to
  create a directory inside the current folder with the initial project structure called `my-app`
- To add TypeScript to your **Create React App**, you have to install it:

```shell script
// install with yarn:
yarn add typescript @types/node @types/react @types/react-dom @types/jest

// install with npm:
npm install typescript @types/node @types/react @types/react-dom @types/jest
```

- Install the Porsche Design System

```shell script
// install with yarn:
yarn add @porsche-design-system/components-react

// install with npm:
npm install @porsche-design-system/components-react
```

You are ready to start building your own application.

### Integration

The following project is a standard React (Create React App) setup extended by the
necessary `PorscheDesignSystemProvider` which you can import from `@porsche-design-system/components-react` :

```tsx
// index.tsx

import ReactDOM from 'react-dom';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import './index.css';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <PorscheDesignSystemProvider>
      <App />
    </PorscheDesignSystemProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Change your App file to use at least one Porsche Design System component, for example:

```tsx
// App.tsx

import { PHeadline } from '@porsche-design-system/components-react';

export const App = (): JSX.Element => (
  <div className="App">
    <PHeadline variant="headline-1">Headline from Porsche Design System</PHeadline>
  </div>
);
```

Run `yarn start` or `npm start` and check if the components are displayed correctly.

## When are Porsche Design System components initialized?

See [componentsReady()](helpers/components-ready) for further information.

## Test the application

**Jest** uses **jsdom** and supports ShadowDOM since Version 12.2.0.  
However, it doesn't support JavaScript modules as described in this [issue](https://github.com/jsdom/jsdom/issues/2475)
.  
Also, it doesn't support `CSSStyleSheet.replace()`, `Intersection Observer`, `Element.prototype.scrollTo` and others.

As a workaround we provide a polyfill as part of the `@porsche-design-system/components-react` package.

To apply the polyfill, simply import it in your **setupTest.{js|ts}** file.

**Note:** If your test includes Porsche Design System components, make sure to wrap the component you  
want to test with a `PorscheDesignSystemProvider` in order to avoid exceptions.

### Setup file

```tsx
// setupTest.{js|ts}

import '@porsche-design-system/components-react/jsdom-polyfill';
```

### Example component

```tsx
// SingleComponent.tsx

import { useCallback, useState } from 'react';
import { PTabsBar } from '@porsche-design-system/components-react';
import type { TabChangeEvent } from '@porsche-design-system/components-react';

export const SingleComponent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const onTabChange = useCallback((e: CustomEvent<TabChangeEvent>) => {
    setActiveTab(e.detail.activeTabIndex);
  }, []);

  return (
    <>
      <PTabsBar
        activeTabIndex={activeTab}
        onTabChange={onTabChange}
        data-testid="host"
      >
        <button data-testid="button1">Some label</button>
        <button data-testid="button2">Some label</button>
        <button data-testid="button3">Some label</button>
      </PTabsBar>
      <div data-testid="debug">{`Active Tab: ${activeTab + 1}`}</div>
    </>
  );
};
```

### Test example component

```tsx
// SingleComponent.test.tsx

import { PorscheDesignSystemProvider, componentsReady } from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders Tabs Bar from Porsche Design System and uses its events', async () => {
  const { getByTestId } = render(
    <PorscheDesignSystemProvider> {/* required for the component to work */}
      <SingleComponent />
    </PorscheDesignSystemProvider>
  );

  await componentsReady(); // we need to make sure Porsche Design System components are initialized

  const debug = getByTestId('debug');
  const button1 = getByTestId('button1');
  const button2 = getByTestId('button2');
  const button3 = getByTestId('button3');

  expect(debug.innerHTML).toBe('Active Tab: 1');

  userEvent.click(button2);
  expect(debug.innerHTML).toBe('Active Tab: 2');

  userEvent.click(button3);
  expect(debug.innerHTML).toBe('Active Tab: 3');

  userEvent.click(button1);
  expect(debug.innerHTML).toBe('Active Tab: 1');
});
```

### Hints about PorscheDesignSystemProvider

It might be rather redundant to wrap every single test with `PorscheDesignSystemProvider`.  
Therefore, we offer the following advice.

#### Custom helper

To reduce repetitive code you can write a custom helper function that wraps a component in `PorscheDesignSystemProvider`
and calls the `render` function of `react-testing-library`:

```tsx
// helper.tsx

import { render, RenderResult } from '@testing-library/react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

export const renderWithProvider = (component: JSX.Element): RenderResult => {
  return render(<PorscheDesignSystemProvider>{component}</PorscheDesignSystemProvider>);
};
```

#### Disabling the validation of PorscheDesignSystemProvider

Alternatively we provide a utility function `skipCheckForPorscheDesignSystemProviderDuringTests()` that can be used
within your tests.  
It only takes effect during testing since it relies on `process.env.NODE_ENV === 'test'`.

You can apply it globally on every test by calling it once in your test setup:

```tsx
// setupTest.{js|ts}
import { skipCheckForPorscheDesignSystemProviderDuringTests } from '@porsche-design-system/components-react';

skipCheckForPorscheDesignSystemProviderDuringTests();
```

If you don't want to have multiple test setups or prefer a more local approach you can use it within your test:

```tsx
// SomeComponent.test.tsx
import { skipCheckForPorscheDesignSystemProviderDuringTests } from '@porsche-design-system/components-react';

describe('SomeComponent', () => {
  beforeEach(() => {
    // either like this
    skipCheckForPorscheDesignSystemProviderDuringTests();
  });

  it('should work', () => {
    // or like this
    skipCheckForPorscheDesignSystemProviderDuringTests();

    // ...
  });
});
```

#### Disabling CDN requests from Porsche Design System and components

We provide a utility function `skipPorscheDesignSystemCDNRequestsDuringTests()` that can be used within your tests 
when you use the `@porsche-design-system/components-react/jsdom-polyfill` in your setup.  
It will suppress all CDN request of the Porsche Design System.

You can apply it globally on every test by calling it once in your test setup:

```tsx
// setupTest.{js|ts}
import { skipPorscheDesignSystemCDNRequestsDuringTests } from '@porsche-design-system/components-react';

skipPorscheDesignSystemCDNRequestsDuringTests();
```

If you don't want to have multiple test setups or prefer a more local approach you can use it within your test:

```tsx
// SomeComponent.test.tsx
import { skipPorscheDesignSystemCDNRequestsDuringTests } from '@porsche-design-system/components-react';

describe('SomeComponent', () => {
  beforeEach(() => {
    // either like this
    skipPorscheDesignSystemCDNRequestsDuringTests();
  });

  it('should work', () => {
    // or like this
    skipPorscheDesignSystemCDNRequestsDuringTests();

    // ...
  });
});
```

### Additional information when using react-testing-library

If you try to submit a form via button click you will encounter issues with `react-testing-library` and `jsdom`. It is
simply not provided (see [Github Issue 755](https://github.com/testing-library/react-testing-library/issues/755)
and [Github Issue 1937](https://github.com/jsdom/jsdom/issues/1937)).

If you have to test a form submit use `Simulate`.

```tsx
import { Simulate } from 'react-dom/test-utils';

const button = getByText('SomePorscheDesignSystemButton');

Simulate.submit('button');
```

You are not able to use `getByRole` to query Porsche Design System components when using testing-library.
Testing-library is taking default `roles` in consideration. For example a `<button>` gets the role `button` without
explicitly setting the attribute. To achieve this it uses
the [Accessibility Tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree),
see [documentation](https://testing-library.com/docs/guide-which-query/).

We also provide test examples in
our [sample integration project](https://github.com/porscheui/sample-integration-react/tree/master/src/tests).

## Advanced usage

### Prefixing

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

## Sample integration

We provide a public Github repository with a basic sample project setup to show how it is managed in real code. You can
find the repository of the React example project
here: [Sample integration React](https://github.com/porscheui/sample-integration-react)

### Get the project up and running

- Clone the repository by executing  
  `git clone https://github.com/porscheui/sample-integration-react.git`
- Follow the installation guidelines in the README.md file
