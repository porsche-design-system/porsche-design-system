# Dependencies

We are using Dependabot to manage our dependencies. Every note about not updatable dependencies in this document is also
reflected in the configuration file under `.github/dependabot.yml` and must be kept in sync!

## Overview of Framework Versions

|         | Monorepo | Sample Integrations   |
| ------- | -------- | --------------------- |
| Angular | 18.1.0   | 18.1.3                |
| React   | 18.3.1   | 18.3.1                |
| Next.js | 14.2.5   | 14.2.5 (React 18.3.1) |

## Vue (storefront)

All Vue related dependencies can't be updated at the moment because `vue-property-decorator` and `vue-class-component`
aren't Vue **3** compatible. In addition `sass-loader` can't be updated because it needs at least Webpack 5 but Vue **
2** uses Webpack 4 under the hood. `vmark` and `vmark-loader` can't be updated since those packages are incompatible
with Vue **2** and **3**.

### Affected dependencies:

- `vue`
- `vue-router`
- `vue-template-compiler`
- `vuex`
- `@vue/cli-plugin-babel`
- `@vue/cli-plugin-router`
- `@vue/cli-plugin-typescript`
- `@vue/cli-plugin-unit-jest`
- `@vue/cli-plugin-vuex`
- `@vue/cli-service`
- `@vue/test-utils`
- `@vue/tsconfig`
- `sass-loader`
- `vmark`
- `vmark-loader`
- `@stackblitz/sdk` uses optional chaining internally which can't be handled by webpack 4 without additional babel
  plugins
- `imask` uses static class properties since v7.2.0 which can't be handled by our outdated vue 2 setup without
  additional babel plugins

---

## Styled Components

With v6 they are providing their own types and thereby replace `@types/styled-components` but with tons of issues
especially around style objects that we provide. This seems to be the main issue covering all typing related problems:
https://github.com/styled-components/styled-components/issues/4062  
Those issues were not resolved in `6.1.8`, yet.

### Affected dependencies:

- `styled-components`

---

## Globby (components-angular/components-manager-cli)

`globby` decided to provide just a modern _ESM_ build with their latest npm package. Unfortunately there's no stable way
of using it with Jest / Angular Karma.

- [Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm)
- [ESM support: soliciting feedback](https://github.com/TypeStrong/ts-node/issues/1007)

### Affected dependencies:

- `globby`

---

## Change Case (components/storefront)

Since v5.0.0 `change-case` decided to provide just a modern _ESM_ build with their latest npm package. Unfortunately
there's no stable way of using it with Node or TS-Node.

### Affected dependencies:

- `change-case`

---

## iMask (components/storefront)

Since v7.2.0 `imask` uses static class properties which can't be handled by our outdated vue 2 setup without additional
babel plugins, this is imported via text-field-wrapper.examples.md.

### Affected dependencies:

- `imask`

---

## @types/scheduler

Is currently fixed to "0.16.8" because of typing error:

```
../../node_modules/@types/react/index.d.ts:9:53 - error TS2307: Cannot find module 'scheduler/tracing' or its corresponding type declarations.
9 import { Interaction as SchedulerInteraction } from "scheduler/tracing";
```

---

## vue-tsc (@porsche-design-system/vue)

Currently fixed because to 2.0.22 because resolution dependency uses an alpha version which causes problems in
generating typings.

---

## webpack

UXPin publishing deactivated since newer webpack version causes this error (5.91.0 still worked):

```
ERROR: ERROR in designsystemlibrary.js
designsystemlibrary.js from Terser plugin
"i" is redeclared [designsystemlibrary.js:5109,8]
```

---

## @arethetypeswrong/core

Currently fixed to `0.15.1` since it's causing the `packages/components-js/tests/smoke/unit/specs/package.smoke.ts` test
to hang in the pipeline.
