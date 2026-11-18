import type { ExampleMeta } from '../../../../lib/meta.ts';
import { PatternPage } from '../../../_layouts/PatternPage.tsx';
import { FormValidation } from '../../../_partials/FormValidation.tsx';
import { Script } from '../../../_partials/Script.tsx';

/** How the example is presented – by the storefront, in StackBlitz and in the knowledge skill. */
export const meta: ExampleMeta = {
  title: 'Booking form',
  description:
    'A three-step test drive booking flow with a horizontal stepper: date and time selection, personal details, and a confirmation summary with optional promotion code.',
};

const timeSlots = [
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
] as const;

const stepCopy = [
  {
    title: 'Choose your date and time',
    description: 'Select a day for your test drive.',
  },
  {
    title: 'Your details',
    description: 'We need a few details to confirm your test drive.',
  },
  {
    title: 'Confirm your booking',
    description: 'Please check your details before you book your test drive.',
  },
] as const;

/**
 * Booking form pattern: a controlled three-step workflow on `p-stepper-horizontal`.
 *
 * Step 1 picks a date and a single time slot via `p-segmented-control`, step 2 collects personal and contact details
 * (reusing the phone split from the personal details pattern), and step 3 summarises the booking with edit actions,
 * an optional promotion-code accordion and legal consent before confirming. A page-level `h1` sits above the flow; the
 * shared step title is an `h2` that is updated and focused when the active step changes. Each step is a `<section>`
 * labelled by its matching `p-stepper-horizontal-item` via `aria-labelledby`.
 */
const Page = () => (
  <PatternPage meta={meta}>
    <main id="main" class="grid-template gap-y-fluid-md py-fluid-lg">
      <div class="col-narrow lg:col-start-7 lg:col-end-13 grid gap-fluid-md">
        <div class="grid gap-static-xs">
          <p-heading tag="h1" size="lg">
            Booking
          </p-heading>
          <p-text size="sm" color="contrast-medium">
            * Required fields
          </p-text>
        </div>

        <p-stepper-horizontal id="booking-stepper" size="small">
          <p-stepper-horizontal-item id="booking-stepper-date-time" state="current">
            Date &amp; time
          </p-stepper-horizontal-item>
          <p-stepper-horizontal-item id="booking-stepper-personal-data">
            Personal data
            <span class="sr-only">{'\u00a0'}(complete previous step first)</span>
          </p-stepper-horizontal-item>
          <p-stepper-horizontal-item id="booking-stepper-confirmation">
            Confirmation
            <span class="sr-only">{'\u00a0'}(complete previous step first)</span>
          </p-stepper-horizontal-item>
        </p-stepper-horizontal>

        <form id="booking-form" class="grid gap-fluid-md" novalidate>
          <div class="grid gap-static-xs">
            <p-heading
              id="booking-heading"
              class="focus-visible:outline outline-focus outline-offset-2 rounded-md"
              tag="h2"
              size="md"
              tabindex={-1}
            >
              {stepCopy[0].title}
            </p-heading>
            <p-text id="booking-description" size="sm" color="contrast-medium">
              {stepCopy[0].description}
            </p-text>
          </div>

          <section id="booking-step-0" class="grid gap-fluid-md" aria-labelledby="booking-stepper-date-time">
            <div class="grid gap-static-md">
              <p-input-date
                name="date"
                label="Date"
                hide-label={true}
                value="2026-04-16"
                min="2026-04-16"
                required
                data-error="Please choose a date for your test drive."
                data-error-format="Please choose a date on or after 16.04.2026."
              />
              <p-segmented-control
                name="time"
                label="Time"
                hide-label={true}
                columns={3}
                required
                data-error="Please select a time slot."
              >
                {timeSlots.map((time) => (
                  <p-segmented-control-item key={time} value={time}>
                    {time}
                  </p-segmented-control-item>
                ))}
              </p-segmented-control>
            </div>

            <p-button class="w-full" type="submit">
              Continue
            </p-button>
          </section>

          <section id="booking-step-1" class="grid gap-fluid-md" aria-labelledby="booking-stepper-personal-data" hidden>
            <div class="grid gap-static-md">
              <p-segmented-control name="salutation" label="Salutation" columns={3}>
                <p-segmented-control-item value="mr" aria="{ 'aria-label': 'Mister' }">
                  Mr
                </p-segmented-control-item>
                <p-segmented-control-item value="mrs" aria="{ 'aria-label': 'Missus' }">
                  Mrs
                </p-segmented-control-item>
                <p-segmented-control-item value="other">Other</p-segmented-control-item>
              </p-segmented-control>
              <div class="grid xs:grid-cols-2 gap-static-md xs:gap-static-sm items-start">
                <p-input-text
                  name="first-name"
                  label="First name"
                  aria="{ 'aria-description': 'As shown on your ID card' }"
                  auto-complete="given-name"
                  required
                  data-error="Please enter your first name."
                />
                <p-input-text
                  name="last-name"
                  label="Last name"
                  aria="{ 'aria-description': 'As shown on your ID card' }"
                  auto-complete="family-name"
                  required
                  data-error="Please enter your last name."
                />
              </div>
              <p-input-date
                name="date-of-birth"
                label="Date of Birth"
                aria="{ 'aria-description': 'As shown on your ID card' }"
                auto-complete="bday"
                max="2008-12-31"
                required
                data-error="Please enter your date of birth."
                data-error-format="Please enter a valid date of birth."
              />
              <div class="grid gap-static-sm px-static-lg py-static-md rounded-xl bg-frosted">
                <p-checkbox name="driving-licence" label="I confirm that I hold a valid driving licence." />
              </div>
            </div>

            <div class="grid gap-static-md">
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
              <p-input-email
                name="email"
                label="Email"
                auto-complete="email"
                required
                data-error="Please enter your email address."
                data-error-format="Please enter a valid email address."
              />
              <p-select name="country" label="Country" value="de">
                <p-select-option value="de">Germany</p-select-option>
                <p-select-option value="at">Austria</p-select-option>
                <p-select-option value="ch">Switzerland</p-select-option>
                <p-select-option value="gb">United Kingdom</p-select-option>
                <p-select-option value="us">United States</p-select-option>
              </p-select>
            </div>

            <div class="grid gap-static-lg justify-items-center">
              <p-button class="w-full" type="submit">
                Continue
              </p-button>
              <p-button-pure id="booking-back-1" icon="none" type="button" data-novalidate>
                Back
              </p-button-pure>
            </div>
          </section>

          <section id="booking-step-2" class="grid gap-fluid-md" aria-labelledby="booking-stepper-confirmation" hidden>
            <div class="grid gap-static-sm">
              <div class="flex gap-static-sm items-center px-static-lg py-static-md rounded-xl bg-frosted">
                <div class="grow grid gap-static-xs min-w-0">
                  <p-heading tag="h3" size="2xs" weight="semibold" color="contrast-medium">
                    Date
                  </p-heading>
                  <div class="grid">
                    <p-text id="booking-summary-date" size="sm">
                      16 April 2026
                    </p-text>
                    <p-text id="booking-summary-time" size="2xs">
                      15:30 – 16:00
                    </p-text>
                  </div>
                </div>
                <p-button id="booking-edit-date" type="button" variant="secondary" compact={true}>
                  Edit
                </p-button>
              </div>

              <div class="flex gap-static-sm items-center px-static-lg py-static-md rounded-xl bg-frosted">
                <div class="grow grid gap-static-sm min-w-0">
                  <p-heading tag="h3" size="2xs" weight="semibold" color="contrast-medium">
                    Personal data
                  </p-heading>
                  <div class="grid gap-static-xs text-sm leading-normal text-primary">
                    <div class="grid">
                      <span id="booking-summary-name" />
                      <span id="booking-summary-dob" />
                    </div>
                    <div class="grid">
                      <span id="booking-summary-email" />
                      <span id="booking-summary-phone" />
                    </div>
                    <span id="booking-summary-country" />
                  </div>
                </div>
                <p-button id="booking-edit-personal" type="button" variant="secondary" compact={true}>
                  Edit
                </p-button>
              </div>

              <p-accordion id="booking-promo" align-marker="end" background="frosted">
                <p-heading slot="summary" tag="h3" size="sm">
                  Add promotion code or voucher
                </p-heading>
                <p-input-text
                  name="promotion-code"
                  label="Promotion code"
                  description="Enter a code or voucher number."
                  hide-label={true}
                  auto-complete="off"
                >
                  <p-button id="booking-promo-apply" slot="end" type="button" variant="secondary" compact={true}>
                    Apply
                  </p-button>
                </p-input-text>
              </p-accordion>
            </div>

            <p-checkbox name="terms" required data-error="Please agree to the General Terms and Conditions.">
              <span slot="label">
                I agree to the
                <p-link-pure icon="none" underline={true}>
                  <a href="#">General Terms and Conditions</a>
                </p-link-pure>
                and consent to the processing of my personal data by the Porsche Group and its authorised business
                partners, as described in the
                <p-link-pure icon="none" underline={true}>
                  <a href="#">Porsche Privacy Policy</a>
                </p-link-pure>
                , to provide the services I requested.
              </span>
            </p-checkbox>

            <div class="grid gap-static-lg justify-items-center">
              <p-button class="w-full" type="submit">
                Confirm booking
              </p-button>
              <p-button-pure id="booking-back-2" icon="none" type="button" data-novalidate>
                Back
              </p-button-pure>
            </div>
          </section>
        </form>
      </div>
    </main>
    <FormValidation />
    <Script>{
      /* language=JavaScript */ `
      // Drives the three-step booking workflow: stepper state, step visibility, summary and promo accordion.
      {
        const stepCopy = ${JSON.stringify(stepCopy)};
        const stepper = document.getElementById('booking-stepper');
        const form = document.getElementById('booking-form');
        const heading = document.getElementById('booking-heading');
        const description = document.getElementById('booking-description');
        const steps = [0, 1, 2].map((index) => document.getElementById('booking-step-' + index));
        const stepItems = Array.from(stepper.querySelectorAll('p-stepper-horizontal-item'));
        const promo = document.getElementById('booking-promo');
        const countries = {
          de: 'Germany',
          at: 'Austria',
          ch: 'Switzerland',
          gb: 'United Kingdom',
          us: 'United States',
        };
        const salutations = { mr: 'Mr.', mrs: 'Mrs.', other: 'Other' };
        let currentStep = 0;

        const field = (name) => form.querySelector('[name="' + name + '"]');

        const formatDate = (value, style = 'long') => {
          if (!value) return '';
          const date = new Date(value + 'T00:00:00');
          if (Number.isNaN(date.getTime())) return value;
          if (style === 'short') {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            return day + '.' + month + '.' + date.getFullYear();
          }
          return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        };

        const formatTimeRange = (time) => {
          if (!time) return '';
          const [hours, minutes] = time.split(':').map(Number);
          const end = new Date(0, 0, 0, hours, minutes + 30);
          const endTime = String(end.getHours()).padStart(2, '0') + ':' + String(end.getMinutes()).padStart(2, '0');
          return time + ' – ' + endTime;
        };

        const syncStepper = () => {
          stepItems.forEach((item, index) => {
            if (index < currentStep) {
              item.state = 'complete';
            } else if (index === currentStep) {
              item.state = 'current';
            } else {
              item.state = undefined;
            }
            const isDisabled = !item.state || item.disabled;
            const hint = item.querySelector('.sr-only');
            if (isDisabled && !hint) {
              const span = document.createElement('span');
              span.className = 'sr-only';
              span.textContent = '\u00a0(complete previous step first)';
              item.append(span);
            } else if (!isDisabled && hint) {
              hint.remove();
            }
          });
        };

        const updateSummary = () => {
          const salutation = field('salutation')?.value;
          const firstName = field('first-name')?.value?.trim() || '';
          const lastName = field('last-name')?.value?.trim() || '';
          const name = [salutations[salutation], firstName, lastName].filter(Boolean).join(' ');
          const countryCode = field('country-code')?.value || '';
          const phone = field('phone')?.value?.trim() || '';
          const country = field('country')?.value || '';

          document.getElementById('booking-summary-date').textContent = formatDate(field('date')?.value) || '—';
          document.getElementById('booking-summary-time').textContent = formatTimeRange(field('time')?.value) || '—';
          document.getElementById('booking-summary-name').textContent = name || '—';
          document.getElementById('booking-summary-dob').textContent = formatDate(field('date-of-birth')?.value, 'short') || '—';
          document.getElementById('booking-summary-email').textContent = field('email')?.value?.trim() || '—';
          document.getElementById('booking-summary-phone').textContent = [countryCode, phone].filter(Boolean).join(' ') || '—';
          document.getElementById('booking-summary-country').textContent = countries[country] || country || '—';
        };

        const showStep = (index, { focus = true } = {}) => {
          currentStep = index;
          steps.forEach((step, stepIndex) => {
            step.hidden = stepIndex !== index;
          });
          heading.textContent = stepCopy[index].title;
          description.textContent = stepCopy[index].description;
          syncStepper();
          if (index === 2) {
            updateSummary();
          }
          if (focus) {
            heading.focus();
          }
        };

        form.addEventListener('formvalid', () => {
          if (currentStep < steps.length - 1) {
            showStep(currentStep + 1);
          }
        });

        document.getElementById('booking-back-1').addEventListener('click', () => showStep(0));
        document.getElementById('booking-back-2').addEventListener('click', () => showStep(1));
        document.getElementById('booking-edit-date').addEventListener('click', () => showStep(0));
        document.getElementById('booking-edit-personal').addEventListener('click', () => showStep(1));

        stepper.addEventListener('update', (event) => {
          const nextIndex = event.detail.activeStepIndex;
          if (nextIndex < currentStep) {
            showStep(nextIndex);
          }
        });

        promo.addEventListener('update', (event) => {
          promo.open = event.detail.open;
        });

        document.getElementById('booking-promo-apply').addEventListener('click', () => {
          const promotionCode = field('promotion-code');
          if (!promotionCode) return;
          const empty = !String(promotionCode.value ?? '').trim();
          promotionCode.state = empty ? 'error' : 'none';
          promotionCode.message = empty ? 'Please enter a promotion code or voucher number.' : '';
        });
      }
    `
    }</Script>
  </PatternPage>
);

export default Page;
