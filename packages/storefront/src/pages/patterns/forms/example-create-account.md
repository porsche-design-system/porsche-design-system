<Playground>
  <div class="safe-zone">
    <p-grid class="spacing-mt-80">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Create a new Porsche account</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8">
          Please enter your registration details in the following fields.<br>
          This text can be enhanced by some information on the benefits of a Porsche account registration.
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-row-spacing-l">
      <p-grid-item size="{ base: 12, m: 6 }">
        <form novalidate>
          <p-flex wrap="{ base: 'wrap', m: 'nowrap' }">
            <p-flex-item class="form-grid-item form-grid-item--m-l">
              <p-select-wrapper label="Salutation">
                <select name="salutation">
                  <option>Choose an option</option>
                  <option value="option 1">Option 1</option>
                  <option value="option 2">Option 2</option>
                  <option value="option 3">Option 3</option>
                </select>
              </p-select-wrapper>
            </p-flex-item>
            <p-flex-item class="form-grid-item form-grid-item--m-r">
              <p-select-wrapper label="Title">
                <select name="title">
                  <option>Choose an option</option>
                  <option value="option 1">Option 1</option>
                  <option value="option 2">Option 2</option>
                  <option value="option 3">Option 3</option>
                </select>
              </p-select-wrapper>
            </p-flex-item>
          </p-flex>
          <p-flex wrap="{ base: 'wrap', m: 'nowrap' }" class="form-row-spacing-m">
            <p-flex-item class="form-grid-item form-grid-item--l-l">
              <p-text-field-wrapper label="First name">
                <input type="text" name="first-name">
              </p-text-field-wrapper>
            </p-flex-item>
            <p-flex-item class="form-grid-item form-grid-item--l-r">
              <p-text-field-wrapper label="Last name">
                <input type="text" name="last-name">
              </p-text-field-wrapper>
            </p-flex-item>
          </p-flex>
          <p-text-field-wrapper label="Email address" class="form-row-spacing-m">
            <input type="email" name="email">
          </p-text-field-wrapper>
          <p-text-field-wrapper label="Password" class="form-row-spacing-m">
            <input type="password" name="password">
          </p-text-field-wrapper>
          <p-checkbox-wrapper class="form-row-spacing-l">
            <span slot="label">I have read the <a href="#">general terms ans conditions</a> and I accept them.</span>
            <input type="checkbox" name="terms">
          </p-checkbox-wrapper>
          <p-checkbox-wrapper class="form-row-spacing-m">
            <span slot="label">I have read the <a href="#">Data Privacy Statement</a>.</span>
            <input type="checkbox" name="privacy">
          </p-checkbox-wrapper>
          <p-flex class="form-row-spacing-l">
            <p-flex-item class="spacing-mr-8">
              <p-button variant="tertiary" icon="close">Cancel</p-button>
            </p-flex-item>
            <p-flex-item>
              <p-button type="submit">Create Porsche account</p-button>
            </p-flex-item>
          </p-flex>
        </form>
      </p-grid-item>
    </p-grid>
  </div>
</Playground>
