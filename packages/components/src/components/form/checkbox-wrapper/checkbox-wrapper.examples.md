# Checkbox

The `p-checkbox-wrapper` component is a styling wrapper for the native HTML input type `checkbox` form element. Checking one box doesn't uncheck other Checkboxes. By default Checkboxes are not selected.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-checkbox-wrapper` component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

<TableOfContents></TableOfContents>

## Basic example

<Playground :markup="basic" :config="config">
  <select v-model="label">
    <option value="show">With label</option>
    <option value="hide">Without label</option>
    <option value="responsive">Responsive</option>
  </select>
</Playground>

---

## Indeterminate

Mask the visual appearance of a checkbox which has a state in-between checked and unchecked.  
This is especially useful for a checkbox that is used to set the state of a group of checkboxes
at once. However this group might have a mixed state. In this case we recommend to use `checked=false`
and `indeterminate=true`.

**Note: The `indeterminate` attribute can only be set through the DOM node.
There is no HTML attribute to set it. Also it's worth to know, that the `indeterminate` attribute
only affects how the checkbox is shown. The current value is hidden from the user, but the
checkbox still keeps it's `checked` state. You can find more details in [the specification](https://www.w3.org/TR/html52/sec-forms.html#dom-htmlinputelement-indeterminate).**

<Playground :markup="indeterminate" :config="config"></Playground>

---

## Required

<Playground :markup="required" :config="config"></Playground>

---

## Disabled

<Playground :markup="disabled" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable) anymore and can be missed by screen reader users.
They can be confusing for sighted users as well by not pointing out why these elements are disabled.
A good practice when to use the disabled state is during **form submission** to prevent changes while this process is performed.

---

## Validation states

The `p-checkbox-wrapper` component supports the visualisation of inline validation. The `message` and `checkbox` is colored and visible/hidden depending on the defined `state`.

<Playground :markup="validation" :config="config">
  <select v-model="state">
    <option disabled>Select a validation state</option>
    <option value="error">Error</option>
    <option value="success">Success</option>
    <option value="none">None</option>
  </select>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).
For named slots only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed.

<Playground :markup="slots" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
If using **slotted contents** to serve form elements, make sure to provide the right **ARIA attributes** to give screen reader users the corresponding information: 
1. Add a unique ID to the `slot="label"` element
1. Add a unique ID to the `slot="message"` element (if they are created)
1. Add corresponding `aria-labelledby="some-label-id"` to the `input` element which points to the `label` ID
1. Add corresponding `aria-describedby="some-message-id"` to the `input` element which points to the `message` ID when the (error/success) message appears

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { spacing: 'inline' };
    
    state = 'error';
    label = 'show';
    
    get basic() {
      const hideLabel = this.label === 'hide' ? 'true' : this.label === 'responsive' ? '{ base: true, l: false }' : 'false';
      return `<p-checkbox-wrapper label="Some label" hide-label="${hideLabel}">
  <input type="checkbox" name="some-name" />
</p-checkbox-wrapper>
<p-checkbox-wrapper label="Some label" hide-label="${hideLabel}">
  <input type="checkbox" name="some-name" checked />
</p-checkbox-wrapper>`;
    }
    
    indeterminate =
`<p-checkbox-wrapper label="Some label">
  <input type="checkbox" name="some-name" class="example-set-to-indeterminate" />
</p-checkbox-wrapper>
<p-checkbox-wrapper label="Some label">
  <input type="checkbox" name="some-name" class="example-set-to-indeterminate" checked />
</p-checkbox-wrapper>`;
    
    required =
`<p-checkbox-wrapper label="Some label">
  <input type="checkbox" name="some-name" required />
</p-checkbox-wrapper>
<p-checkbox-wrapper label="Some label">
  <input type="checkbox" name="some-name" required checked />
</p-checkbox-wrapper>`;

    disabled =
`<p-checkbox-wrapper label="Some label">
  <input type="checkbox" name="some-name" disabled />
</p-checkbox-wrapper>
<p-checkbox-wrapper label="Some label">
  <input type="checkbox" name="some-name" disabled checked />
</p-checkbox-wrapper>`;
    
    get validation() {
      const message = this.state !== 'none' ? `Some ${this.state} validation message.` : ''; 
      return `<p-checkbox-wrapper label="Some label" state="${this.state}" message="${message}">
  <input type="checkbox" name="some-name" />
</p-checkbox-wrapper>`;
    }
    
    slots =
`<p-checkbox-wrapper state="error">
  <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <input type="checkbox" name="some-name" aria-labelledby="some-label-id" aria-describedby="some-message-id" />
  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
</p-checkbox-wrapper>`;
    
    mounted() {
      this.$nextTick(function () {
        const inputs = document.querySelectorAll('.example-set-to-indeterminate');
        inputs.forEach(input => {
          input.indeterminate = true;
        });
      });
    }
  }
</script>