# Remix

<TableOfContents></TableOfContents>

## Quick start

To build your own **Remix** application with the **React** components of the Porsche Design System, follow these steps
after the setup of your Remix app:

- Install the Porsche Design System within your project directory:

```shell script
// install with yarn:
yarn add @porsche-design-system/components-react

// install with npm:
npm install @porsche-design-system/components-react
```

You are ready to start building your own application.

## Integration

<p-inline-notification heading="Attention" state="warning" persistent="true">
The following examples use the <strong>ssr</strong> sub-package of <strong>@porsche-design-system/components-react/ssr</strong>.<br>
This sub-package is a special build of the Porsche Design System Components that renders different markup on the server than in the browser. While this breaks the rule of SSR/SSG where browser markup should always be identical to server markup, this is the only way to achieve SSR/SSG with web components and Shadow DOM.<br>
The two environments are detected by the <strong>process.browser</strong> flag which is replaced with a boolean value at build time. In the browser the components are essentially the "regular" React components of <strong>@porsche-design-system/components-react</strong>.<br>
On the server the behavior is different. Here the relevant markup and styles (e.g. no hover or focus styles) are rendered into a <a href="https://web.dev/declarative-shadow-dom/" target="_blank">Declarative Shadow DOM</a> which is converted into a real Shadow DOM by modern browsers without any JavaScript. This is all we need for the initial render. Once the client code is loaded and executed, the Porsche Design System Components initialize just like normal.<br>
<strong>It is crucial that dead code elimination is active for the client build or otherwise the server code might sneak into the browser.</strong>
</p-inline-notification>

The following project is a standard Remix setup with the following adaptions.

Extend `root.tsx` by the necessary `PorscheDesignSystemProvider`:

```tsx
// app/root.tsx

import type { MetaFunction } from '@remix-run/node';
import { LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Porsche Design System - Remix',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Meta />
        {/* TODO: apply partials */}
        {/* getDSRPonyfill() is required for Safari */}
      </head>
      <body>
        <PorscheDesignSystemProvider>
          <Outlet />
        </PorscheDesignSystemProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

Extend `routes/index.tsx` and use a Porsche Design System component, e.g. `PHeading`:

```tsx
// routes/index.tsx

import { Link } from '@remix-run/react';
import { PHeading } from '@porsche-design-system/components-react/ssr';

export default function Index(): JSX.Element {
  return (
    <main>
      <PHeading>Welcome to Remix</PHeading>
    </main>
  );
}
```

- Run `yarn build` or `npm build`
- Execute `yarn start` or `npm start` and check if the components are displayed correctly.

## When are Porsche Design System components (re-)hydrated?

See [componentsReady()](helpers/components-ready) for further information.
