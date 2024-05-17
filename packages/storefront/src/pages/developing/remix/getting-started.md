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

<Notification heading="Attention" heading-tag="h3" state="warning">
The following examples use the <strong>ssr</strong> sub-package of <strong>@porsche-design-system/components-react/ssr</strong>.<br>
This sub-package is a special build of the Porsche Design System Components that renders different markup on the server than in the browser. While this breaks the rule of SSR/SSG where browser markup should always be identical to server markup, this is the only way to achieve SSR/SSG with web components and Shadow DOM.<br>
The two environments are detected by the <strong>process.browser</strong> flag which is replaced with a boolean value at build time. In the browser the components are essentially the "regular" React components of <strong>@porsche-design-system/components-react</strong>.<br>
On the server the behavior is different. Here the relevant markup and styles (e.g. no hover or focus styles) are rendered into a <a href="https://web.dev/declarative-shadow-dom" target="_blank">Declarative Shadow DOM</a> which is converted into a real Shadow DOM by modern browsers without any JavaScript. This is all we need for the initial render. Once the client code is loaded and executed, the Porsche Design System Components initialize just like normal.<br>
<strong>It is crucial that dead code elimination is active for the client build or otherwise the server code might sneak into the browser.</strong>
</Notification>

The following project is a standard Remix setup with the following adaptions.

### Step 1

Extend `package.json` to execute `patchRemixRunProcessBrowserGlobalIdentifier` binary.

```
// package.json
{
  ...
  "scripts": {
    "postinstall": "patchRemixRunProcessBrowserGlobalIdentifier",
    // or
    "prestart": "patchRemixRunProcessBrowserGlobalIdentifier",
    "prebuild": "patchRemixRunProcessBrowserGlobalIdentifier",
    ...
  },
  ...
}
```

This script adds the necessary replacement of `process.browser` to `compileBrowser.js` of `@remix-run/dev` in this
<a href="https://github.com/remix-run/remix/blob/05ffb6e2db8f2a0e09caffad6e9b3c897c34cb7d/packages/remix-dev/compiler/compileBrowser.ts#L159-L163" target="_blank">location</a>.

While this modifies 3rd party code, the only other solutions are:

- extend `@remix-run/dev` to include the patch by default
- extend `@remix-run/dev` to support more options in `remix.config.js` so that `{ 'process.browser': 'true' }` can be
  passed to the `define` object of `esbuild`s
  <a href="https://esbuild.github.io/api/#define" target="_blank">configuration</a>
- build your app twice by passing a special value to one of the two flags that are being replaced by `@remix-run/dev`
  already: `process.env.NODE_ENV` or `process.env.REMIX_DEV_SERVER_WS_PORT`
- post process the browser build to strip away the server code used to render Declarative Shadow DOM

### Step 2

Create `head-partials.server.tsx` with the following content.

```tsx
// app/head-partials.server.tsx

import { getFontLinks, getInitialStyles } from '@porsche-design-system/components-react/partials';

export const HeadPartials = (): JSX.Element => {
  return (
    <>
      {/* necessary for SSR support, injects stylesheet which defines visibility of pre-hydrated PDS components */}
      {getInitialStyles({ format: 'jsx' })}
      {/* injects stylesheet which defines Porsche Next CSS font-face definition (=> minimize FOUT) */}
      {getFontFaceStylesheet({ format: 'jsx' })}
      {/* preloads Porsche Next font (=> minimize FOUT) */}
      {getFontLinks({ format: 'jsx' })}
      {/* preloads PDS component core chunk from CDN for PDS component hydration (=> improve loading performance) */}
      {getComponentChunkLinks({ format: 'jsx' })}
      {/* preloads Porsche icons (=> minimize FOUC) */}
      {getIconLinks({ format: 'jsx' })}
      {/* injects favicon, apple touch icons, android touch icons, etc. */}
      {getMetaTagsAndIconLinks({ appTitle: 'Sample Project Remix', format: 'jsx' })}
    </>
  );
};
```

Then, create `body-partials.server.tsx` with the following content.

```tsx
// app/body-partials.server.tsx

import {
  getBrowserSupportFallbackScript,
  getCookiesFallbackScript,
  getDSRPonyfill,
} from '@porsche-design-system/components-react/partials';

export const BodyPartials = (): JSX.Element => {
  return (
    <>
      {/* necessary for SSR support, enables declarative shadow dom support for Safari and Firefox */}
      {getDSRPonyfill({ format: 'jsx' })}
      {/* shows a cookie fallback overlay and blocks the page, in case cookies are disabled */}
      {getCookiesFallbackScript({ format: 'jsx' })}
      {/* shows a browser fallback overlay and blocks the page, in case browser is not supported (e.g. IE11) */}
      {getBrowserSupportFallbackScript({ format: 'jsx' })}
    </>
  );
};
```

<Notification heading="Important" heading-tag="h4" state="warning">
Applying the <a href="partials/dsr-ponyfill">getDSRPonyfill()</a> partial is <strong>crucial</strong> for the server build to work in browsers that don't <a href="https://caniuse.com/declarative-shadow-dom" target="_blank">support Declarative Shadow DOM</a>, yet.
</Notification>

### Step 3

Extend `root.tsx` by the necessary `PorscheDesignSystemProvider` and server partials:

```tsx
// app/root.tsx

import type { MetaFunction } from '@remix-run/node';
import { LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { HeadPartials } from '~/head-partials.server';
import { BodyPartials } from '~/body-partials.server';

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
        {HeadPartials && <HeadPartials />}
      </head>
      <body>
        <PorscheDesignSystemProvider>
          <Outlet />
        </PorscheDesignSystemProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {BodyPartials && <BodyPartials />}
      </body>
    </html>
  );
}
```

### Step 4

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

- Execute `yarn start` or `npm start` and check if the components are displayed correctly.

## When are Porsche Design System components (re-)hydrated?

See [componentsReady()](developing/components-ready) for further information.

## How do Porsche Design System components work in detail?

See [Initialization](must-know/initialization/introduction) for further information.
