<ComponentHeading name="Textarea"></ComponentHeading>

The `p-textarea` component is a multi-line text input control. Don't use a Textarea component if you want to allow users
to enter shorter responses that are no longer than a single line, such as a phone number or name. In this case, you
should use the Text Field component.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-textarea`
component can be used with or without a label, but it's recommended to keep the label visible for better accessibility
whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to
give the user visual cues to fill out the form.

<Notification heading="Attention" heading-tag="h2" state="warning">
When the <code>p-textarea</code> component is used within a form, it utilizes the
<a href="https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals">ElementInternals</a> API, which has limited
browser support. For broader browser compatibility, consider using a
<a href="components/textarea/examples#controlled">controlled</a> approach instead.
</Notification>

<TableOfContents></TableOfContents>

## Basic example

Instead of relying on slotted content, the `p-textarea` component offers a `value` attribute and property that remain
synchronized with user input.

<Playground :markup="labelMarkup" :config="config"></Playground>

## Form

The `p-textarea` component is a form-associated custom element that integrates seamlessly with forms. Leveraging the
[ElementInternals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) API, it functions like a native
textarea, ensuring compatibility with form behaviors. However, note that browser support for this API is limited. At
present, the component only supports including the textarea value in the `FormData` object during form submission and
resetting the form. Native form validation features are not yet supported.

<Playground :frameworkMarkup="formExample" :config="{ ...config, withoutDemo: true }">
  <form @submit.prevent="onSubmit">
    <p-textarea name="some-name" label="Some Label" :theme="theme" />
    <br>
    <PlaygroundButton name="Submit" type="submit"></PlaygroundButton>
    <p-text :theme="theme" style="display: inline-block;">{{ selectedValuesForm }}</p-text>
  </form>
</Playground>

## Controlled

In the controlled approach, the `p-textarea` value is externally managed. While the internal value will be updated
automatically, you can use the `input`, `change` or `blur` event to update the external state.

<Playground :frameworkMarkup="controlledExample" :config="{ ...config, withoutDemo: true }">
<p-textarea name="some-name" :theme="theme" @input="updateControlledExample"></p-textarea>
<br>
<p-text :theme="theme">{{ value }}</p-text>
</Playground>

## With description text

A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement
of the label text and is technically connected with the `hide-label` property.

<Playground :markup="withDescriptionText" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out
why these elements are disabled. A good practice when to use the disabled state is during **form submission** to prevent
changes while this process is performed.

## Counter

If the `maxlength` attribute is present on the `p-textarea` element, a counter will be displayed in the corner.  
To hide it you can set `showCounter` to `false`.

<Playground :markup="counter" :config="config"></Playground>

## Validation states

The `p-textarea` component supports the visualisation of inline validation.

<Playground :markup="stateMarkup" :config="config">
  <PlaygroundSelect v-model="state" :values="states" name="state"></PlaygroundSelect>
</Playground>

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
1. Add corresponding `aria-labelledby="some-label-id"` to the `textarea` element which points to the `label` ID
1. Add corresponding `aria-describedby="some-description-id some-message-id"` to the `textarea` element which points to
   both, the `description` ID (if set) and the `message` ID when the (error/success) message appears

## Custom styling

The `p-textarea` component allows for customization through CSS Custom Properties (also known as CSS Variables). These
variables enable you to override certain styles of the native textarea element within the Shadow DOM, such as adjusting
the `min-height` and `resize` properties.

```scss
// default CSS variables
--p-textarea-min-height: 200px;
--p-textarea-resize: vertical;

// overwrite with CSS variables
p-textarea {
  --p-textarea-min-height: 100px;
  --p-textarea-resize: horizontal;
}
```

<script lang="ts">
import Vue from 'vue';  
import {getTextareaCodeSamples} from "shared/src";
import Component from 'vue-class-component';
import { FORM_STATES } from '../../utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };

  formExample = getTextareaCodeSamples('default');
  controlledExample = getTextareaCodeSamples('example-controlled');

  get labelMarkup() {
    return `<p-textarea name="some-name" label="Some label"></p-textarea>`;
  }

  withDescriptionText =
`<p-textarea name="some-name" label="Some label" description="Some description"></p-textarea>`;

  counter =
`<p-textarea name="some-name" label="Some label" value="Some value" max-length="200"></p-textarea>
<p-textarea name="some-name" label="Some label" value="Some value" max-length="200" show-counter="false"></p-textarea>`;

  state = 'error';
  states = FORM_STATES;
  get stateMarkup() {
    const attr = `message="${this.state !== 'none' ? `Some ${this.state} validation message.` : ''}"`;
    return `<p-textarea aria-invalid="${this.state === 'error'}" name="some-name" label="Some label" value="Some value" state="${this.state}" ${attr}></p-textarea>`;
    }
    
  slots = `<p-textarea name="some-name" aria-labelledby="some-label-id" aria-describedby="some-description-id some-message-id" state="error">
  <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
</p-textarea>`;

  updateControlledExample(e) {
  console.log(e);
    this.value = `Value: ${e.target.value}`;
  }

}
</script>
