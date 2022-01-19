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


## When are Porsche Design System components initialized?

See [componentsReady()](helpers/components-ready) for further information.


## Sample integration

We provide a public Github repository with a basic sample project setup to show how it is managed in real code.  
You can find the repository of the Gatsby example project here: [Sample integration Gatsby](https://github.com/porscheui/sample-integration-gatsby)

### Get the project up and running

* Clone the repository by executing  
`git clone https://github.com/porscheui/sample-integration-gatsby.git`
* Follow the installation guidelines in the README.md file
