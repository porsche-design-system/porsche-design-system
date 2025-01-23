<ComponentHeading name="Button Pure"></ComponentHeading>

The `p-button-pure` component is essential to perform events for **interactions**. A Button can be used with or without
a label, but it's recommended to keep the **label visible** for better **usability** whenever possible. When used
without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers.

Whenever you want to provide navigational elements, stick to the [Link](components/link) or
[Link Pure](components/link-pure) component instead.

Similarly to the `p-button`, the `p-button-pure` can be used as a submit button within a form for which a `name` and
`value` prop can be passed. See the [Button Form Example](components/button/examples#form) for more information.

<TableOfContents></TableOfContents>

## Basic example

### With label

<Playground :markup="withLabel" :config="configInline"></Playground>

### Without label

<Playground :markup="withoutLabel" :config="configInline"></Playground>

### Without Icon

The variant without icon is only recommended in the context of menus, where it is clearly evident that the component is
clickable or by setting the `underline` prop to provide a visual hint.

**Caution:** You can't combine this with the prop `hideLabel`

<Playground :markup="withoutIcon" :config="configInline"></Playground>

### Responsive

<Playground :markup="responsive" :config="config"></Playground>

## ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes and states to the
component.

<Playground :markup="accessibility" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

- Make sure to provide **descriptive**, self explaining **labels** which could be understood without context. If short
  labels are used like **"OK"** make sure to provide additional textual contents through **ARIA** with the `aria`
  property to expose a more descriptive experience to screen reader users.
- If implementing the Button with a **hidden label** (`hide-label="true"`), do not omit the label. Providing a
  **descriptive text** to support **screen reader** users is **mandatory**.
- In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
  anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not showing why
  these elements are disabled.

---

## Size

There are predefined text sizes for the component which should cover most use cases. If a specific text size is needed,
the size can be set to `inherit` to specify the text size from outside.

<Playground :markup="sizeMarkup" :config="config">
  <PlaygroundSelect v-model="size" :values="sizes" name="size"></PlaygroundSelect>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="markupResponsive" :config="config"></Playground>

---

## Weight (deprecated)

<Notification heading="Important note" heading-tag="h3" state="error">
  The weight prop is deprecated and will be removed with next major release.
  In case, e.g. <b>weight="semibold"</b> is used it will automatically be mapped to font weight regular.
</Notification>

---

## Active state

Providing visually differences if a button needs to be accentuated, e.g. in hierarchical mobile menus.

<Playground :markup="markupActive" :config="config"></Playground>

---

## Button Pure with specific icon

If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all
icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to
link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :markup="icon" :config="configInline"></Playground>

---

## Alignment

The `label` can be aligned to the `end` (default) or to the `start` of the icon.

<Notification heading="Deprecation hint" heading-tag="h3" state="warning">
  Following alignments have been deprecated and will be removed with the next major release: "left" and "right".
</Notification>

<Playground :markup="alignLabelMarkup" :config="config">
  <PlaygroundSelect v-model="alignLabel" :values="alignLabels" name="alignLabel"></PlaygroundSelect>
</Playground>

---

## Stretch

The `stretch` property extends the area between icon and label to the maximum available space. It is recommended to use
stretch only on `start` alignment and small viewports, e.g. mobile views.

<Playground :markup="stretchMarkup" :config="config">
  <PlaygroundSelect v-model="stretch" :values="stretches" name="stretch and align-label"></PlaygroundSelect>
</Playground>

---

## Button Pure with custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of a button to fulfill accessibility guidelines.
Therefore a custom padding can be set on the host element.

<Playground :markup="clickableArea" :config="configInline"></Playground>

---

## Bind events to the button

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :markup="events" :config="config"></Playground>

---

## Remove Button Pure from tab order

By setting the `tabindex` attribute to `-1` you can remove the **Button Pure** from the tab order.

<Playground :markup="taborder" :config="configInline"></Playground>

## Form

When used as a submit button, the `name` and `value` props are submitted as a pair as part of the form data.

<Playground :frameworkMarkup="formExample" :config="{ ...config, withoutDemo: true }">
  <form @submit.prevent="onSubmit">
    <p-button-pure name="option" value="A" type="submit" style="margin-inline-end: 16px;" :theme="theme">Button A</p-button-pure>
    <p-button-pure name="option" value="B" type="submit" :theme="theme">Button B</p-button-pure>
  </form>
  <br/>
  <p-text :theme="theme">{{ selectedValuesForm }}</p-text>
</Playground>

## Form Attribute

When a button is used as a submit or reset button outside a form, the `form` attribute can be utilized to explicitly
associate the button with a specific form element.

<Notification heading="Attention" heading-tag="h2" state="warning">
When using the <code>p-button-pure</code> component as a <strong>submit</strong> or <strong>reset</strong> button outside a form,
it relies on the <a href="https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals">ElementInternals</a> API, which has limited
browser support.<br/><br/> As of now, the submitter in the form event is null because the button cannot be accessed within the shadow DOM
to be passed as an argument to the <code>requestSubmit()</code> function (<a href="https://github.com/WICG/webcomponents/issues/814">WICG/webcomponents#814</a>).
<br/><br/>Additionally, custom components using ElementInternals may include all values of elements with the same name attribute in form data, rather than only the value of
the triggering element, deviating from native form behavior.
</Notification>

<Playground :frameworkMarkup="formAttributeExample" :config="{ ...config, withoutDemo: true }">
  <form @submit.prevent="handleSubmit" id="some-form">
    <p-textarea name="some-name" label="Some Label" :theme="theme" />
  </form>
  <br/>
  <p-button-group>
    <p-button-pure type="submit" form="some-form" :theme="theme">Submit</p-button-pure>
    <p-button-pure type="reset" form="some-form" :theme="theme">Reset</p-button-pure>
  </p-button-group>
  <br/>
  <p-text :theme="theme">{{ selectedValueForm }}</p-text>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {getButtonPureCodeSamples} from "@porsche-design-system/shared"; 
import { TEXT_SIZES } from '../../utils/typography/text-size';
import { ALIGN_LABELS, ALIGN_LABELS_DEPRECATED } from '../../utils';
import type { Theme } from '@/models';

@Component
export default class Code extends Vue {
  config = { themeable: true };
  configInline = { ...this.config, spacing: 'inline' };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  stretch = 'stretch="true" align-label="start"';
  stretches = [
    'stretch="true" align-label="start"',
    'stretch="true" align-label="end"',
    'stretch="false" align-label="start"',
    'stretch="false" align-label="end"',
    'stretch="{ base: true, l: false }" align-label="start"',
  ];

  formExample = getButtonPureCodeSamples('example-form');
  formAttributeExample = getButtonPureCodeSamples('example-form-attribute');

  selectedValuesForm = 'Last submitted data: none';
  onSubmit(e) {
    const formData = Array.from(new FormData(e.target, e.submitter).entries())[0];
    this.selectedValuesForm = `Last submitted data: ${formData.join('=') || 'none'}`;
  }

  selectedValueForm = 'Last submitted data: none';
  handleSubmit(e) {
    const formData = new FormData(e.target);
    this.selectedValueForm = `Last submitted data: ${
      Array.from(formData.entries(), ([_, value]) => value)
        .join('') || 'none'
    }`;
  }

  withoutIcon =
`<p-button-pure icon="none">Some label</p-button-pure>
<p-button-pure icon="none" disabled="true">Some label</p-button-pure>
<p-button-pure icon="none" loading="true">Some label</p-button-pure><br>
<p-button-pure icon="none" underline="true">Some label</p-button-pure>
<p-button-pure icon="none" disabled="true" underline="true">Some label</p-button-pure>
<p-button-pure icon="none" loading="true" underline="true">Some label</p-button-pure>`;
    
  withLabel =
`<p-button-pure>Some label</p-button-pure>
<p-button-pure disabled="true">Some label</p-button-pure>
<p-button-pure loading="true">Some label</p-button-pure>`;

  withoutLabel =
`<p-button-pure hide-label="true">Some label</p-button-pure>
<p-button-pure hide-label="true" disabled="true">Some label</p-button-pure>
<p-button-pure hide-label="true" loading="true">Some label</p-button-pure>`;
    
  responsive =
`<p-button-pure hide-label="{ base: true, l: false }">Some label</p-button-pure>`;

  size = 'medium';
  sizes = TEXT_SIZES;
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="font-size: 3rem;"' : '';
    return `<p-button-pure size="${this.size}"${style}>Some label</p-button-pure>`;
  }

  accessibility = 
`<p-button-pure aria="{ 'aria-label': 'Some more descriptive label' }">Some label</p-button-pure>`;
    
  markupResponsive = 
`<p-button-pure size="{ base: 'small', l: 'medium' }">Some label</p-button-pure>`;

  markupActive =
`<p-button-pure active="true">Some label</p-button-pure>`;

  icon =
`<p-button-pure icon="delete">Some label</p-button-pure>
<p-button-pure icon-source="${require('../../assets/icon-custom-kaixin.svg')}" hide-label="true">Some label</p-button-pure>`;

  alignLabel = 'start';
  alignLabels = [...ALIGN_LABELS.map(item => ALIGN_LABELS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item), "{ base: 'start', l: 'end' }"];
  get alignLabelMarkup() {
    return `<p-button-pure align-label="${this.alignLabel}">Some label</p-button-pure>`;
  };

  get stretchMarkup() {
    return `<p-button-pure ${this.stretch}>Some label</p-button-pure>`;
  };

  clickableArea =
`<p-button-pure style="padding: 1rem;">Some label</p-button-pure>
<p-button-pure hide-label="true" style="padding: 1rem;">Some label</p-button-pure>`;

  events =
`<p-button-pure
  onclick="alert('click')"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
>Some label</p-button-pure>`;

  taborder =
`<p-button-pure>Some label</p-button-pure>
<p-button-pure tabindex="-1">Some label</p-button-pure>
<p-button-pure>Some label</p-button-pure>`;
}
</script>
