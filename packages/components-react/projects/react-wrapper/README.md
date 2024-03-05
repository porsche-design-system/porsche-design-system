# Porsche Design System - Components React

Porsche Design System is a component library designed to help developers create the best experience for software or
services distributed by Dr. Ing. h.c. F. Porsche AG. Visit the [Porsche Design System](https://designsystem.porsche.com)
to learn more.

## Using the Porsche Design System

### Installation

Run the following command using [npm](https://npmjs.com):

```bash
npm install @porsche-design-system/components-react
```

If you prefer [Yarn](https://yarnpkg.com), use the following command instead:

```bash
yarn add @porsche-design-system/components-react
```

### Usage

After adding the `@porsche-design-system/components-react` package to your project, you've to extend the standard React
setup by the `PorscheDesignSystemProvider`.

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

import { PButton } from '@porsche-design-system/components-react';

export const App = (): JSX.Element => (
  <div className="App">
    <PButton>Some label</PButton>
  </div>
);
```

## Methodology

Our goal is to provide easy-to-use and well-documented components so that developers don’t need to worry about the
implementation but can focus on easily creating qualitative and consistent digital Porsche experiences. We ensure that
our components are made for everyone and meet latest quality standards of usability, accessibility, performance and
compatibility. In some points the components are built restrictive to define consistent standards for diverse Porsche
applications but ensure enough flexibility to meet different context requirements.

## License

- See **Custom License** within npm package
