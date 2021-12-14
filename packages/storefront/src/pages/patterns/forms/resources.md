# Forms

To help you better understand how to use our form guidelines we provide you with basic form patterns as pre-designed Sketch templates as well as the corresponding coded examples:

<TableOfContents></TableOfContents>

## Sketch form templates

<p-link-pure href="https://designsystem.porsche.com/sketch/porsche-design-system-form-templates.sketch" icon="download" download>Download Sketch form templates</p-link-pure>

--- 

## Form pattern example pages

| Form type        | View code example                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Login            | <p-link-pure href="patterns/forms/example/login" icon="external" target="_blank">Example - Login</p-link-pure>                   |
| Create Account   | <p-link-pure href="patterns/forms/example/create-account" icon="external" target="_blank">Example - Create Account</p-link-pure> |
| Contact          | <p-link-pure href="patterns/forms/example/contact" icon="external" target="_blank">Example - Contact</p-link-pure>               |
| Various examples | <p-link-pure href="patterns/forms/example/various" icon="external" target="_blank">Example - Various</p-link-pure>               |


--- 

## Form grid examples

The basic form grid can be achieved nearly out of the box with Porsche Design System capabilities in addition with some extra CSS magic. 
Basically, you can use the following approach to serve the form grid described in the [design guidelines](patterns/forms/guidelines).

### Form header

The form header can be fully styled with **components** and corresponding **properties**. The only extra CSS you need is a `margin-top` for the subline. 
You have to add your own class based spacing system to your project because it is not bundled with the Porsche Design System.

<Playground>
  <p-grid class="form-top-spacing">
    <p-grid-item size="{ base: 12, m: 8 }">
      <p-headline variant="headline-2" tag="h1">Some Form Headline</p-headline>
      <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8">Some Form Subline.</p-text>
    </p-grid-item>
  </p-grid>
</Playground>

### Form body

The form body is mainly a mix out of basic `grid` and `flex` components in addition with some CSS classes to provide the horizontal and vertical form grid spacings.  
Below you can find the explanations of the used class names.

<Playground>
  <p-grid class="form-section-spacing">
    <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
      <form novalidate>
        <p-fieldset-wrapper label="Form legend text">
          <p-flex direction="{base: 'column', m: 'row'}" class="form-grid-item-container">
            <p-flex-item class="form-grid-item" width="{base: 'full', m: 'one-quarter'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item class="form-row-spacing form-row-spacing--zero-m form-grid-item" width="{base: 'full', m: 'one-quarter'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item class="form-row-spacing form-row-spacing--zero-m form-grid-item" width="{base: 'full', m: 'one-quarter'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item class="form-row-spacing form-row-spacing--zero-m form-grid-item" width="{base: 'full', m: 'one-quarter'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-flex direction="{base: 'column', m: 'row'}" class="form-row-spacing form-grid-item-container">
            <p-flex-item class="form-grid-item" width="{base: 'full', m: 'one-third'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item class="form-row-spacing form-row-spacing--zero-m form-grid-item" width="{base: 'full', m: 'one-third'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item class="form-row-spacing form-row-spacing--zero-m form-grid-item" width="{base: 'full', m: 'one-third'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-flex direction="{base: 'column', m: 'row'}" class="form-row-spacing form-grid-item-container">
            <p-flex-item class="form-grid-item" width="{base: 'full', m: 'half'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item class="form-row-spacing form-row-spacing--zero-m form-grid-item" width="{base: 'full', m: 'half'}">
              <p-text-field-wrapper label="Some label"><input type="text" name="some name"></p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-text-field-wrapper label="Some label" class="form-row-spacing"><input type="text" name="some name"></p-text-field-wrapper>
        </p-fieldset-wrapper>
        <p-button-group class="form-section-spacing form-bottom-spacing">
          <p-button type="submit">Send</p-button>
          <p-button variant="tertiary" icon="close"type="reset">Cancel</p-button>
        </p-button-group>       
      </form>
    </p-grid-item>
  </p-grid>
</Playground>

### Explanation of used class names

Here you can find the **SCSS** of the used class names. This is meant to be just **one** possible solution to build the form grid. 
It's totally up to you and your team how to achieve the form grid described in the [design guidelines](patterns/forms/guidelines).

Setting the responsive widths of the flex-items should always be in context to the specific form and application environment.

#### Top spacing

Top spacing defines the larger between the beginning of the form and the top of the page or section.

```scss
.form-top-spacing {
  margin-top: $p-spacing-48;

  @include p-media-query('m') {
    margin-top: $p-spacing-64;
  }
}
``` 

#### Bottom spacing

Bottom spacing defines the larger between the end of the form and the bottom of the page or section.

```scss
.form-bottom-spacing {
  padding-bottom: $p-spacing-64;
  
  @include p-media-query('m') {
    padding-bottom: $p-spacing-80;
  }
}
``` 

#### Section and fieldset spacing

This slightly larger spacing is used to separate form sections or fieldsets from each other.

```scss
.form-section-spacing {
  margin-top: $p-spacing-40;
  @include p-media-query('m') {
    margin-top: $p-spacing-48;
  }
}
``` 

#### Row spacing

Row spacing is used to add a small spacing between form rows. This should be responsive to support the switch between rows and columns regarding of specific breakpoints.

```scss
.form-row-spacing {
  margin-top: $p-spacing-16;
  @include p-media-query('xs') {
    &--xs {
      margin-top: $p-spacing-16;
    }
    &--zero-xs {
      margin-top: 0;
    }
  }
  
  @include p-media-query('s') {
    &--s {
      margin-top: $p-spacing-16;
    }
    &--zero-s {
      margin-top: 0;
    }
  }

  @include p-media-query('m') {
    &--m {
      margin-top: $p-spacing-16;
    }
    &--zero-m {
      margin-top: 0;
    }
  }

  @include p-media-query('l') {
    &--l {
      margin-top: $p-spacing-16;
    }
    &--zero-l {
      margin-top: 0;
    }
  }

  @include p-media-query('xl') {
    &--xl {
      margin-top: $p-spacing-16;
    }
    &--zero-xl {
      margin-top: 0;
    }
  }
}
``` 

### Grid spacings

The horizontal form grid spacings of the grid-container and the grid-item.

```scss
.form-grid-item-container {
  margin-left: - $p-spacing-8;
  margin-right: - $p-spacing-8;
}

.form-grid-item {
  padding-left: $p-spacing-8;
  padding-right: $p-spacing-8;
}
```