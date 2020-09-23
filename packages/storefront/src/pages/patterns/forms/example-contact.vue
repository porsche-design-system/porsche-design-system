<template>
  <p-content-wrapper>
    <p-grid class="form-top-spacing">
      <p-grid-item size="{ base: 12, m: 8 }">
        <p-headline variant="headline-2" tag="h1">Get in touch with Porsche</p-headline>
        <p-text size="{ base: 'small', l: 'medium' }" class="spacing-mt-8">Do you have any specific questions about your
          Porsche vehicle? Please use the form below so that we can process your inquiry as quickly as possible.
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-grid class="form-section-spacing">
      <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
        <form novalidate>
          <p-fieldset-wrapper label="Your message">
            <p-flex class="form-grid-item-container">
              <p-flex-item width="{base: 'full', m: 'half'}" class="form-grid-item">
                <p-select-wrapper label="Category">
                  <select name="category">
                    <option>Choose an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </p-select-wrapper>
              </p-flex-item>
            </p-flex>
            <p-text-field-wrapper label="Subject" class="form-row-spacing">
              <input type="text" name="subject">
            </p-text-field-wrapper>
            <p-textarea-wrapper label="Your message" class="form-row-spacing">
              <textarea name="message"></textarea>
            </p-textarea-wrapper>
          </p-fieldset-wrapper>
          <p-fieldset-wrapper label="Personal data" class="form-section-spacing">
            <p-flex direction="{ base: 'column', m: 'row' }" class="form-grid-item-container">
              <p-flex-item width="{base: 'full', m: 'one-third'}" class="form-grid-item">
                <p-select-wrapper label="Salutation">
                  <select name="salutation">
                    <option>Choose an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </p-select-wrapper>
              </p-flex-item>
              <p-flex-item width="{base: 'full', m: 'one-third'}"
                           class="form-row-spacing form-row-spacing--zero-m form-grid-item">
                <p-select-wrapper label="Title">
                  <select name="title">
                    <option>Choose an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </p-select-wrapper>
              </p-flex-item>
            </p-flex>
            <p-flex direction="{ base: 'column', m: 'row' }" class="form-row-spacing form-grid-item-container">
              <p-flex-item width="{base: 'full', m: 'half'}" class="form-grid-item">
                <p-text-field-wrapper label="First name">
                  <input type="text" name="firstname">
                </p-text-field-wrapper>
              </p-flex-item>
              <p-flex-item width="{base: 'full', m: 'half'}"
                           class="form-row-spacing form-row-spacing--zero-m form-grid-item">
                <p-text-field-wrapper label="Last name">
                  <input type="text" name="lastname">
                </p-text-field-wrapper>
              </p-flex-item>
            </p-flex>
            <p-text-field-wrapper label="Email address" class="form-row-spacing">
              <input type="email" name="email">
            </p-text-field-wrapper>
            <p-text-field-wrapper label="Phone number" class="form-row-spacing">
              <input type="tel" name="phone">
            </p-text-field-wrapper>
          </p-fieldset-wrapper>
          <p-fieldset-wrapper label="Your Porsche" class="form-section-spacing">
            <p-text-field-wrapper label="VIN (Vehicle Identification Number)">
              <input type="text" name="vin">
            </p-text-field-wrapper>
            <p-select-wrapper label="Gear" class="form-row-spacing">
              <select name="gear">
                <option>Choose an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </p-select-wrapper>
            <p-headline variant="headline-5" tag="h3" class="spacing-mt-24">Date of first registration</p-headline>
            <p-text-field-wrapper label="Date" class="form-row-spacing">
              <input type="date" name="date">
            </p-text-field-wrapper>
            <p-text-field-wrapper label="Mileage" class="form-row-spacing">
              <input type="text" name="mileage">
            </p-text-field-wrapper>
          </p-fieldset-wrapper>
          <p-fieldset-wrapper label="Your Porsche dealer" class="form-section-spacing">
            <p-select-wrapper label="Porsche dealer">
              <select name="dealer">
                <option>Choose an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </p-select-wrapper>
          </p-fieldset-wrapper>
          <p-flex class="form-section-spacing form-grid-item-container">
            <p-flex-item class="form-grid-item">
              <p-checkbox-wrapper>
                <span slot="label">I have read and understood the <a href="#" target="_blank">Privacy Policy</a></span>
                <input type="checkbox" name="policy">
              </p-checkbox-wrapper>
            </p-flex-item>
          </p-flex>
          <p-flex direction="{ base: 'column', s: 'row' }"
                  class="form-section-spacing form-bottom-spacing form-grid-item-container">
            <p-flex-item width="{base: 'full', s: 'auto'}" class="form-grid-item">
              <p-button variant="tertiary" icon="close" type="reset"
                        class="form-item-width--full form-item-width--auto-s">Cancel
              </p-button>
            </p-flex-item>
            <p-flex-item width="{base: 'full', s: 'auto'}"
                         class="form-row-spacing form-row-spacing--zero-s form-grid-item">
              <p-button type="submit" class="form-item-width--full form-item-width--auto-s">Send</p-button>
            </p-flex-item>
          </p-flex>
        </form>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>
