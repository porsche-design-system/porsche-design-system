# Radio Button Wrapper

The `p-radio-button-wrapper` component is a styling wrapper for the native HTML input type `radio` form element. The
singular property of a Radio Button makes it distinct from a checkbox, which allows more than one (or no) item to be
selected and for the unselected state to be restored.

A `label` is a caption which informs the user what information a particular form field is asking for. The
`p-radio-button-wrapper` component can be used with or without a label but it's recommended to keep the label visible
for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label
text for screen readers.

<TableOfContents></TableOfContents>

## Basic examples

<Playground :markup="hideLabelMarkup" :config="config">
  <SelectOptions v-model="hideLabel" :values="hideLabels" name="hideLabel"></SelectOptions>
</Playground>

---

## Required

<Playground :markup="required" :config="config"></Playground>

---

## Disabled

<Playground :markup="disabled" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out
why these elements are disabled. A good practice when to use the disabled state is during **form submission** to prevent
changes while this process is performed.

## Loading

<Notification heading="Attention" state="warning">
  The <code>loading</code> prop is experimental and might be removed in a future release.
</Notification>

The `loading` property can be used to indicate that the current state change requires loading. It should be applied
exclusively to the radio button that is clicked and should remain visible until the checked state of that radio button
has changed.  
Keep in mind that the loading state will only appear when the radio button is **not checked**.

<Playground :markup="loading" :config="config"></Playground>

---

## Validation states

The `p-radio-button-wrapper` component supports the visualisation of inline validation. The `message` and `radio` is
colored and visible/hidden depending on the defined `state`.

<Playground :markup="stateMarkup" :config="config">
  <SelectOptions v-model="state" :values="states" name="state"></SelectOptions>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot
can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used
(because a property definition is preferred over a named slot). For named slots only
[phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is
allowed.

<Playground :markup="slots" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

If using **slotted contents** to serve form elements, make sure to provide the right **ARIA attributes** to give screen
reader users the corresponding information:

1. Add a unique ID to the `slot="label"` element
1. Add a unique ID to the `slot="message"` element (if they are created)
1. Add corresponding `aria-labelledby="some-label-id"` to the `input` element which points to the `label` ID
1. Add corresponding `aria-describedby="some-message-id"` to the `input` element which points to the `message` ID when
   the (error/success) message appears

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { FORM_STATES } from '../../utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };

  hideLabel = false;
  hideLabels = [false, true, '{ base: true, l: false }'];
  get hideLabelMarkup() {
    return `<p-radio-button-wrapper label="Some label" hide-label="${this.hideLabel}">
  <input type="radio" name="some-name-1" />
</p-radio-button-wrapper>
<p-radio-button-wrapper label="Some label" hide-label="${this.hideLabel}">
  <input type="radio" name="some-name-1" />
</p-radio-button-wrapper>`;
  }
  
  required =
`<p-radio-button-wrapper label="Some label">
  <input type="radio" name="some-name-2" required />
</p-radio-button-wrapper>
<p-radio-button-wrapper label="Some label">
  <input type="radio" name="some-name-2" required checked />
</p-radio-button-wrapper>`;

  disabled =
`<p-radio-button-wrapper label="Some label">
  <input type="radio" name="some-name-3" disabled />
</p-radio-button-wrapper>
<p-radio-button-wrapper label="Some label">
  <input type="radio" name="some-name-3" disabled checked />
</p-radio-button-wrapper>`;

  loading = 
`<p-radio-button-wrapper label="Some label" loading="true">
  <input type="radio" name="some-name-4" />
</p-radio-button-wrapper>
<p-radio-button-wrapper label="Some label">
  <input type="radio" name="some-name-4" checked />
</p-radio-button-wrapper>`;

  state = 'error';
  states = FORM_STATES;
  get stateMarkup() {
    const attr = ` message="${this.state !== 'none' ? `Some ${this.state} validation message.` : ''}"`;
    return `<p-radio-button-wrapper label="Some label" state="${this.state}">
  <input type="radio" name="some-name-5" />
</p-radio-button-wrapper>
<p-radio-button-wrapper label="Some label" state="${this.state}"${attr}>
  <input type="radio" name="some-name-5" />
</p-radio-button-wrapper>`;
    }
    
  slots =
`<p-radio-button-wrapper state="error">
  <span slot="label" id="some-label-id-1">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <input type="radio" name="some-name-6" aria-labelledby="some-label-id-1" />
</p-radio-button-wrapper>
<p-radio-button-wrapper state="error">
  <span slot="label" id="some-label-id-2">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <input type="radio" name="some-name-6" aria-labelledby="some-label-id-2" aria-describedby="some-message-id" />
  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
</p-radio-button-wrapper>`
}
</script>
