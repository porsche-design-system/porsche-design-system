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

## Integration

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

## Sample integration

We provide a public Github repository with a basic sample project setup to show how it is managed in real code.  
You can find the repository of the React example project here: [Sample integration React](https://github.com/porscheui/sample-integration-react)

### Get the project up and running

- Clone the repository by executing  
  `git clone https://github.com/porscheui/sample-integration-react.git`
- Follow the installation guidelines in the README.md file
