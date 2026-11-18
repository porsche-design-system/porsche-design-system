import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FormValidation } from '../../../_partials/FormValidation.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Contact form',
  description:
    'A contact inquiry form combining optional call preferences, a free-text message, service checkboxes, personal details and legal consent.',
};

/**
 * Contact form pattern: groups optional inquiry preferences and required personal details into clear sections.
 *
 * `p-segmented-control` offers a compact selection of preferred callback dates, `p-fieldset` groups the optional
 * service checkboxes under a shared legend, `p-radio-group` handles the mutually exclusive salutation, and the
 * terms checkbox uses the `label` slot so the link to the General Terms and Conditions stays part of the label.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template gap-y-fluid-md py-fluid-lg">
      <div class="col-narrow lg:col-start-7 lg:col-end-13 grid gap-fluid-md">
        <div class="grid gap-static-xs">
          <p-heading tag="h1" size="lg">
            Contact
          </p-heading>
          <p-text size="sm" color="contrast-medium">
            * Required fields
          </p-text>
        </div>
        <form id="contact-form" class="grid gap-[40px]" novalidate>
          <div class="grid gap-static-md">
            <p-segmented-control
              name="preferred-day"
              label="Preferred day for your call"
              value="2026-10-21"
              columns={3}
            >
              <p-segmented-control-item value="2026-10-21">21.10.2026</p-segmented-control-item>
              <p-segmented-control-item value="2026-10-22">22.10.2026</p-segmented-control-item>
              <p-segmented-control-item value="2026-10-23">23.10.2026</p-segmented-control-item>
            </p-segmented-control>
            <p-textarea name="message" label="Your message" placeholder="Some placeholder" />
            <p-fieldset class="[--p-fieldset-label-mb:var(--spacing-static-xs)]" label-size="small">
              <p-text tag="span" slot="label">
                Additional Services
              </p-text>
              <div class="grid xs:grid-cols-3 gap-static-sm">
                <p-checkbox name="services" value="finance-s" label="Finance S" />
                <p-checkbox name="services" value="finance" label="Finance" />
                <p-checkbox name="services" value="gap" label="GAP" />
              </div>
            </p-fieldset>
          </div>

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
            <div class="grid xs:grid-cols-2 gap-static-md xs:gap-static-sm">
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
            <p-checkbox name="terms" required data-error="Please agree to the General Terms and Conditions.">
              <span slot="label">
                I have read and agree to the
                <p-link-pure icon="none" underline={true}>
                  <a href="#">General Terms and Conditions</a>
                </p-link-pure>
                .
              </span>
            </p-checkbox>
          </div>

          <div class="grid gap-static-sm">
            <p-button class="w-full" type="submit">
              Send non-binding request
            </p-button>
            <p-text size="xs" color="contrast-medium">
              Information on how we process your personal data can be found in our
              <p-link-pure icon="none" size="inherit" color="inherit" underline={true}>
                <a href="#">privacy policy</a>
              </p-link-pure>
              .
            </p-text>
          </div>
        </form>
      </div>
    </main>
    <FormValidation />
  </PatternPage>
);

export default Page;
