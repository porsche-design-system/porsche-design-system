# Gatsby - Sample integration

You can find the repository of the Gatsby example project here: [Sample integration Gatsby](https://github.com/porscheui/sample-integration-gatsby)

## Get the project up and running
* Clone the repository by executing  
`git clone https://github.com/porscheui/sample-integration-gatsby.git`

### yarn
* Install dependencies via `yarn install`
* Run tests via `yarn test`
* Run the application via `yarn start`
* Build the application via `yarn build`

### npm
* Install dependencies via `npm install`
* Run tests via `npm test`
* Run the application via `npm start`
* Build the application via `npm run build`

---

## Reproduce on your own
To build your own application with the components of the Porsche Design System, follow these steps:

* Get the Gatsby CLI 
```
// install with yarn:
yarn global install gatsby-cli

// install with npm:
npm install -g gatsby-cli
```

* Create a new site with ```gatsby new gatsby-site```
* Switch to the created folder with ```cd gatsby-site```
* To add TypeScript to your **Gatsby Project**, you have to install it
```
// install with yarn:
yarn add gatsby-plugin-typescript

// install with npm:
npm install gatsby-plugin-typescript
```
* Include the plugin in your `gatsby-config.js`
```
// gatsby-config.js
module.exports = {
  // ...,
  plugins: [`gatsby-plugin-typescript`],
}
```
* To get full Typescript support, change the .js files to .ts
* Follow the instructions at [Introduction](https://designsystem.porsche.com/v1/#/start-coding/introduction) to get the required npm package
* Install the Porsche Design System  
``` 
// install with yarn:
yarn add @porsche-design-system/components-react

// install with npm:
npm install @porsche-design-system/components-react
```

You are ready to start building your own application.

The following project is the standard Gatsby site setup.
Change your Index page to use at least one Porsche Design System Component, for example:

### Index page

```
// index.ts
 
import * as React from "react"
import { Link } from "gatsby"
import {PHeadline, PText} from "@porsche-design-system/components-react"

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

---

## Test the application

To set up Jest testing in in Gatsby you have to follow the instructions on how to set up jest for your project:

* Step 1: [Set up Jest for Unit testing general](https://www.gatsbyjs.org/docs/unit-testing/)
* Step 2: [Set up to test react components](https://www.gatsbyjs.org/docs/testing-react-components/)

It is yet not possible to render our web components in **jsdom**.

To ensure your tests don't fail, we provide mocks for every Porsche Design System component. 
They are distributed in the `@porsche-design-system/components-react` npm package.

To consume the mocks you can set them up via your **setup-test-env.js** file in your root folder and copy the following snippet into the setup file.

```
// setup-test-env.js

jest.mock('@porsche-design-system/components-react', () => {
    return require('@porsche-design-system/components-react/mocks');
});
```
You have to access the mocks in the Mock-Factory of the `jest.mock()` function. 

If you only need a single component mock you can also consume the mock directly in your test. All of our mocks are named like **p-name-mock** for example **p-headline-mock**.

```
// SingleComponent.tsx

export function SingleComponent() {
    return (
        <PHeadline>Some headline</PHeadline>
    )
}
```

```
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
In the meantime we keep providing mocks.
 
You find detailed information on how to use mock functions in **Jest** [here](https://jestjs.io/docs/en/mock-functions.html).
   
We also provide test examples in our [sample integration project](https://github.com/porscheui/sample-integration-gatsby/blob/master/src/components/__tests__/applicationTest.test.tsx).
