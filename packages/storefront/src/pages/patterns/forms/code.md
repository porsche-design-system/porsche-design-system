# Form Patterns Code

## Login Form

<Playground>
  <p-headline variant="headline-2">Welcome to Porsche</p-headline>
  <p-text size="medium" class="spacing-mt-8">Log in to your Porsche account to manage your vehicles and services.</p-text>
  <form novalidate class="spacing-mt-56">
    <div class="example-form-grid">
      <p-text-field-wrapper label="Porsche ID (email address)">
        <input type="email" name="email">
      </p-text-field-wrapper>
      <p-text-field-wrapper label="Password" class="spacing-mt-24">
        <input type="password" name="password">
      </p-text-field-wrapper>
      <div class="spacing-mt-8">
        <p-link-pure href="#">Forgot password?</p-link-pure>
      </div>
      <p-button type="submit" class="spacing-mt-56">Log in</p-button>
      <p-checkbox-wrapper label="Keep me logged in" class="spacing-mt-24">
        <input type="checkbox" name="login">
      </p-checkbox-wrapper>
    </div>
  </form>
  <p-headline variant="headline-3" class="spacing-mt-56">New to Porsche?</p-headline>
  <p-link-pure href="#" class="spacing-mt-8">Create a new Porsche account</p-link-pure>
</Playground>