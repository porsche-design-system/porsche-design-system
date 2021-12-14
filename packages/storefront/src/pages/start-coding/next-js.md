# Next Js

<TableOfContents></TableOfContents>

## Quick start
To build your own **NextJS** application with the **React** components of the Porsche Design System, follow these steps:

* Create a new application by executing:
```shell script
// install with yarn:
yarn create next-app

// install with npm:
npm init next-app
```

* Follow the instructions to set everything up
* Switch to the created folder with `cd your-app-name`
* To add TypeScript to your **NextJS Project**, you have to create a `tsconfig.json` file in the root of your project
* Add typescript with `yarn add --dev typescript @types/react @types/node` or  
`npm install --save-dev typescript @types/react @types/node` 
* Run `yarn dev` or `npm run dev` which configures your `tsconfig.json` with default values
* You can convert your files from `.js` to `.tsx` 
* Follow the instructions at [Introduction](start-coding/introduction) to get the required npm package
* Install the Porsche Design System  
```shell script
// install with yarn:
yarn add @porsche-design-system/components-react

// install with npm:
npm install @porsche-design-system/components-react
```

You are ready to start building your own application.

The following project is the standard NextJS setup.
Change your index page to use at least one Porsche Design System Component, for example:

### Index page

```tsx
// index.tsx
import Head from 'next/head'
import { PHeadline } from "@porsche-design-system/components-react";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PHeadline className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a> with Porsche Design System
        </PHeadline>
      </main>
    </div>
  )
}
```

* Run `yarn build` or `npm build` to create pre-rendered pages
* Execute `yarn start` or `npm start` and check if the components are displayed correctly.

## Test the application

To set up Jest testing in in NextJS you have to manually set up jest in your project. You find detailed 
information here: [Get Started with Jest](https://jestjs.io/docs/en/getting-started)

**Jest** uses **jsdom**.It is yet not possible to render the functionality of web components in **jsdom**.

To ensure your tests don't fail, we provide mocks for every Porsche Design System component. 
They are distributed in the `@porsche-design-system/components-react` npm package.

The mocks must only be used if the functionality of the web component is required within the test.
As we test and ensure the functionality of our web components extensively, we recommend using the mocks only as a last option.

To consume the mocks you can set them up via your **setupTest.js** file in your root folder and copy the following snippet into the setup file.

```js
// setupTest.js
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

## Sample integration
We provide a public Github repository with a basic sample project setup to show how it is managed in real code.
You can find the repository of the NextJS example project here: [Sample integration NextJS](https://github.com/porscheui/sample-integration-nextjs)

### Get the project up and running
* Clone the repository by executing  
`git clone https://github.com/porscheui/sample-integration-nextjs.git`
* Follow the installation guidelines in the README.md file