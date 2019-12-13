# Porsche Design System SCSS utils
This package contains helpful SCSS functions, mixins and variables.

### Install
It's necessary to have access to the Porsche Design System private NPM registry to be able to install the `@porsche-design-system/scss-utils` NPM package. If you don't have an account yet, please first read more about getting started as developer on https://designsystem.porsche.com .

```
// install with npm:
npm install @porsche-design-system/scss-utils --save-dev

// install with yarn:
yarn add @porsche-design-system/scss-utils --dev
```

### Usage
Assuming a proper SCSS compiler is setup within your project: Simply import the following file 
at the place where you want to make use of the Porsche Design System SCSS utils.

```
@import '~@porsche-design-system/scss-utils/index';
```

If your SCSS compiler does not support '~' tilde imports, you can of course also import it via
path from your node_modules.

```
@import 'node_modules/@porsche-design-system/scss-utils/index';
```

Sample usage might look like following example.

```
@import '~@porsche-design-system/scss-utils/index';

#app {
  color: $p-color-theme-light-default;
  
  @include p-breakpoint('s') {
    color: $p-color-theme-light-brand;
  }
}
```

---

Full documentation of available SCSS functions, mixins and variables can be found on https://designsystem.porsche.com