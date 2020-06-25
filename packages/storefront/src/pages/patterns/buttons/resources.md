# Buttons

To help you better understand how to use our button guidelines we provide you with basic examples and coded snippets:

--- 

## Grouped button pattern examples

Basically you can use the following approach to serve the grouped button pattern described in the [design guidelines](#/patterns/buttons#guidelines).

### Responsive row/column behaviour left aligned

<Playground>
  <p-flex class="button-group-col button-group-row--s">
    <p-button variant="tertiary">Some label</p-button>
    <p-button variant="secondary">Some label</p-button>
    <p-button variant="primary">Some label</p-button>
  </p-flex>
</Playground>

### Responsive row/column behaviour right aligned

<Playground>
  <p-flex justify-content="flex-end" class="button-group-col button-group-row--s button-group--align-right">
    <p-button variant="tertiary">Some label</p-button>
    <p-button variant="secondary">Some label</p-button>
    <p-button variant="primary">Some label</p-button>
  </p-flex>
</Playground>

### Explanation of used class names

Here you can find the **SCSS** of the used class names. This is meant to be just **one** possible solution to build the grouped button pattern. 
It's totally up to you and your team how to achieve the grouped button pattern described in the [design guidelines](#/patterns/buttons#guidelines).

```scss
.button-group {
  @mixin p-row() {
    flex-direction: row;
    > * {
      width: auto;
      &:not(:last-child) {
        margin-right: $p-spacing-16;
      }
      &:not(:first-child) {
        margin-top: 0;
      }
    }
  } 
  
  @mixin p-col() {
    flex-direction: column;
    > * {
      width: 100%;
      &:not(:first-child) {
        margin-top: $p-spacing-16;
      }
      &:not(:last-child) {
        margin-right: 0;
      }
    }
  } 
  
  &-row {
    @include p-row;
  }
  
  &-col {
    @include p-col;
  }
  
  @include p-breakpoint('xs') {
    &-row--xs {
      @include p-row;
    }
    
    &-col--xs {
      @include p-col;
    }
  }
  
  @include p-breakpoint('s') {
    &-row--s {
      @include p-row;
    }
    
    &-col--s {
      @include p-col;
    }
  }
  
  @include p-breakpoint('m') {
    &-row--m {
      @include p-row;
    }
    
    &-col--m {
      @include p-col;
    }
  }
  
  @include p-breakpoint('l') {
    &-row--l {
      @include p-row;
    }
    
    &-col--l {
      @include p-col;
    }
  }
  
  @include p-breakpoint('xl') {
    &-row--xl {
      @include p-row;
    }
    
    &-col--xl {
      @include p-col;
    }
  }
  
}
``` 

<style scoped lang="scss">
@import '~@porsche-design-system/utilities/scss';

.button-group {
  @mixin p-row() {
    flex-direction: row;
    > * {
      width: auto;
      &:not(:last-child) {
        margin-right: $p-spacing-16;
      }
      &:not(:first-child) {
        margin-top: 0;
      }
    }
  } 
  
  @mixin p-col() {
    flex-direction: column;
    > * {
      width: 100%;
      &:not(:first-child) {
        margin-top: $p-spacing-16;
      }
      &:not(:last-child) {
        margin-right: 0;
      }
    }
  } 
  
  &-row {
    @include p-row;
  }
  
  &-col {
    @include p-col;
  }
  
  @include p-breakpoint('xs') {
    &-row--xs {
      @include p-row;
    }
    
    &-col--xs {
      @include p-col;
    }
  }
  
  @include p-breakpoint('s') {
    &-row--s {
      @include p-row;
    }
    
    &-col--s {
      @include p-col;
    }
  }
  
  @include p-breakpoint('m') {
    &-row--m {
      @include p-row;
    }
    
    &-col--m {
      @include p-col;
    }
  }
  
  @include p-breakpoint('l') {
    &-row--l {
      @include p-row;
    }
    
    &-col--l {
      @include p-col;
    }
  }
  
  @include p-breakpoint('xl') {
    &-row--xl {
      @include p-row;
    }
    
    &-col--xl {
      @include p-col;
    }
  }
  
}
</style>