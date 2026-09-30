import { placeholderHref } from '../../_data.ts';

/**
 * Page footer.
 *
 * Its links are hard coded rather than driven by data: a footer demonstrates a full column layout with real looking
 * labels, and every one of them is a placeholder anyway.
 */
export const Footer = () => {
  return (
    <footer class="grid-template py-fluid-lg bg-surface">
      <form
        class="col-extended grid xs:grid-cols-2 md:grid-cols-3 gap-fluid-md"
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        aria-label="Change your delivery country"
      >
        <p-select name="region" value="de" label="Change your delivery country">
          <span slot="selected" class="h-full flex items-center gap-fluid-sm grow">
            <p-flag name="de"></p-flag>
            Germany
          </span>
          <p-optgroup label="Asia">
            <p-select-option value="cn">
              <p-flag name="cn"></p-flag>
              China
            </p-select-option>
            <p-select-option value="jp">
              <p-flag name="jp"></p-flag>
              Japan
            </p-select-option>
            <p-select-option value="kr">
              <p-flag name="kr"></p-flag>
              South Korea
            </p-select-option>
          </p-optgroup>
          <p-optgroup label="Europe">
            <p-select-option value="at">
              <p-flag name="at"></p-flag>
              Austria
            </p-select-option>
            <p-select-option value="fr">
              <p-flag name="fr"></p-flag>
              France
            </p-select-option>
            <p-select-option value="de">
              <p-flag name="de"></p-flag>
              Germany
            </p-select-option>
            <p-select-option value="gb">
              <p-flag name="gb"></p-flag>
              Great Britain
            </p-select-option>
            <p-select-option value="it">
              <p-flag name="it"></p-flag>
              Italy
            </p-select-option>
            <p-select-option value="pt">
              <p-flag name="pt"></p-flag>
              Portugal
            </p-select-option>
            <p-select-option value="es">
              <p-flag name="es"></p-flag>
              Spain
            </p-select-option>
          </p-optgroup>
          <p-optgroup label="North America">
            <p-select-option value="ca">
              <p-flag name="ca"></p-flag>
              Canada
            </p-select-option>
            <p-select-option value="us">
              <p-flag name="us"></p-flag>
              USA
            </p-select-option>
          </p-optgroup>
        </p-select>
      </form>
      <nav
        class="col-extended grid xs:grid-cols-2 md:grid-cols-3 gap-x-fluid-md gap-y-fluid-lg mt-fluid-sm mb-fluid-lg"
        aria-label="Footer"
      >
        <div class="flex flex-col gap-fluid-sm">
          <p-heading id="heading-footer-1" tag="h3" size="2xs" color="contrast-medium">
            Legal Services
          </p-heading>
          <ul class="grid gap-fluid-sm">
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Terms and Conditions</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Privacy Notice</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>California Privacy</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Imprint and Legal Notice</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Accessibility Statement</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Open Source Software Notice</a>
              </p-link-pure>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-fluid-sm">
          <p-heading tag="h3" size="2xs" color="contrast-medium">
            Porsche Design
          </p-heading>
          <ul class="grid gap-fluid-sm">
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Press</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Jobs and Careers</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Studio F. A. Porsche</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Data Privacy</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Timepieces Warranty & Service</a>
              </p-link-pure>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-fluid-sm">
          <p-heading tag="h3" size="2xs" color="contrast-medium">
            Online Services
          </p-heading>
          <ul class="grid gap-fluid-sm">
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>My Orders</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Porsche Homepage</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Porsche Car Configurator</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Porsche New and Pre-Owned Vehicles</a>
              </p-link-pure>
            </li>
            <li>
              <p-link-pure icon="none">
                <a href={placeholderHref}>Compare Porsche models</a>
              </p-link-pure>
            </li>
          </ul>
        </div>
      </nav>
      <article
        class="col-extended grid sm:grid-cols-[auto_minmax(0,1fr)] items-center gap-x-fluid-lg gap-y-static-lg"
        aria-label="Social media and payment service providers"
      >
        <div class="flex gap-fluid-md">
          <p-link-pure class="p-static-sm -m-static-sm" icon="logo-instagram" hide-label="true" size="md">
            <a href={placeholderHref}>Instagram</a>
          </p-link-pure>
          <p-link-pure class="p-static-sm -m-static-sm" icon="logo-facebook" hide-label="true" size="md">
            <a href={placeholderHref}>Facebook</a>
          </p-link-pure>
          <p-link-pure class="p-static-sm -m-static-sm" icon="logo-x" hide-label="true" size="md">
            <a href={placeholderHref}>X</a>
          </p-link-pure>
          <p-link-pure class="p-static-sm -m-static-sm" icon="logo-pinterest" hide-label="true" size="md">
            <a href={placeholderHref}>Pinterest</a>
          </p-link-pure>
          <p-link-pure class="p-static-sm -m-static-sm" icon="logo-youtube" hide-label="true" size="md">
            <a href={placeholderHref}>YouTube</a>
          </p-link-pure>
        </div>
        <div class="flex gap-fluid-xs">
          <a class="focus-visible:outline outline-focus outline-offset-2 rounded-sm" href={placeholderHref}>
            <img
              src="https://images.ctfassets.net/1oyzmkwpf3d5/hskK1tzN0CS8cdGIttugu/883187acee1c66e7d4593141f3e659c3/Visa.svg"
              alt="visa logo"
            />
          </a>
          <a class="focus-visible:outline outline-focus outline-offset-2 rounded-sm" href={placeholderHref}>
            <img
              src="https://images.ctfassets.net/1oyzmkwpf3d5/34g5LXmVhTzseATJL7CLFj/501eba81ff4787357277faff4ea04f4d/Master__1_.svg"
              alt="master card logo"
            />
          </a>
          <a class="focus-visible:outline outline-focus outline-offset-2 rounded-sm" href={placeholderHref}>
            <img
              src="https://images.ctfassets.net/1oyzmkwpf3d5/4NeGQiGeYT5VZ3G591li1k/c12d0cc589f608a6db3d3e7d2aae0255/PayPal.svg"
              alt="paypal logo"
            />
          </a>
        </div>
      </article>
      <article class="col-extended grid gap-fluid-md mt-fluid-md" aria-label="Consumption and emission information">
        <p-text size="2xs" color="contrast-medium">
          The consumption and emission values stated were determined in accordance with the legally prescribed
          measurement procedures. Since September 1, 2017, certain new vehicles have been type-approved in accordance
          with the Worldwide Harmonized Vehicles Test Procedure (WLTP), a more realistic test procedure for measuring
          fuel/electricity consumption and CO₂ emissions. Since September 1, 2018, the WLTP has replaced the New
          European Driving Cycle (NEDC). Due to the more realistic testing conditions, the fuel/electricity consumption
          and CO₂ emission values measured according to the WLTP are, in many cases, higher than those measured
          according to the NEDC. As a result, vehicle taxation may change accordingly starting September 1, 2018.
          Further information on the differences between WLTP and NEDC can be found at www.porsche.com/wltp.
        </p-text>
        <p-text size="2xs" color="contrast-medium">
          Currently, regardless of the applied type-approval procedure, it remains mandatory to communicate NEDC values.
          The additional disclosure of WLTP values may be done on a voluntary basis until their mandatory use. In the
          case of new vehicles type-approved according to WLTP, NEDC values are derived from WLTP values and stated
          during the transitional period. Where NEDC values are stated as ranges, they do not refer to a specific
          individual vehicle and are not part of the offer. They serve solely for comparison purposes between different
          vehicle types. Optional equipment and accessories (attachments, tire formats, etc.) can alter relevant vehicle
          parameters such as weight, rolling resistance, and aerodynamics, and can influence fuel/electricity
          consumption, CO₂ emissions, and performance values of a vehicle in addition to weather and traffic conditions
          and individual driving behavior. Further information on the official fuel/electricity consumption and official
          specific CO₂ emissions of new passenger cars can be found in the "Guide on fuel consumption, CO₂ emissions and
          electricity consumption of new passenger cars," available free of charge at all sales outlets and from DAT.
        </p-text>
        <p-text size="2xs" color="contrast-medium">
          Neither the number of active users of this Porsche Connect Store nor the number of active users of the App
          Center available in the connected vehicle (Macan electric) upon activation of the Connect services exceeds the
          threshold of 45 million active users in the European Union as defined by the Digital Services Act (DSA).
          Important information regarding fully electric Porsche models can be found here.
        </p-text>
      </article>
      <div class="col-extended grid gap-fluid-md justify-items-center mt-fluid-md">
        <p-wordmark></p-wordmark>
        <p-text size="2xs" color="contrast-medium">
          © 2026 Porsche Sales and Marketplace, Inc.
        </p-text>
        <ul class="flex flex-wrap justify-center gap-fluid-md">
          <li>
            <p-link-pure icon="none" size="xs" underline={true}>
              <a href={placeholderHref}>Legal notice</a>
            </p-link-pure>
          </li>
          <li>
            <p-link-pure icon="none" size="xs" underline={true}>
              <a href={placeholderHref}>Privacy notice</a>
            </p-link-pure>
          </li>
          <li>
            <p-link-pure icon="none" size="xs" underline={true}>
              <a href={placeholderHref}>Accessibility Statement</a>
            </p-link-pure>
          </li>
          <li>
            <p-link-pure icon="none" size="xs" underline={true}>
              <a href={placeholderHref}>Open Source Software Notice</a>
            </p-link-pure>
          </li>
        </ul>
      </div>
    </footer>
  );
};
