<ComponentHeading name="Select Wrapper"></ComponentHeading>

The `p-select-wrapper` component is a styling wrapper for the native HTML `<select>` form element. To improve
accessibility on devices with touch support, it defaults to the native user interface behaviour.

A `label` is a caption which informs the user what information a particular form field is asking for. The
`p-select-wrapper` component can be used with or without a label but it's recommended to keep the label visible for
better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label
text for screen readers.

<TableOfContents></TableOfContents>

## Basic example

<Playground :markup="hideLabelMarkup" :config="config">
  <SelectOptions v-model="hideLabel" :values="hideLabels" name="hideLabel"></SelectOptions>
</Playground>

---

## Basic example without preselection

To ensure the user makes a conscious choice, use `<option></option>` as placeholder. If the select is required, use
`<option hidden></option>` to enforce a selection.

<Playground :markup="requiredMarkup" :config="config">
  <SelectOptions v-model="required" :values="requireds" name="required"></SelectOptions>
</Playground>

---

## With filter

This option enhances the native select filter by providing an additional search field where the user can type their own
search string. The filter reduces the amount of option items by searching for the typed characters starting with the
first character of the options text.

<Playground :markup="withFilter" :config="config"></Playground>

---

## With optgroups

<Playground :markup="withOptgroups" :config="config"></Playground>

---

## Dropdown direction

<Playground :markup="dropdownDirectionMarkup" :config="config">
  <SelectOptions v-model="dropdownDirection" :values="dropdownDirections" name="dropdownDirection"></SelectOptions>
</Playground>

---

## With description text

A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement
of the label text and is technically connected with the `hide-label` property.

<Playground :markup="withDescriptionText" :config="config"></Playground>

---

## Required

<Playground :markup="requiredBasic" :config="config"></Playground>

---

## Disabled

<Playground :markup="disabled" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out
why these elements are disabled. A good practice when to use the disabled state is during **form submission** to prevent
changes while this process is performed.

---

## Validation states

The `p-select-wrapper` component supports the visualisation of inline validation.

<Playground :markup="stateMarkup" :config="config">
  <SelectOptions v-model="state" :values="states" name="state"></SelectOptions>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`.  
Therefore, a named slot can be used. Make sure **not** to define the corresponding property on the host element when a
named slot is used (because a property definition is preferred over a named slot). For named slots only
[phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is
allowed.

<Playground :markup="slots" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

If using **slotted contents** to serve form elements, make sure to provide the right **ARIA attributes** to give screen
reader users the corresponding information:

1. Add a unique ID to the `slot="label"` element
1. Add a unique ID to the `slot="message"` element (if they are created)
1. Add corresponding `aria-labelledby="some-label-id"` to the `select` element which points to the `label` ID
1. Add corresponding `aria-describedby="some-description-id some-message-id"` to the `select` element which points to
   both, the `description` ID (if set) and the `message` ID when the (error/success) message appears

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { FORM_STATES } from '../../../utils';
import { DROPDOWN_DIRECTIONS } from './select-wrapper-utils'; 

const buildOptions = (opts: string[]): string[] => opts.map(val => `<option value="${val}">Option ${val.toUpperCase()}</option>`);

@Component
export default class Code extends Vue {
  config = { themeable: true, overflowX: 'visible' };
  
  hideLabel = false;
  hideLabels = [false, true, '{ base: true, l: false }'];
  get hideLabelMarkup() {
    return `<p-select-wrapper label="Some label" hide-label="${this.hideLabel}">
  <select name="some-name">
    ${buildOptions(['a','b','c','d','e','f']).join('\n    ')}
  </select>
</p-select-wrapper>`;
  }

  required = false;
  requireds = [false, true];
  get requiredMarkup() {
    const option = !this.required ? '<option></option>' : '<option hidden></option>';
    const attr = this.required ? ' required' : '';
    
    return `<p-select-wrapper label="Some label">
  <select name="some-name"${attr}>
    ${option}
    ${buildOptions(['a','b','c']).join('\n    ')}
  </select>
</p-select-wrapper>`;
  }

  get withFilter() {
    const options = {
      AF: 'Afghanistan',
      AX: 'Åland Islands',
      AL: 'Albania',
      DZ: 'Algeria',
      AS: 'American Samoa',
      AD: 'Andorra',
      AO: 'Angola',
      AI: 'Anguilla',
      AQ: 'Antarctica',
      AG: 'Antigua and Barbuda',
      AR: 'Argentina',
      AM: 'Armenia',
      AW: 'Aruba',
      AU: 'Australia',
      AT: 'Austria',
      AZ: 'Azerbaijan',
      BS: 'Bahamas',
      BH: 'Bahrain',
      BD: 'Bangladesh',
      BB: 'Barbados',
      BY: 'Belarus',
      BE: 'Belgium',
      BZ: 'Belize',
      BJ: 'Benin',
      BM: 'Bermuda',
      BT: 'Bhutan',
      BO: 'Bolivia, Plurinational State of',
      BQ: 'Bonaire, Sint Eustatius and Saba',
      BA: 'Bosnia and Herzegovina',
      BW: 'Botswana',
      BV: 'Bouvet Island',
      BR: 'Brazil',
      IO: 'British Indian Ocean Territory',
      BN: 'Brunei Darussalam',
      BG: 'Bulgaria',
      BF: 'Burkina Faso',
      BI: 'Burundi',
      KH: 'Cambodia',
      CM: 'Cameroon',
      CA: 'Canada',
      CV: 'Cape Verde',
      KY: 'Cayman Islands',
      CF: 'Central African Republic',
      TD: 'Chad',
      CL: 'Chile',
      CN: 'China',
      CX: 'Christmas Island',
      CC: 'Cocos (Keeling) Islands',
      CO: 'Colombia',
      KM: 'Comoros',
      CG: 'Congo',
      CD: 'Congo, the Democratic Republic of the',
      CK: 'Cook Islands',
      CR: 'Costa Rica',
      CI: 'Côte d\'Ivoire',
      HR: 'Croatia',
      CU: 'Cuba',
      CW: 'Curaçao',
      CY: 'Cyprus',
      CZ: 'Czech Republic',
      DK: 'Denmark',
      DJ: 'Djibouti',
      DM: 'Dominica',
      DO: 'Dominican Republic',
      EC: 'Ecuador',
      EG: 'Egypt',
      SV: 'El Salvador',
      GQ: 'Equatorial Guinea',
      ER: 'Eritrea',
      EE: 'Estonia',
      ET: 'Ethiopia',
      FK: 'Falkland Islands (Malvinas)',
      FO: 'Faroe Islands',
      FJ: 'Fiji',
      FI: 'Finland',
      FR: 'France',
      GF: 'French Guiana',
      PF: 'French Polynesia',
      TF: 'French Southern Territories',
      GA: 'Gabon',
      GM: 'Gambia',
      GE: 'Georgia',
      DE: 'Germany',
      GH: 'Ghana',
      GI: 'Gibraltar',
      GR: 'Greece',
      GL: 'Greenland',
      GD: 'Grenada',
      GP: 'Guadeloupe',
      GU: 'Guam',
      GT: 'Guatemala',
      GG: 'Guernsey',
      GN: 'Guinea',
      GW: 'Guinea-Bissau',
      GY: 'Guyana',
      HT: 'Haiti',
      HM: 'Heard Island and McDonald Islands',
      VA: 'Holy See (Vatican City State',
      HN: 'Honduras',
      HK: 'Hong Kong',
      HU: 'Hungary',
      IS: 'Iceland',
      IN: 'India',
      ID: 'Indonesia',
      IR: 'Iran, Islamic Republic of',
      IQ: 'Iraq',
      IE: 'Ireland',
      IM: 'Isle of Man',
      IL: 'Israel',
      IT: 'Italy',
      JM: 'Jamaica',
      JP: 'Japan',
      JE: 'Jersey',
      JO: 'Jordan',
      KZ: 'Kazakhstan',
      KE: 'Kenya',
      KI: 'Kiribati',
      KP: 'Korea, Democratic People\'s Republic of',
      KR: 'Korea, Republic of',
      KW: 'Kuwait',
      KG: 'Kyrgyzstan',
      LA: 'Lao People\'s Democratic Republic',
      LV: 'Latvia',
      LB: 'Lebanon',
      LS: 'Lesotho',
      LR: 'Liberia',
      LY: 'Libya',
      LI: 'Liechtenstein',
      LT: 'Lithuania',
      LU: 'Luxembourg',
      MO: 'Macao',
      MK: 'Macedonia, the former Yugoslav Republic of',
      MG: 'Madagascar',
      MW: 'Malawi',
      MY: 'Malaysia',
      MV: 'Maldives',
      ML: 'Mali',
      MT: 'Malta',
      MH: 'Marshall Islands',
      MQ: 'Martinique',
      MR: 'Mauritania',
      MU: 'Mauritius',
      YT: 'Mayotte',
      MX: 'Mexico',
      FM: 'Micronesia, Federated States of',
      MD: 'Moldova, Republic of',
      MC: 'Monaco',
      MN: 'Mongolia',
      ME: 'Montenegro',
      MS: 'Montserrat',
      MA: 'Morocco',
      MZ: 'Mozambique',
      MM: 'Myanmar',
      NA: 'Namibia',
      NR: 'Nauru',
      NP: 'Nepal',
      NL: 'Netherlands',
      NC: 'New Caledonia',
      NZ: 'New Zealand',
      NI: 'Nicaragua',
      NE: 'Niger',
      NG: 'Nigeria',
      NU: 'Niue',
      NF: 'Norfolk Island',
      MP: 'Northern Mariana Islands',
      NO: 'Norway',
      OM: 'Oman',
      PK: 'Pakistan',
      PW: 'Palau',
      PS: 'Palestinian Territory, Occupied',
      PA: 'Panama',
      PG: 'Papua New Guinea',
      PY: 'Paraguay',
      PE: 'Peru',
      PH: 'Philippines',
      PN: 'Pitcairn',
      PL: 'Poland',
      PT: 'Portugal',
      PR: 'Puerto Rico',
      QA: 'Qatar',
      RE: 'Réunion',
      RO: 'Romania',
      RU: 'Russian Federation',
      RW: 'Rwanda',
      BL: 'Saint Barthélemy',
      SH: 'Saint Helena, Ascension and Tristan da Cunha',
      KN: 'Saint Kitts and Nevis',
      LC: 'Saint Lucia',
      MF: 'Saint Martin (French part',
      PM: 'Saint Pierre and Miquelon',
      VC: 'Saint Vincent and the Grenadines',
      WS: 'Samoa',
      SM: 'San Marino',
      ST: 'Sao Tome and Principe',
      SA: 'Saudi Arabia',
      SN: 'Senegal',
      RS: 'Serbia',
      SC: 'Seychelles',
      SL: 'Sierra Leone',
      SG: 'Singapore',
      SX: 'Sint Maarten (Dutch part',
      SK: 'Slovakia',
      SI: 'Slovenia',
      SB: 'Solomon Islands',
      SO: 'Somalia',
      ZA: 'South Africa',
      GS: 'South Georgia and the South Sandwich Islands',
      SS: 'South Sudan',
      ES: 'Spain',
      LK: 'Sri Lanka',
      SD: 'Sudan',
      SR: 'Suriname',
      SJ: 'Svalbard and Jan Mayen',
      SZ: 'Swaziland',
      SE: 'Sweden',
      CH: 'Switzerland',
      SY: 'Syrian Arab Republic',
      TW: 'Taiwan, Province of China',
      TJ: 'Tajikistan',
      TZ: 'Tanzania, United Republic of',
      TH: 'Thailand',
      TL: 'Timor-Leste',
      TG: 'Togo',
      TK: 'Tokelau',
      TO: 'Tonga',
      TT: 'Trinidad and Tobago',
      TN: 'Tunisia',
      TR: 'Turkey',
      TM: 'Turkmenistan',
      TC: 'Turks and Caicos Islands',
      TV: 'Tuvalu',
      UG: 'Uganda',
      UA: 'Ukraine',
      AE: 'United Arab Emirates',
      GB: 'United Kingdom',
      US: 'United States',
      UM: 'United States Minor Outlying Islands',
      UY: 'Uruguay',
      UZ: 'Uzbekistan',
      VU: 'Vanuatu',
      VE: 'Venezuela, Bolivarian Republic of',
      VN: 'Viet Nam',
      VG: 'Virgin Islands, British',
      VI: 'Virgin Islands, U.S',
      WF: 'Wallis and Futuna',
      EH: 'Western Sahara',
      YE: 'Yemen',
      ZM: 'Zambia',
      ZW: 'Zimbabwe',      
    };
    return `<p-select-wrapper filter="true" label="Some label">
<select name="some-name">
  ${Object.entries(options).map(([value, label]) => `<option value="${value}"${value === 'AQ' ? ' disabled' : ''}>${label}</option>`).join('\n    ')}
</select>
</p-select-wrapper>`;
  }
  
  withOptgroups =
`<p-select-wrapper label="Some label">
  <select name="some-name">
    <optgroup label="Some optgroup label 1">
      ${buildOptions(['a','b','c','d','e','f']).join('\n      ')}
    </optgroup>
    <optgroup label="Some optgroup label 2">
      ${buildOptions(['g','h','i']).join('\n      ')}
    </optgroup>
  </select>
</p-select-wrapper>`;

  dropdownDirection = 'auto';
  dropdownDirections = DROPDOWN_DIRECTIONS;
  get dropdownDirectionMarkup() {
    return `<p-select-wrapper label="Some label" dropdown-direction="${this.dropdownDirection}">
  <select name="some-name">
    ${buildOptions(['a','b','c','d','e','f']).join('\n    ')}
  </select>
</p-select-wrapper>`;
}

  withDescriptionText =
`<p-select-wrapper label="Some label" description="Some description">
  <select name="some-name">
    ${buildOptions(['a','b','c']).join('\n    ')}
  </select>
</p-select-wrapper>`;

  requiredBasic =
`<p-select-wrapper label="Some label">
  <select name="some-name" required>
    ${buildOptions(['a','b','c']).join('\n    ')}
  </select>
</p-select-wrapper>`;

  disabled =
`<p-select-wrapper label="Some label">
  <select name="some-name" disabled>
    ${buildOptions(['a','b','c']).join('\n    ')}
  </select>
</p-select-wrapper>`;

  state = 'error';
  states = FORM_STATES;
  get stateMarkup() {
    const attr = `message="${this.state !== 'none' ? `Some ${this.state} validation message.` : ''}"`;
    return `<p-select-wrapper label="Some label" state="${this.state}" ${attr}>
  <select name="some-name" aria-invalid="${this.state === 'error'}">
    ${buildOptions(['a','b','c']).join('\n    ')}
  </select>
</p-select-wrapper>`
  }

  slots =
`<p-select-wrapper state="error">
  <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <select name="some-name" aria-labelledby="some-label-id" aria-describedby="some-description-id some-message-id">
    ${buildOptions(['a','b','c']).join('\n    ')}
  </select>
  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
</p-select-wrapper>`;
}
</script>
