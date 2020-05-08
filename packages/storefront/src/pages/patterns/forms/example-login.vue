<template>
  <p-content-wrapper>
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Welcome to Porsche</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8">Log in to your Porsche account to manage your vehicles and services.</p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate>
          <p-flex class="form-grid-item-container">
            <p-flex-item class="form-grid-item form-grid-item--two-thirds-m">
              <p-text-field-wrapper label="Porsche ID (email address)">
                <input type="email" name="email">
              </p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-flex class="form-grid-item-container">
            <p-flex-item class="form-row-spacing form-grid-item form-grid-item--two-thirds-m">
              <p-text-field-wrapper label="Password">
                <input type="password" name="password">
              </p-text-field-wrapper>
              <div class="spacing-mt-8">
                <p-link-pure href="#">Forgot password?</p-link-pure>
              </div>
            </p-flex-item>
          </p-flex>
          <p-flex class="form-section-spacing">
            <p-flex-item>
              <p-button type="submit">Log in</p-button>
              <p-checkbox-wrapper label="Keep me logged in" class="form-row-spacing">
                <input type="checkbox" name="login">
              </p-checkbox-wrapper>
            </p-flex-item>
          </p-flex>
        </form>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing form-bottom-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-4" tag="h2">New to Porsche?</p-headline>
        <p-link-pure href="#" class="spacing-mt-8">Create a new Porsche account</p-link-pure>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>
