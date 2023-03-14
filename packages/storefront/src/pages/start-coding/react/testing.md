# React

<TableOfContents></TableOfContents>

## Test the application

**Jest** uses **jsdom** and supports ShadowDOM since Version 12.2.0.  
However, it doesn't support JavaScript modules as described in this
[issue](https://github.com/jsdom/jsdom/issues/2475).  
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
import type { TabsBarChangeEvent } from '@porsche-design-system/components-react';

export const SingleComponent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  const onChange = useCallback((e: CustomEvent<TabsBarChangeEvent>) => {
    setActiveTab(e.detail.activeTabIndex);
  }, []);

  return (
    <>
      <PTabsBar activeTabIndex={activeTab} onChange={onChange} data-testid="host">
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
    <PorscheDesignSystemProvider>
      {/* required for the component to work */}
      <SingleComponent />
    </PorscheDesignSystemProvider>
  );

  await componentsReady(); // we need to make sure Porsche Design System components are initialized

  const debug = getByTestId('debug');
  const button1 = getByTestId('button1');
  const button2 = getByTestId('button2');
  const button3 = getByTestId('button3');

  expect(debug.innerHTML).toBe('Active Tab: 1');

  await userEvent.click(button2);
  expect(debug.innerHTML).toBe('Active Tab: 2');

  await userEvent.click(button3);
  expect(debug.innerHTML).toBe('Active Tab: 3');

  await userEvent.click(button1);
  expect(debug.innerHTML).toBe('Active Tab: 1');
});
```

## Hints about PorscheDesignSystemProvider

It might be rather redundant to wrap every single test with `PorscheDesignSystemProvider`.  
Therefore, we offer the following advice.

### Custom helper

To reduce repetitive code you can write a custom helper function that wraps a component in `PorscheDesignSystemProvider`
and calls the `render` function of `@testing-library/react`:

```tsx
// helper.tsx

import { render, RenderResult } from '@testing-library/react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

export const renderWithProvider = (component: JSX.Element): RenderResult => {
  return render(<PorscheDesignSystemProvider>{component}</PorscheDesignSystemProvider>);
};
```

### Disabling the validation of PorscheDesignSystemProvider

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

### Disabling CDN requests from Porsche Design System and components

We provide a utility function `skipPorscheDesignSystemCDNRequestsDuringTests()` that can be used within your tests when
you use the `@porsche-design-system/components-react/jsdom-polyfill` in your setup.  
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

## Additional information when using @testing-library/react

### Form Submission

If you try to submit a form via button click you will encounter issues with `@testing-library/react` and `jsdom`. It is
simply not provided (see [Github Issue 755](https://github.com/testing-library/react-testing-library/issues/755) and
[Github Issue 1937](https://github.com/jsdom/jsdom/issues/1937)).

If you have to test a form submit use `Simulate`.

```tsx
import { Simulate } from 'react-dom/test-utils';

const button = getByText('SomePorscheDesignSystemButton');

Simulate.submit('button');
```

### Queries

You are not able to use `getByRole` to query Porsche Design System components when using `@testing-library` because it
uses default `roles`.  
For example a `<button>` gets the role `button` without explicitly setting the attribute. To achieve this it uses
[aria-query](https://github.com/A11yance/aria-query) internally which replicates the
[Accessibility Tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree), see
[documentation](https://testing-library.com/docs/guide-which-query/).

Therefore, we provide the `getByRoleShadowed` utility function that can be used as a drop-in replacement for
`getByRole`.

```tsx
import { getByRoleShadowed } from '@porsche-design-system/components-react/testing';

it('should work for PButton', async () => {
  render(<PButton>Button</PButton>);
  await componentsReady();

  expect(getByRoleShadowed('button')).toBeInTheDocument();
});
```

Other query selectors don't work if you are trying to select an element which is located inside of Shadow DOM.  
As a solution there are `getByLabelTextShadowed` and `getByTextShadowed`.

```tsx
import { getByTextShadowed } from '@porsche-design-system/components-react/testing';

it('should work for PAccordion', async () => {
  render(<PAccordion heading="Heading">Content</PAccordion>);
  await componentsReady();

  const el = getByTextShadowed('Heading');
  expect(el).toBeInTheDocument();
  expect(el.tagName).toBe('BUTTON');
});
```

We also provide test examples in our
[sample integration project](https://github.com/porsche-design-system/sample-integration-react/tree/master/src/tests).
