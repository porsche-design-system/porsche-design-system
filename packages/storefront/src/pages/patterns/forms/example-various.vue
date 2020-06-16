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
        <form novalidate class="form-bottom-spacing">
          <p-fieldset-wrapper label="Grouped list of checkboxes" class="form-section-spacing">
            <p-checkbox-wrapper label="Some checkbox label 1" state="error">
              <input type="checkbox" name="check1">
            </p-checkbox-wrapper>
            <p-checkbox-wrapper label="Some checkbox label 2" state="error" class="form-row-spacing">
              <input type="checkbox" name="check2">
            </p-checkbox-wrapper>
            <p-checkbox-wrapper label="Some checkbox label 3" state="error" class="form-row-spacing">
              <input type="checkbox" name="check3">
            </p-checkbox-wrapper>
            <p-text color="notification-error" class="form-row-spacing">Please check at least one item from the list.</p-text>
          </p-fieldset-wrapper>

          <p-fieldset-wrapper label="Grouped list of radio buttons" class="form-section-spacing">
            <p-radio-button-wrapper label="Some radio label 1" state="error">
              <input type="radio" name="radio1">
            </p-radio-button-wrapper>
            <p-radio-button-wrapper label="Some radio label 2" state="error" class="form-row-spacing">
              <input type="radio" name="radio1">
            </p-radio-button-wrapper>
            <p-radio-button-wrapper label="Some radio label 3" state="error" class="form-row-spacing">
              <input type="radio" name="radio1">
            </p-radio-button-wrapper>
            <p-text color="notification-error" class="form-row-spacing">Please select one item from the list.</p-text>
          </p-fieldset-wrapper>

          <p-fieldset-wrapper label="Grouped short input" class="form-section-spacing">
            <p-grid>
              <p-grid-item size="{ base: 12, s: 10, m: 8, l: 6 }">
                <p-flex class="form-grid-item-container">
                  <p-flex-item width="one-quarter" class="form-grid-item">
                    <p-text-field-wrapper state="error" label="Day">
                      <input type="number" placeholder="DD" name="day" aria-describedby="error-message-1">
                    </p-text-field-wrapper>
                  </p-flex-item>
                  <p-flex-item width="one-quarter" class="form-grid-item">
                    <p-text-field-wrapper state="error" label="Month">
                      <input type="number" placeholder="MM" name="month" aria-describedby="error-message-2">
                    </p-text-field-wrapper>
                  </p-flex-item>
                  <p-flex-item width="one-quarter" class="form-grid-item">
                    <p-text-field-wrapper label="Year">
                      <input type="number" value="1998" placeholder="YYYY" name="year">
                    </p-text-field-wrapper>
                  </p-flex-item>
                </p-flex>
                <p-text color="notification-error" id="error-message-1" class="form-row-spacing">Please provide a valid day</p-text>
                <p-text color="notification-error" id="error-message-2">Please provide a valid month</p-text>
              </p-grid-item>
            </p-grid>
          </p-fieldset-wrapper>
        </form>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>
