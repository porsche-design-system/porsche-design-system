# Dependencies

## Overview of Framework Versions

|         | Monorepo | Sample Integrations    |
| ------- | -------- | ---------------------- |
| Angular | 17.3.0   | 17.1.1                 |
| React   | 18.2.0   | 18.2.0                 |
| Next.js | 14.1.3   | 13.4.19 (React 18.2.0) |

## Playwright

Skipped `v1.43.0` & `v1.44.0` for now because ::before elements in dark mode is not visible.

In case it gets updated, the Porsche Design System / Playwright Docker image needs to be updated too (this might affect
all running workflows even outside the changed branch, so this must be aligned with the other developers).

1. Open `./docker/Dockerfile` and adjust the Playwright docker image with the updated npm `@playwright/test` version,
   e.g. from `FROM mcr.microsoft.com/playwright:v7.1.8-focal` to `FROM mcr.microsoft.com/playwright:v9.1.1-focal`.
2. Open `./docker/build-and-push-docker-image.sh` and adjust the `TAG` with the updated Playwright docker image version,
   e.g. from `TAG=v7.1.8-focal` to `TAG=v9.1.1-focal`.
3. Adjust all files within repository using the docker image by search & replace all, e.g.
   `ghcr.io/porsche-design-system/porsche-design-system/playwright:v7.1.8-focal` with
   `ghcr.io/porsche-design-system/porsche-design-system/playwright:v9.1.1-focal`
4. Commit and push the changes to a Git branch
5. Navigate to
   [CI/CD workflow "Build and Push Docker Image"](https://github.com/porsche-design-system/porsche-design-system/actions/workflows/build-and-push-docker-image.yml)
6. Select the Git branch to which the changes have been pushed by "Run workflow > Use workflow from"
7. Manually execute "Run workflow"
8. After docker image has been built by CI/CD, execute `./docker.sh bash` in the root directory of the repository
9. Execute within Docker container `node --version` and update the Volta section of `./package.json` in the root
   directory of the repository accordingly
10. Execute within Docker container `yarn --version` and update the Volta section of `./package.json` in the root
    directory of the repository accordingly
11. Commit and push the changes to a Git branch

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

## @volar/typescript

Is currently fixed to "2.1.3" because of typing error:

```
src/App.vue:2:3 - error TS6200: Definitions of the following identifiers conflict with those in another file: __VLS_IntrinsicElements, __VLS_Element, __VLS_GlobalComponents, __VLS_IsAny, __VLS_PickNotAny, __VLS_intrinsicElements, __VLS_SelfComponent, __VLS_WithComponent, __VLS_FillingEventArg_ParametersLength, __VLS_FillingEventArg, __VLS_FunctionalComponentProps, __VLS_AsFunctionOrAny, __VLS_UnionToIntersection, __VLS_OverloadUnionInner, __VLS_OverloadUnion, __VLS_ConstructorOverloads, __VLS_NormalizeEmits, __VLS_PrettifyGlobal

2   import { onMounted, ref } from 'vue';
    ~~~~~~

  dist/vue-wrapper/esm/PorscheDesignSystemProvider.vue.d.ts:1:1
    1 import type { Theme } from './lib/types';
      ~~~~~~
    Conflicts are in this file.
```

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

## @types/react

Is currently fixed to "18.2.65" because of typing incompatibility with JSX namespace.

## @types/scheduler

Is currently fixed to "0.16.8" because of typing error:

```
../../node_modules/@types/react/index.d.ts:9:53 - error TS2307: Cannot find module 'scheduler/tracing' or its corresponding type declarations.
9 import { Interaction as SchedulerInteraction } from "scheduler/tracing";
```
