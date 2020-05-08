<template>
  <p-content-wrapper>
    <p-headline variant="headline-1">Various patterns and examples</p-headline>
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Validation of grouped form elements</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8">How to implement validation messages to grouped form elements like checkbox- and radio groups.</p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate>
          <p-headline variant="headline-4">Grouped list of checkboxes</p-headline>
          <p-checkbox-wrapper label="Some checkbox label 1" state="error" class="form-row-spacing">
            <input type="checkbox" name="check1">
          </p-checkbox-wrapper>
          <p-checkbox-wrapper label="Some checkbox label 2" state="error" class="form-row-spacing">
            <input type="checkbox" name="check2">
          </p-checkbox-wrapper>
          <p-checkbox-wrapper label="Some checkbox label 3" state="error" class="form-row-spacing">
            <input type="checkbox" name="check3">
          </p-checkbox-wrapper>
          <p-text color="notification-error" class="form-row-spacing">Please check at least one item from the list.</p-text>
          <p-divider class="spacing-mt-24"></p-divider>
          <p-headline variant="headline-4" class="spacing-mt-24">Grouped list of radio buttons</p-headline>
          <p-radio-button-wrapper label="Some radio label 1" state="error" class="form-row-spacing">
            <input type="radio" name="radio1">
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some radio label 2" state="error" class="form-row-spacing">
            <input type="radio" name="radio1">
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="Some radio label 3" state="error" class="form-row-spacing">
            <input type="radio" name="radio1">
          </p-radio-button-wrapper>
          <p-text color="notification-error" class="form-row-spacing">Please select one item from the list.</p-text>
        </form>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>
