# Introduction

## Porsche UI Kit SCSS utils

This package contains helpful SCSS functions, mixins and variables.

### Install
It's necessary to have access to Porsche UI private npm registry to be able to install `@porscheui/ui-kit-scss-utils` npm package.

```
// install with npm:
npm install @porscheui/ui-kit-scss-utils --save-dev

// install with yarn:
yarn add @porscheui/ui-kit-scss-utils --dev
```

### Usage

Assuming a proper scss compiler is setup within your project, – simply import following file 
at the place where you want to make use of Porsche UI Kit SCSS utils.

```
@import '~@porscheui/ui-kit-scss-utils/index';
```

If your SCSS compiler does not support '~' tilde imports, you can of course also import it via
path from your node_modules.

```
@import 'node_modules/@porscheui/ui-kit-scss-utils/index';
```

Sample usage might look like following example.

```
@import '~@porscheui/ui-kit-scss-utils/index';

#app {
  color: $p-color-porsche-black;
  
  @include breakpoint('s') {
    color: $p-color-porsche-red;
  }
}
```