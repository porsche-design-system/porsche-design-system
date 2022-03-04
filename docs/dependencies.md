# Dependencies 04.03.22

## Vue
All Vue related dependencies can't be updated at the moment because `vue-property-decorator` and `vue-class-component` aren't Vue **3** compatible.
In addition `sass-loader` can't be updated because it needs at least Webpack 5 but Vue **2** uses Webpack 4 under the hood. 

### Affected dependencies:
* `vue`
* `vue-router`
* `vuex`
* `@vue/cli-plugin-babel`
* `@vue/cli-plugin-router`
* `@vue/cli-plugin-typescript`
* `@vue/cli-plugin-unit-jest`
* `@vue/cli-plugin-vuex`
* `@vue/cli-service`
* `@vue/eslint-config-typescript`
* `@vue/test-utils`
* `sass-loader`

## Globby
`globby` decided to provide just a modern *ESM* build with their latest npm package. 
Unfortunately there's no stable way of using it with Node or TS-Node.

### Affected dependencies:
* `globby`