# Dependencies 02.05.22

## Vue
All Vue related dependencies can't be updated at the moment because `vue-property-decorator` and `vue-class-component` aren't Vue **3** compatible.
In addition `sass-loader` can't be updated because it needs at least Webpack 5 but Vue **2** uses Webpack 4 under the hood. 

### Affected dependencies:
* `vue`
* `vue-router`
* `vuex`
* `@vue/cli-plugin-router`
* `@vue/cli-plugin-typescript`
* `@vue/cli-plugin-unit-jest`
* `@vue/cli-plugin-vuex`
* `@vue/cli-service`
* `@vue/test-utils`
* `sass-loader`

---

## Angular
Angular Compiler decides by itself which TypeScript version it supports.
As soon as an unsupported TypeScript version is installed then the Angular build will fail.

### Affected dependencies:
* `typescript`

---

## Globby
`globby` decided to provide just a modern *ESM* build with their latest npm package. 
Unfortunately there's no stable way of using it with Node or TS-Node.

* [Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm)
* [ESM support: soliciting feedback](https://github.com/TypeStrong/ts-node/issues/1007)

### Affected dependencies:
* `globby`

---

## node-fetch
`node-fetch` also uses *ESM* builds since version 3.
* [Upgrade Guide](https://github.com/node-fetch/node-fetch/blob/main/docs/v3-UPGRADE-GUIDE.md)

### Affected dependencies:
* `node-fetch`

---

## Jest

Since v28 just came out, typings like `@types/jest-environment-puppeteer` but also `ts-jest` aren't quite there, yet.
