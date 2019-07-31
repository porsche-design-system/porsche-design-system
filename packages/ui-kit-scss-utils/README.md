# Porsche UI Kit SCSS utils

This package contains helpful SCSS functions, mixins and variables.

### Usage

Assuming a proper scss compiler is setup, – simply import following file into your project 
at the place where you want to make usage of Porsche UI Kit SCSS utils.

```
@import '~@porscheui/ui-kit-scss-utils/index';
```

If your sass compiler does not support '~' tilde imports, you can of course also import it via
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

---

Full documentation of available SCSS functions, mixins and variables can be found on https://ui.porsche.com