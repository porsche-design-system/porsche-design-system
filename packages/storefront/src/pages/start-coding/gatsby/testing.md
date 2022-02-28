# Gatsby

<TableOfContents></TableOfContents>

## Test the application

To set up Jest testing in Gatsby you have to follow the instructions on how to set up jest for your project:

* Step 1: [Set up Jest for Unit testing general](https://www.gatsbyjs.org/docs/unit-testing/)
* Step 2: [Set up to test react components](https://www.gatsbyjs.org/docs/testing-react-components/)

**Jest** uses **jsdom**.It is yet not possible to render the functionality of web components in **jsdom**.

To ensure your tests don't fail, we provide mocks for every Porsche Design System component. 
They are distributed in the `@porsche-design-system/components-react` npm package.

The mocks must only be used if the functionality of the web component is required within the test.
As we test and ensure the functionality of our web components extensively, we recommend using the mocks only as a last option.

To consume the mocks you can set them up via your **setup-test-env.js** file in your root folder and copy the following snippet into the setup file.

```js
// setup-test-env.js
jest.mock('@porsche-design-system/components-react', () => {
  return require('@porsche-design-system/components-react/mocks');
});
```
You have to access the mocks in the Mock-Factory of the `jest.mock()` function. 

If you only need a single component mock you can also consume the mock directly in your test. All of our mocks are named like **p-name-mock** for example **p-headline-mock**.

```tsx
// SingleComponent.tsx
export function SingleComponent() {
  return (
    <PHeadline>Some headline</PHeadline>
  )
}
```

```tsx
// SingleComponent.test.tsx
jest.mock('@porsche-design-system/components-react', () => {
  return require('@porsche-design-system/components-react/mocks/p-headline-mock');
});

test('renders a headline from Porsche Design System', async () => {
  const {getByText} = render(<SingleComponent/>);
  const headLineElement = getByText('Some headline');
  expect(headLineElement).toBeInTheDocument();
});
```

Use this solution until there is an upgrade to a newer **jsdom** version which provides support for **Web Components**.
In the meantime, we keep providing mocks.
 
You find detailed information on how to use mock functions in **Jest** [here](https://jestjs.io/docs/en/mock-functions.html).
   
We also provide test examples in our [sample integration project](https://github.com/porscheui/sample-integration-gatsby/blob/master/src/components/__tests__/applicationTest.test.tsx).
