# Dependencies 05.08.2022

## Vue

All Vue related dependencies can't be updated at the moment because `vue-property-decorator` and `vue-class-component`
aren't Vue **3** compatible. In addition `sass-loader` can't be updated because it needs at least Webpack 5 but Vue **
2** uses Webpack 4 under the hood. `vmark` and `vmark-loader` can't be updated since those packages are incompatible
with Vue **2** and **3**.

### Affected dependencies:

- `vue`
- `vue-router`
- `vuex`
- `@vue/cli-plugin-babel`
- `@vue/cli-plugin-router`
- `@vue/cli-plugin-typescript`
- `@vue/cli-plugin-unit-jest`
- `@vue/cli-plugin-vuex`
- `@vue/cli-service`
- `@vue/test-utils`
- `sass-loader`
- `vmark`
- `vmark-loader`

---

## Angular

Angular Compiler decides by itself which TypeScript version it supports. As soon as an unsupported TypeScript version is
installed, the Angular build will fail.

As mentioned here https://angular.io/guide/creating-libraries#ensuring-library-version-compatibility, if building
component-libraries, the Angular version used to build an application should always be the same or greater than the
Angular versions used to build any of its dependent libraries.

This means if we upgrade to `Angular v14`, all of our consumers are forced to use `Angular v14` too, because there were
breaking changes in `@angular/core` that are not backwards compatible. We have decided to stay on `Angular v13` because
it is forward compatible and wait for feedback of our consuming teams on when they are ready to upgrade to `Angular v14`
before we upgrade to it.

### Affected dependencies:

- `@angular/animations`
- `@angular/common`
- `@angular/compiler`
- `@angular/core`
- `@angular/forms`
- `@angular/platform-browser`
- `@angular/platform-browser-dynamic`
- `@angular/router`
- `@angular-builders/custom-webpack`
- `@angular-devkit/build-angular`
- `@angular/cli`
- `@angular/compiler-cli`
- `@angular/language-service`
- `ng-packagr`

- `typescript`

---

## Globby

`globby` decided to provide just a modern _ESM_ build with their latest npm package. Unfortunately there's no stable way
of using it with Node or TS-Node.

- [Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm)
- [ESM support: soliciting feedback](https://github.com/TypeStrong/ts-node/issues/1007)

### Affected dependencies:

- `globby`
