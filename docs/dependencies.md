# Dependencies

## Overview of Framework Versions

|         | Monorepo | Sample Integrations    |
| ------- | -------- | ---------------------- |
| Angular | 17.3.0   | 17.1.1                 |
| React   | 18.2.0   | 18.2.0                 |
| Next.js | 14.1.3   | 13.4.19 (React 18.2.0) |

## Playwright

In case it gets updated, it also needs to be updated in the Docker container (`./docker/Dockerfile` - `TAG` might be
adjusted too, since it will affect all running workflows even outside the changed branch, so this must be aligned with
the other developers). A new docker image can then be built in the
[CI/CD workflow](https://github.com/porsche-design-system/porsche-design-system/actions/workflows/build-and-push-docker-image.yml)
"Build and Push Docker Image") by selecting the correct Git branch and manually triggering "Run workflow".

## Vue

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

## Globby

`globby` decided to provide just a modern _ESM_ build with their latest npm package. Unfortunately there's no stable way
of using it with Jest / Angular Karma.

- [Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm)
- [ESM support: soliciting feedback](https://github.com/TypeStrong/ts-node/issues/1007)

### Affected dependencies:

- `globby`

---

## Change Case

Since v5.0.0 `change-case` decided to provide just a modern _ESM_ build with their latest npm package. Unfortunately
there's no stable way of using it with Node or TS-Node.

### Affected dependencies:

- `change-case`

---

## iMask

Since v7.2.0 `imask` uses static class properties which can't be handled by our outdated vue 2 setup without additional
babel plugins, this is imported via text-field-wrapper.examples.md.

### Affected dependencies:

- `imask`

## @types/react

Is currently fixed to "18.2.65" because of typing incompatibility with JSX namespace.
