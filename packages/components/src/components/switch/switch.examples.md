<ComponentHeading name="Switch"></ComponentHeading>

The `p-switch` component is a control that is used to quickly switch between two possible states. A switch is only used
for these binary actions that occur immediately after the user “flips the switch”. Commonly it is used for “on/off”
state.

It is a controlled component. This means it does not contain any internal state, and you got full control over its
behavior.

<TableOfContents></TableOfContents>

## Basic example

The `p-switch` component can be used with a visible or hidden label, but it's recommended to keep the label visible for
better accessibility whenever possible. A `label` is a caption which informs the user which action is followed by
interaction. When used with hidden label, it's best practice to provide a descriptive label text for screen readers.

<Playground :markup="hideLabelMarkup" :config="configInline">
  <PlaygroundSelect v-model="hideLabel" :values="hideLabels" name="hideLabel"></PlaygroundSelect>
</Playground>

## Framework Implementations

<Notification heading="Deprecation hint" heading-tag="h3" state="warning">
  The <code>switchChange</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>update</code> event instead.
</Notification>

<Playground :frameworkMarkup="frameworks"></Playground>

---

## Disabled

<Playground :markup="disabled" :config="configInline"></Playground>

---

## Loading

<Playground :markup="loading" :config="configInline"></Playground>

---

## Alignment + Stretch

The `label` can be aligned to the `end` (default) or to the `start` in addition with enabled `stretch` property which is
recommended on mobile views.

<Notification heading="Deprecation hint" heading-tag="h3" state="warning">
  Following alignments have been deprecated and will be removed with the next major release: "left" and "right".
</Notification>

<Playground :markup="alignLabelMarkup" :config="configInline">
  <PlaygroundSelect v-model="alignLabel" :values="alignLabels" name="alignLabel"></PlaygroundSelect>
</Playground>

---

## Compact

<Playground :markup="compact" :config="configInline"></Playground>

---

## Bind events

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the **Switch**.

<Playground :markup="events" :config="configInline"></Playground>

---

## Remove Switch from tab order

By setting the `tabindex` attribute to `-1` you can remove the **Switch** from the tab order.

<Playground :markup="taborder" :config="configInline"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ALIGN_LABELS, ALIGN_LABELS_DEPRECATED } from '../../utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };
  configInline = { ...this.config, spacing: 'inline' };

  frameworks = {
    'vanilla-js': `switchElement.addEventListener('update', (e) => {
  e.target.checked = e.detail.checked;
});`,
    angular: `import { Component } from '@angular/core';
import type { SwitchUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'some-switch-page',
  template: \`<p-switch [checked]="checked" (update)="onUpdate($event)">Some label</p-switch>\`,
})
export class SomeSwitchPage {
  checked: boolean;

  onUpdate(e: CustomEvent<SwitchUpdateEventDetail>) {
    this.checked = e.detail.checked;
  }
}`,
    react: `import { useCallback, useState } from 'react';
import { PSwitch } from '@porsche-design-system/components-react';
import type { SwitchUpdateEventDetail } from '@porsche-design-system/components-react';

const SomeSwitchPage = (): JSX.Element => {
  const [checked, setChecked] = useState<boolean>();
  const onUpdate = useCallback((e: CustomEvent<SwitchUpdateEventDetail>) => {
    setChecked(e.detail.checked);
  }, []);

  return <PSwitch checked={checked} onUpdate={onUpdate}>Some label</PSwitch>
}`,
  };

  hideLabel = false;
  hideLabels = [true, false, '{ base: true, l: false }'];
  get hideLabelMarkup() {
    return `<p-switch hide-label="${this.hideLabel}">Some label</p-switch>
<p-switch hide-label="${this.hideLabel}" checked="true">Some label</p-switch>`;
  };

  alignLabel = 'start';
  alignLabels = [...ALIGN_LABELS.map(item => ALIGN_LABELS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item), "{ base: 'start', l: 'end' }"];
  get alignLabelMarkup() {
    const attr = this.alignLabel.includes('base') ? ' stretch="{ base: true, l: false }"' : '';
    return `<p-switch align-label="${this.alignLabel}"${attr}>Some label</p-switch>
<p-switch align-label="${this.alignLabel}"${attr} checked="true">Some label</p-switch>`;
  };

  disabled = `<p-switch disabled="true">Some label</p-switch>
<p-switch disabled="true" checked="true">Some label</p-switch>`;

  loading = `<p-switch loading="true">Some label</p-switch>
<p-switch loading="true" checked="true">Some label</p-switch>`;

  compact = `<p-switch compact="true">Some label</p-switch>
<p-switch compact="true" checked="true">Some label</p-switch>`;

  events = `<p-switch
  onclick="alert('click')"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
>Some label</p-switch>`;

  taborder = `<p-switch>Some label</p-switch>
<p-switch tabindex="-1">Some label</p-switch>
<p-switch>Some label</p-switch>`;

  mounted() {
    /* initially update switch with checked attribute in playground */
    this.registerEvents();

    /* theme switch needs to register event listeners again */
    const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
    themeTabs.forEach(tab => tab.addEventListener('update', () => {
      this.registerEvents();
    }));
  }

  updated(){
    this.registerEvents();
  }

  registerEvents() {
    const switches = this.$el.querySelectorAll('.playground .demo p-switch');
    switches.forEach(switchEl => switchEl.addEventListener('update', (e) => (e.target.checked = e.detail.checked)));
  }
}
</script>
