# Gatsby

<TableOfContents></TableOfContents>

## Quick start
To build your own **Gatsby** application with the **React** components of the Porsche Design System, follow these steps:

### Requirement
* To get Gatsby up and running follow [official Gatsby guidlines](https://www.gatsbyjs.com/docs/quick-start/)
* To support TypeScript follow [Gatsby Typescript guidelines](https://www.gatsbyjs.com/docs/typescript/)
* Follow the instructions at [Introduction](start-coding/introduction) to get access to the required npm package of the Porsche Design System
* Install the Porsche Design System  
```shell script
// install with yarn:
yarn add @porsche-design-system/components-react

// install with npm:
npm install @porsche-design-system/components-react
```

You are ready to start building your own application.

The following project is the standard Gatsby site setup.
Change your Index page to use at least one Porsche Design System Component, for example:

### Index page

```tsx
// index.tsx
import * as React from "react"
import { Link } from "gatsby"
import { PHeadline, PText } from "@porsche-design-system/components-react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
   
const IndexPage = () => (
 <Layout>
   <SEO title='Home' />
   <PHeadline>Hi people</PHeadline>
   <PText>Welcome to your new Gatsby site.</PText>
   <PText>Now go build something great.</PText>
   <div>
     <Image />
   </div>
   <Link to="/page-2/">Go to page 2</Link>
 </Layout>
)
   
export default IndexPage
```

Run `yarn start` or `npm start` and check if the components are displayed correctly.

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

## Sample integration
We provide a public Github repository with a basic sample project setup to show how it is managed in real code.
You can find the repository of the Gatsby example project here: [Sample integration Gatsby](https://github.com/porscheui/sample-integration-gatsby)

### Get the project up and running
* Clone the repository by executing  
`git clone https://github.com/porscheui/sample-integration-gatsby.git`
* Follow the installation guidelines in the README.md file
