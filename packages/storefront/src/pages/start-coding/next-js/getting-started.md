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

## When are Porsche Design System components initialized?

See [componentsReady()](helpers/components-ready) for further information.

## Sample integration

We provide a public Github repository with a basic sample project setup to show how it is managed in real code.  
You can find the repository of the NextJS example project here: [Sample integration NextJS](https://github.com/porscheui/sample-integration-nextjs)

### Get the project up and running

* Clone the repository by executing  
`git clone https://github.com/porscheui/sample-integration-nextjs.git`
* Follow the installation guidelines in the README.md file