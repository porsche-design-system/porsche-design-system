# Introduction

## Porsche UI Kit SCSS utils

This package contains helpful SCSS functions, mixins and variables.

### Install
It's necessary to have access to the Porsche UI private npm registry to be able to install `@porscheui/ui-kit-scss-utils` npm package.

```
// install with npm:
npm install @porscheui/ui-kit-scss-utils --save-dev

// install with yarn:
yarn add @porscheui/ui-kit-scss-utils --dev
```

### Usage

Assuming a proper SCSS compiler is setup within your project: Simply import the following file 
at the place where you want to make use of the Porsche UI Kit SCSS utils.

```
@import '~@porscheui/ui-kit-scss-utils/index';
```

If your SCSS compiler does not support '~' (tilde)) imports, you can of course also import it via
path from your node_modules.

```
@import 'node_modules/@porscheui/ui-kit-scss-utils/index';
```

A sample usage might look like as follows:

```
@import '~@porscheui/ui-kit-scss-utils/index';

#app {
  color: $p-color-porsche-black;
  
  @include breakpoint('s') {
    color: $p-color-porsche-red;
  }
}
```