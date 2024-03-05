# Bundling 15.03.2022

## Status Quo

TODO: update this

| Package                         | UMD | CJS | ESM |
| ------------------------------- | --- | --- | --- |
| components-js                   | ✓   |     |     |
| components-js/partials          |     | ✓   | ✓   |
| components-js/utilities/js      |     | ✓   | ✓   |
| components-react                |     | ✓   | ✓   |
| components-react/partials       |     | ✓   | ✓   |
| components-react/utilities/js   |     | ✓   | ✓   |
| components-react/testing        |     | ✓   |     |
| components-angular              |     |     | ✓   |
| components-angular/partials     |     | ✓   | ✓   |
| components-angular/utilities/js |     | ✓   | ✓   |
| assets                          | ✗   | (✓) | ✓   |

✗ = currently released  
(✓) = not released

## Compatibility overview

|                                | UMD | CJS | ESM | ESM with `"type": "module"` | comment                                                                                                                                    |
| ------------------------------ | --- | --- | --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| treeshakable                   | ✗   | ✗   | ✓   |                             | https://webpack.js.org/guides/tree-shaking/#conclusion                                                                                     |
| compatibility node -e          | ✓   | ✓   | ✗   |                             |
| compatibility ts-node          | ✓   | ✓   | ✗   | ✗                           | ESM with type module works only with `NODE_OPTIONS='--loader ts-node/esm --experimental-specifier-resolution=node' ts-node ./myscript.ts`. |
| compatibility create-react-app | ✓   | ✓   | ✓   |                             |
| compatibility nextJS           | ✓   | ✓   | ✓   |                             |
| compatibility Angular CLI      | ✓   | ✓   | ✓   |                             | When bundling partial entry point as ESM we get the error `Unexpected token 'export'`                                                      |
| compatibility Stencil          | ✓   | ✓   |     | ✓                           |
| compatibility Vue CLI          | ✓   | ✓   |     | ✓                           |
| compatibility Jest             | ✓   | ✓   |     | ✗                           |

## ESM type module (too early)

ESM with type module works in ts-node with following configuration:
https://github.com/TypeStrong/ts-node#commonjs-vs-native-ecmascript-modules  
This also causes follow-up work in our scripts e.g. `__dirname is not defined in ES module scope.`  
Could be fixed via https://kindacode.com/article/node-js-using-**dirname-and-\_\_filename-with-es-modules/  
Also using `"type": "module"` causes discrepancy in our typechecking and runtime errors:

- e.g. `AbstractWrapperGenerator.ts` throws typing errors with unused parameters.
- `fontFaceStyles.ts` uses `preset()` which throws `TypeError: preset is not a function` at runtime

Jest does not work with ESM only build. We get the same error `SyntaxError: Unexpected token 'export'` as in ts-node
without flags.  
Maybe we can make it work by passing flags / changing configuration, but this would mean our consumers would also have
to do so.

## ESM

If we provide only ESM, it can't be used due to Syntax Errors like `Unexpected token 'export'` in jest, ts-node and node
and vanillaJs.  
On the other hand we need to provide an ESM bundle, because it is treeshakeable.

## CJS

Not treeshakable but works with node / ts-node and jest, therefore it can be used for anything build time related.

## UMD

Universal build which works everywhere but is not treeshakable, so it is usually only used as fallback.

## Conclusion

We provide a CJS build for build time tasks and an ESM build on top to ensure treeshakeability and should be used for
every browser-related build.  
https://nodejs.org/dist./v14.10.0/docs/api/esm.html#esm_dual_commonjs_es_module_packages

## Open questions

- No visible effect by setting `sideEffects: false`?
- Rollup removes pure annotations in some cases, which is not clear why?
- All packages that are not bundled with rollup still use UMD and do not provide ESM?

## Tree Shaking

### TODOs

Treeshaking in Stencil (Rollup under the hood) works the following way:

- If module M1 has a const C1 where some const C2 of module M2 is being used, and const C1 is used somewhere in
  components, then M1 and M2 will be located in one bundle
- Otherwise M1 and M2 will be located in different bundles

It means for us that, if we want to define explicitly that M1 and M2 should land in one bundle, we need to have a
central module which provides all the constants from M1 and M2:

```
import { const1 } from './module1';
import { const2 } from './module2';
import { func1 } from './module1';

export const const11 = const1;
export const const22 = const2;
export const func11 = (par1) => { return func1(par1); }
```

Then we should use `const11`, `const22` and `func11` in components. As a result, `const1`, `const2` and `func1` will
land in one bundle.

Right now we use `const1` and `const2` directly from components, and in some cases we expect them to land in one bundle,
but it doesn't work like that.

#### Workaround example 1

An example of a workaround we have, in `common-styles.ts`:

```
import { getThemedColors, ThemedColors } from './';
....
export const doGetThemedColors = (theme: Theme = 'light'): ThemedColors => {
  return getThemedColors(theme);
};
```

Here's the explanation why we need this workaround.

We want all the constants from `colors.ts` and all the constants from `common-styles.ts` to land in one bundle, but we
use the constants from components directly:

```
import { getThemedColors } from '../../styles'; // import const from colors.ts
```

```
import { getFocusJssStyle } from '../../styles'; // import const from common-styles.ts
```

This way stencil doesn't know that `colors.ts` and `common-styles.ts` should land in one bundle. In order to force it,
we need `doGetThemedColors` workaround, so that we have at least one place where `common-styles.ts` module uses constant
from `colors.ts`.

The constant `doGetThemedColors` should be used at least once in some component (doesn't matter which one), so that the
workaround works.

You can easily check it by removing `doGetThemedColors` usage and running `yarn build` in components.

In `components/dist/esm` you'll see constructions like this:

```
import { g as getThemedColors } from './colors-f67ebc7c.js';
```

But we expect to have there constructions like this (`getThemedColors` is imported from `validateProps-1841c109.js`):

```
import { q as forceUpdate, g as getCss, a as addImportantToEachRule, I as getMediaQueryMin, A as AllowedTypes, r as registerInstance, v as validateProps, d as attachComponentCss, i as getPrefixedTagNames, h, H as Host, e as getElement, o as getThemedColors, s as createEvent } from './validateProps-1841c109.js';
```

#### Workaround example 2

Another workaround we have is in `jss.ts`:

```
export const doNothing = (): void => {
  addImportantToEachRule({});
};
```

### Findings

We experience that by using only `brand` in react, other objects and functions are in the final bundle.

```tsx
import { themeLight } from '@porsche-design-system/components-js/styles';

export const App = (): JSX.Element => {
  const { brand } = themeLight;
  return <>{brand}</>;
};
```

To improve tree shaking, following options can be approached:

#### Functions

##### Option 1

`mediaQueryMin` is resolved in `widthMap`.

```ts
const mediaQueryMin = (minBreakpoint) => {
  return `@media (min-width: ${breakpoint[minBreakpoint]}px)`;
};

const widthMap = {
  basic: {
    '@media (min-width: 1760px)': {
      padding: '0 10vw',
    },
  },
  extended: {
    maxWidth: '120rem',
  },
};
```

##### Option 2

Use `/*#__PURE__*/` annotation. It has to be used before the function call and before the value where the function call
happens.

```ts
const mediaQueryMin = (minBreakpoint) => {
  return `@media (min-width: ${breakpoint[minBreakpoint]}px)`;
};

const widthMap = {
  basic: /*#__PURE__*/ {
    [/*#__PURE__*/ mediaQueryMin('xxl')]: {
      padding: '0 12rem',
    },
  },
  extended: {
    maxWidth: '120rem',
  },
};
```

#### Unused objects

When an object uses another with spread operator, it can't be tree shaked out of the box.

##### Option 1

Use `/*#__PURE__*/` annotations before the value where the spread operator happens.

```ts
const themeLightElectric = /*#__PURE__*/ {
  ...themeLight,
  brand: '#00b0f4',
  state: /*#__PURE__*/ { ...themeLight.state, hover: '#00b0f4', active: '#00b0f4' },
};
```

#### Unused objects with spread operator

So far there is no solution to mark objects that are spread into another object as side-effect free.

```ts
const themeDarkElectric = /*#__PURE__*/ {
  ...themeDark,
};
```

This results in `themeDarkElectric` is tree shaken but `themeDark` will be in the bundle even when there is no usage of
it in App.tsx. Using `Object.assign` instead of spreed makes no difference.

### Conclusion

Having a healthy dependency tree is key to tree shaking. If you don't have tree, it is hard to shake it.

Tree in this context means export and imports from other files.
