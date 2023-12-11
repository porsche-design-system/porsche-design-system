# Text Field Wrapper

The `p-text-field-wrapper` component is a styling wrapper for the native HTML input types and is essential for mostly
any form.

A `label` is a caption which informs the user what information a particular form field is asking for. The
`p-text-field-wrapper` component can be used with or without a label, but it's recommended to keep the label visible for
better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label
text for screen readers.

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to
give the user visual cues to fill out the form.

<TableOfContents></TableOfContents>

## Basic example

<Playground :markup="hideLabelMarkup" :config="config">
  <PlaygroundSelect v-model="hideLabel" :values="hideLabels" name="hideLabel"></PlaygroundSelect>
</Playground>

## With description text

A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement
of the label text and is technically connected with the `hide-label` property.

<Playground :markup="withDescriptionText" :config="config"></Playground>

## Required

<Playground :markup="required" :config="config"></Playground>

## Disabled

<Playground :markup="disabled" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out
why these elements are disabled. A good practice when to use the disabled state is during **form submission** to prevent
changes while this process is performed.

## Read only

<Playground :markup="readonly" :config="config"></Playground>

## Counter

If the `maxlength` attribute is present on the `input` element, a counter will be displayed in the corner.  
To hide it you can set `showCounter` to `false`.

<Notification heading="Deprecation hint" state="warning">
  The <code>showCharacterCount</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>showCounter</code> property instead.
</Notification>

<Playground :markup="counter" :config="config"></Playground>

## Type overview

The following types listed in the configurator below are supported. Browser specific UI helpers (e.g. calendar dropdown
in Chrome) may occur inside the input field which are explicitly not reset by the `p-text-field-wrapper` component. For
better accessibility it's recommended to **not** reset these browser default UI helpers.

<Playground :markup="inputTypeMarkup" :config="config">
  <PlaygroundSelect v-model="inputType" :values="inputTypes" name="inputType"></PlaygroundSelect>
</Playground>

## type="number"

Inputs with `type="number"` can display a unit (e.g. €, EUR, km/h, etc.) with a **maximum** of five characters. A
description of the used unit should be provided to ensure accessibility.

<Playground :markup="unitPositionMarkup" :config="config">
  <PlaygroundSelect v-model="unitPosition" :values="unitPositions" name="unitPosition"></PlaygroundSelect>
</Playground>

## type="password"

Inputs with `type="password"` receive a toggle button to display the input's value in clear text.

<Playground :markup="typePassword" :config="config"></Playground>

## type="password" without password toggle button

If you want to remove the password toggle button, you can pass `showPasswordToggle="false"`.

<Notification heading="Attention" state="warning">
  The <code>showPasswordToggle</code> prop is experimental and might be removed in a future release.
</Notification>

<Playground :markup="typePasswordWithoutPasswordToggle" :config="config"></Playground>

## type="search"

Inputs with `type="search"` receive a decorative search icon when used outside a form.  
Only if used inside a form, a submit button becomes visible which can be hidden using `submitButton="false"`. If the
input contains a value, a clear button shows up.

<Playground :markup="typeSearchMarkup" :config="config">
  <PlaygroundSelect v-model="submitButton" :values="submitButtons" name="submitButton"></PlaygroundSelect>
</Playground>

## type="search" with locate action

Inputs with `type="search"` that also have the `actionIcon="locate"` property always show an action button, no matter if
used within or outside a form.

<Playground :markup="typeSearchWithLocateAction" :config="config"></Playground>

## type="search" with locate action and loading

On top of `actionIcon="locate"` it is possible to put the component into a loading state via `actionLoading="true"`.

<Playground :markup="typeSearchWithLocateActionAndLoading" :config="config"></Playground>

### Demo implementation

<Playground :frameworkMarkup="searchExample" :config="config">
  <p-text-field-wrapper label="Some label" hide-label="true" action-icon="locate" :action-loading="demoIsLoading" v-on:action="onDemoAction" :theme="theme">
    <input type="search" :value="demoValue" :placeholder="demoIsLoading ? 'Locating...' : ''" v-on:input="onDemoInput" />
  </p-text-field-wrapper>
  <p-text :theme="theme">Value: {{ demoValue }}</p-text>
</Playground>

## Validation states

The `p-text-field-wrapper` component supports the visualisation of inline validation. The `message` and `input` is
colored and visible/hidden depending on the defined `state`.

<Playground :markup="stateMarkup" :config="config">
  <PlaygroundSelect v-model="state" :values="states" name="state"></PlaygroundSelect>
</Playground>

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label`, `description` or `message`.
Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a
named slot is used (because a property definition is preferred over a named slot). For named slots only
[phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is
allowed.

<Playground :markup="slots" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

If using **slotted contents** to serve form elements, make sure to provide the right **ARIA attributes** to give screen
reader users the corresponding information:

1. Add a unique ID to the `slot="label"` element
2. Add a unique ID to the `slot="message"` element (if they are created)
3. Add corresponding `aria-labelledby="some-label-id"` to the `input` element which points to the `label` ID
4. Add corresponding `aria-describedby="some-description-id some-message-id"` to the `input` element which points to
   both, the `description` ID (if set) and the `message` ID when the (error/success) message appears

## Masked Input

If you want to use localized input masks to improve the user experience we recommend using
<a href="https://imask.js.org/" target="_blank">iMask</a>. Make sure to handle potential drawbacks (e.g. auto-formatting
/-correction, styling to distinguish between masked input, placeholder and input value, error handling etc.) to avoid
user frustration.

<Notification heading="Important note" state="warning">
  Be aware that if you provide masked input you will lose all benefits which you might have using type "date" (e.g. native date-picker) since masked inputs always require input type "text". Same applies to other types with native handling.<br>
  Once the last character is inserted the input will be converted to a Date object and gets verified (read more <a href="https://imask.js.org/guide.html#masked-date" target="_blank">here</a>).<br>
  Keep in mind that the definition of the "locale" in the examples below is a very simple use case. You will probably have to distinguish between more than two scenarios.
</Notification>

<Playground :markup="maskedInput" :frameworkMarkup="imaskExample" :config="config" :externalStackBlitzDependencies="['imask']"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IMask from 'imask';
import { getTextFieldWrapperCodeSamples } from '@porsche-design-system/shared';
import { UNIT_POSITIONS } from './text-field-wrapper-utils'; 
import { FORM_STATES } from '../../utils'; 
import { Theme } from '@/models';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };

  imaskExample = getTextFieldWrapperCodeSamples('example-imask');
  searchExample = getTextFieldWrapperCodeSamples('example-search');

  get theme(): Theme {
    return this.$store.getters.playgroundTheme || 'light';
  }

  hideLabel = false;
  hideLabels = [false, true, '{ base: true, l: false }'];
  get hideLabelMarkup() {
    return `<p-text-field-wrapper label="Some label" hide-label="${this.hideLabel}">
  <input type="text" name="some-name" />
</p-text-field-wrapper>
<p-text-field-wrapper label="Some label" hide-label="${this.hideLabel}">
  <input type="text" placeholder="Some placeholder" name="some-name" />
</p-text-field-wrapper>`;
  }
  
  withDescriptionText =
`<p-text-field-wrapper label="Some label" description="Some description">
  <input type="text" name="some-name" />
</p-text-field-wrapper>`;

  required =
`<p-text-field-wrapper label="Some label">
  <input type="text" name="some-name" value="Some value" required />
</p-text-field-wrapper>`;

  disabled =
`<p-text-field-wrapper label="Some label">
  <input type="text" name="some-name" value="Some value" disabled />
</p-text-field-wrapper>`;

  readonly =
`<p-text-field-wrapper label="Some label">
  <input type="text" name="some-name" value="Some value" readonly />
</p-text-field-wrapper>`;

  counter =
`<p-text-field-wrapper label="Some label">
  <input type="text" name="some-name" value="Some value" maxlength="20" />
</p-text-field-wrapper>
<p-text-field-wrapper label="Some label" show-counter="false">
  <input type="text" name="some-name" value="Some value" maxlength="20" />
</p-text-field-wrapper>`;

  inputType = 'text';
  inputTypes = ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password'];
  get inputTypeMarkup() {
    return `<p-text-field-wrapper label="Some label">
  <input type="${this.inputType}" name="some-name" />
</p-text-field-wrapper>`;
  }

  unitPosition = 'prefix';
  unitPositions = UNIT_POSITIONS;
  get unitPositionMarkup() {
    return `<p-text-field-wrapper label="Some label" description="The price in Euro" unit="EUR" unit-position="${this.unitPosition}">
  <input type="number" name="some-name" value="500" />
</p-text-field-wrapper>`;
  }
  
  typePassword =
`<p-text-field-wrapper label="Some label">
  <input type="password" name="some-name" value="some password" />
</p-text-field-wrapper>`;

  get typePasswordWithoutPasswordToggle() {
    return this.typePassword.replace(/label="Some label"/, '$& show-password-toggle="false"');
  }

  submitButton = true;
  submitButtons = [true, false];
  get typeSearchMarkup() {
    return `<p-text-field-wrapper label="Some label">
  <input type="search" name="some-name" />
</p-text-field-wrapper>

<form action="#" onsubmit="alert('submit'); return false;">
  <p-text-field-wrapper label="Some label" submit-button="${this.submitButton}">
    <input type="search" name="some-name" />
  </p-text-field-wrapper>
</form>`;
  }

  typeSearchWithLocateAction = 
`<p-text-field-wrapper label="Some label" action-icon="locate">
  <input type="search" name="some-name" />
</p-text-field-wrapper>

<form action="#" onsubmit="alert('submit'); return false;">
  <p-text-field-wrapper label="Some label" action-icon="locate">
    <input type="search" name="some-name" />
  </p-text-field-wrapper>
</form>`;

  typeSearchWithLocateActionAndLoading = 
`<p-text-field-wrapper label="Some label" action-icon="locate" action-loading="true">
  <input type="search" name="some-name" />
</p-text-field-wrapper>

<form action="#" onsubmit="alert('submit'); return false;">
  <p-text-field-wrapper label="Some label" action-icon="locate" action-loading="true">
    <input type="search" name="some-name" />
  </p-text-field-wrapper>
</form>`;

  demoValue = '';
  demoIsLoading = false;
  onDemoAction() {
    this.demoIsLoading = true;

    // simulate async request
    setTimeout(() => {
      this.demoValue = 'Stuttgart, Baden-Württemberg';
      this.demoIsLoading = false;
    }, 3000);
  }
  onDemoInput(e: InputEvent) {
    this.demoValue = e.target.value;
    if (this.demoIsLoading) {
      this.demoIsLoading = false;
    }
  }

  state = 'error';
  states = FORM_STATES;
  get stateMarkup() {
    const attr = `message="${this.state !== 'none' ? `Some ${this.state} validation message.` : ''}"`;
    return `<p-text-field-wrapper label="Some label" state="${this.state}" ${attr}>
  <input type="text" name="some-name" />
</p-text-field-wrapper>`;
  }
    
  slots =
`<p-text-field-wrapper state="error">
  <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <input type="text" name="some-name" aria-labelledby="some-label-id" aria-describedby="some-description-id some-message-id" />
  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
</p-text-field-wrapper>`;

  get maskedInput() {
    return `<p-text-field-wrapper label="Some label" id="date-mask">
      <input type="text" />
    </p-text-field-wrapper>`;
  }

  mounted() {
    this.initIMask();
  }

  initIMask() {
    const isDeLocale = Intl.NumberFormat().resolvedOptions().locale.startsWith('de');
    const dateFormat = isDeLocale ? 'dd.mm.yyyy' : 'mm/dd/yyyy';
    const dateRange = isDeLocale ? '01.01.1900, 01.01.2100' : '01/01/1900, 01/01/2100';
    const textFieldWrapper = document.querySelector('#date-mask');
    textFieldWrapper.description = `'${dateFormat}' in range [${dateRange}]`;
  
    IMask(textFieldWrapper.querySelector('input'), {
      lazy: false,
      mask: dateFormat,
      blocks: {
        dd: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          placeholderChar: 'd',
        },
        mm: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          placeholderChar: 'm',
        },
        yyyy: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 2100,
          placeholderChar: 'y',
        },
      },
    });
  }
}
</script>
