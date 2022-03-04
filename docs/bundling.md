# Bundling 23.02.22

## Status Quo

| Package                     | UMD | CJS | ESM |
| --------------------------- | --- | --- | --- |
| components-js               | ✓   |     |     |
| components-js/partials      |     | ✓   | ✓   |
| components-react            |     | ✓   | ✓   |
| components-react/partials   |     |     | ✓   |
| components-react/testing    |     | ✓   |     |
| components-angular          |     |     | ✓   |
| components-angular/partials |     | ✓   |     |
| assets                      | ✗   | (✓) | ✓   |
| utilities-deprecated        | ✗   | (✓) | ✓   |

✗ = currently released
(✓) = not released

## Compatibility overview

|                                | UMD | CJS | ESM | ESM with `"type": "module"` | comment |
| ------------------------------ | --- | --- | --- | --------------------------- | ------- |
| treeshakable                   | ✗   | ✗   | ✓   |                             | https://webpack.js.org/guides/tree-shaking/#conclusion
| compatibility node -e          | ✓   | ✓   | ✗   |                             |
| compatibility ts-node          | ✓   | ✓   | ✗   | ✗                           | ESM with type module works only with `NODE_OPTIONS='--loader ts-node/esm --experimental-specifier-resolution=node' ts-node ./myscript.ts`.
| compatibility create-react-app | ✓   | ✓   | ✓   |                             |
| compatibility nextJS           | ✓   | ✓   | ✓   |                             |
| compatibility Angular CLI      | ✓   | ✓   | ✓   |                             | When bundling partial entry point as ESM we get the error `Unexpected token 'export'`
| compatibility Stencil          | ✓   | ✓   |     | ✓                           |
| compatibility Vue CLI          | ✓   | ✓   |     | ✓                           |
| compatibility Jest             | ✓   | ✓   |     | ✗                           |

## ESM type module (too early)

ESM with type module works in ts-node with following configuration: https://github.com/TypeStrong/ts-node#commonjs-vs-native-ecmascript-modules  
This also causes follow-up work in our scripts e.g. `__dirname is not defined in ES module scope.`  
Could be fixed via https://www.kindacode.com/article/node-js-using-**dirname-and-\_\_filename-with-es-modules/  
Also using `"type": "module"` causes discrepancy in our typechecking and runtime errors:

- e.g. `AbstractWrapperGenerator.ts` throws typing errors with unused parameters.
- `fontFaceStyles.ts` uses `preset()` which throws `TypeError: preset is not a function` at runtime

Jest does not work with ESM only build. We get the same error `SyntaxError: Unexpected token 'export'` as in ts-node without flags.  
Maybe we can make it work by passing flags / changing configuration, but this would mean our consumers would also have to do so.

## ESM

If we provide only ESM, it can't be used due to Syntax Errors like `Unexpected token 'export'` in jest, ts-node and node and vanillaJs.  
On the other hand we need to provide an ESM bundle, because it is treeshakeable.

## CJS

Not treeshakable but works with node / ts-node and jest, therefore it can be used vor anything build time related.

## UMD

Universal build which works everywhere but is not treeshakable, so it is usually only used as fallback.

## Conclusion

We provide a CJS build for build time tasks and an ESM build on top to ensure treeshakeability and should be used for every browser-related build.  
https://nodejs.org/dist./v14.10.0/docs/api/esm.html#esm_dual_commonjs_es_module_packages

## Open questions

- No visible effect by setting `sideEffects: false`?
- Rollup removes pure annotations in some cases, which is not clear why?
- All packages that are not bundled with rollup still use UMD and do not provide ESM?

## Treeshaking findings

We experience that by using only `brand` in react, other objects and functions are in the final bundle.

```
App.tsx
import { themeLight } from '@porsche-design-system/components-js/utilities/jss';

export const App = (): JSX.Element => {
  const { brand } = themeLight;
  return (
    <>
      {brand}
      <div id="app"></div>
    </>
  );
};
```

To improve treeshaking, following options can be approached:

### Treeshake functions

#### Option 1
mediaQueryMin is resolved in widthMap

```
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

#### Option 2
Use __PURE__ annotation. It hast to be used before the function call and before the value where the function call happens.

```
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

### Treeshake unused Objects
When an object uses another with spread operator, it can't be treeshaked out of the box.

#### Option 1
Use __PURE__ annotations before the value where the spread operator happens.

```
const themeLightElectric = /*#__PURE__*/ {
  ...themeLight,
  brand: '#00b0f4',
  state: /*#__PURE__*/ { ...themeLight.state, hover: '#00b0f4', active: '#00b0f4' },
};
```

### Treeshake unused Objects wich are spread into another
So far there is no solution to mark objects that are spread into another object as side-effect free.

```
const themeDarkElectric = /*#__PURE__*/ {
  ...themeDark,
};
```

This results in `themeDarkElectric` is treeshaken but `themeDark` will be in the bundle even when there is no usage of it in App.tsx.


