import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FormValidation } from '../../../_partials/FormValidation.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Personal details form',
  description:
    'A personal details and address form combining contact information, an international phone number split into country code and national number, and a structured postal address.',
};

/**
 * Personal details form pattern: groups personal contact information and postal address fields into clear sections,
 * using asymmetric two-column rows for paired fields (country code + phone number, street + house number, postal code + city).
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template gap-y-fluid-md py-fluid-lg">
      <div class="col-narrow lg:col-start-7 lg:col-end-13 grid gap-fluid-md">
        <div class="grid gap-static-xs">
          <p-heading tag="h1" size="lg">
            Personal details
          </p-heading>
          <p-text size="sm" color="contrast-medium">
            * Required fields
          </p-text>
        </div>
        <form id="personal-details-form" class="grid gap-[40px]" novalidate>
          <p-fieldset label="Contact information">
            <div class="grid gap-static-md">
              <p-radio-group name="salutation" label="Salutation" direction="row">
                <p-radio-group-option value="mrs">
                  <span slot="label">
                    <span aria-hidden="true">Mrs</span>
                    <span class="sr-only">Missus</span>
                  </span>
                </p-radio-group-option>
                <p-radio-group-option value="mr">
                  <span slot="label">
                    <span aria-hidden="true">Mr</span>
                    <span class="sr-only">Mister</span>
                  </span>
                </p-radio-group-option>
                <p-radio-group-option value="other" label="Other" />
              </p-radio-group>
              <div class="grid xs:grid-cols-2 gap-static-md xs:gap-static-sm items-start">
                <p-input-text
                  name="first-name"
                  label="First name"
                  auto-complete="given-name"
                  required
                  data-error="Please enter your first name."
                />
                <p-input-text
                  name="last-name"
                  label="Last name"
                  auto-complete="family-name"
                  required
                  data-error="Please enter your last name."
                />
              </div>
              <p-input-email
                name="email"
                label="Email"
                auto-complete="email"
                required
                data-error="Please enter your email address."
                data-error-format="Please enter a valid email address."
              />
              <div class="grid xs:grid-cols-[130px_minmax(0,1fr)] gap-static-md xs:gap-static-sm items-start">
                <p-select
                  name="country-code"
                  label="Phone number"
                  description="Country code"
                  value="+49"
                  required
                  data-error="Please select a country code."
                >
                  <p-select-option value="+49">+49</p-select-option>
                  <p-select-option value="+43">+43</p-select-option>
                  <p-select-option value="+41">+41</p-select-option>
                  <p-select-option value="+44">+44</p-select-option>
                  <p-select-option value="+1">+1</p-select-option>
                </p-select>
                <p-input-tel
                  class="xs:pt-[calc(var(--leading-normal)+var(--spacing-static-xs))]"
                  name="phone"
                  description="Phone number, e.g. 01512 3994 3392"
                  auto-complete="tel-national"
                  indicator={true}
                  required
                  data-error="Please enter your phone number."
                  aria="{ 'aria-label': 'Phone number' }"
                />
              </div>
            </div>
          </p-fieldset>

          <p-fieldset label="Billing address">
            <div class="grid gap-static-md">
              <p-select name="country" label="Country" value="de">
                <p-select-option value="de">Germany</p-select-option>
                <p-select-option value="at">Austria</p-select-option>
                <p-select-option value="ch">Switzerland</p-select-option>
                <p-select-option value="gb">United Kingdom</p-select-option>
                <p-select-option value="us">United States</p-select-option>
              </p-select>
              <div class="grid xs:grid-cols-[minmax(0,1fr)_130px] gap-static-md xs:gap-static-sm items-start">
                <p-input-text
                  name="street"
                  label="Street"
                  auto-complete="billing address-line1"
                  required
                  data-error="Please enter your street."
                />
                <p-input-text
                  name="house-number"
                  label="House number"
                  required
                  data-error="Please enter your house number."
                />
              </div>
              <p-input-text name="address-line-2" label="Address line 2" auto-complete="billing address-line2" />
              <div class="grid xs:grid-cols-[130px_minmax(0,1fr)] gap-static-md xs:gap-static-sm items-start">
                <p-input-text
                  name="postal-code"
                  label="Postal code"
                  auto-complete="billing postal-code"
                  required
                  data-error="Please enter your postal code."
                />
                <p-input-text
                  name="city"
                  label="City"
                  auto-complete="billing address-level2"
                  required
                  data-error="Please enter your city."
                />
              </div>
              <p-checkbox name="preferred-address" label="Set as preferred address" />
            </div>
          </p-fieldset>

          <div class="grid gap-static-lg">
            <p-button class="w-full" type="submit">
              Continue
            </p-button>
            <p-button-pure type="reset" icon="none" class="justify-self-center">
              Dismiss Changes
            </p-button-pure>
          </div>
        </form>
      </div>
    </main>
    <FormValidation />
  </PatternPage>
);

export default Page;
