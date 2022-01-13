# Switch

The `p-switch` component is a control that is used to quickly switch between two possible states. 
A switch is only used for these binary actions that occur immediately after the user “flips the switch”. 
Commonly it is used for “on/off” state.

It is a controlled component.
This means it does not contain any internal state, and you got full control over its behavior.

<TableOfContents></TableOfContents>

## Basic example

The `p-switch` component can be used with a visible or hidden label, but it's recommended to keep the label visible for better accessibility whenever possible.
A `label` is a caption which informs the user which action is followed by interaction.
When used with hidden label, it's best practice to provide a descriptive label text for screen readers.

<Playground :markup="basic" :config="config">
  <select v-model="label">
    <option value="show">With label</option>
    <option value="hide">Without label</option>
    <option value="responsive">Responsive</option>
  </select>
</Playground>

## Framework Implementations

<Playground :frameworkMarkup="frameworks"></Playground>

---

## Disabled

<Playground :markup="disabled" :config="config"></Playground>

---

## Loading

<Playground :markup="loading" :config="config"></Playground>

---

## Alignment + Stretch

The `label` can be aligned to the `right` (default) or to the `left` in addition with enabled `stretch` property which is recommended on mobile views.

<Playground :markup="alignment" :config="config">
  <select v-model="alignLabel">
    <option value="right">Right</option>
    <option value="left">Left</option>
    <option value="responsive">Responsive</option>
  </select>
</Playground>

---

## Bind events
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the **Switch**.

<Playground :markup="events" :config="config"></Playground>

---

## Remove Switch from tab order

**NOTICE:** The property `tabbable` is deprecated since v2.8.0 and will be removed in v3.0.0.

By setting the `tabindex` attribute to `-1` you can remove the **Switch** from the tab order.

<Playground :markup="taborder" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };

  frameworks = {
    'vanilla-js': `switchElement.addEventListener('switchChange', (e) => {
  e.target.checked = e.detail.checked;
});`,
    angular: `import { Component } from '@angular/core';
import type { SwitchChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'some-switch-page',
  template: \`<p-switch [checked]="checked" (switchChange)="onSwitchChange($event)">Some label</p-switch>\`,
})
export class SomeSwitchPage {
  checked: boolean;

  onSwitchChange(e: CustomEvent<SwitchChangeEvent>) {
    this.checked = e.detail.checked;
  }
}`,
    react: `import { useCallback, useState } from 'react';
import { PSwitch } from '@porsche-design-system/components-react';
import type { SwitchChangeEvent } from '@porsche-design-system/components-react';

const SomeSwitchPage = (): JSX.Element => {
  const [checked, setChecked] = useState<boolean>();
  const onSwitchChange = useCallback((e: CustomEvent<SwitchChangeEvent>) => {
    setChecked(e.detail.checked);
  }, []);

  return <PSwitch checked={checked} onSwitchChange={onSwitchChange}>Some label</PSwitch>
}`,
  };

  label = 'show';
  alignLabel = 'right';

  get basic() {
    const hideLabel = this.label === 'hide' ? ' hide-label="true"' : this.label === 'responsive' ? ' hide-label="{ base: true, l: false }"' : '';
    return `<p-switch${hideLabel}>Some label</p-switch>
<p-switch${hideLabel} checked="true">Some label</p-switch>`;
  };

  get alignment() {
    const alignLabel = this.alignLabel === 'left' ? ' align-label="left"' : this.alignLabel === 'responsive' ? ' align-label="{ base: \'left\', l: \'right\' }"  stretch="{ base: true, l: false }"' : '';
    return `<p-switch${alignLabel}>Some label</p-switch>
<p-switch${alignLabel} checked="true">Some label</p-switch>`;
  };

  disabled = `<p-switch disabled="true">Some label</p-switch>
<p-switch disabled="true" checked="true">Some label</p-switch>`;

  loading = `<p-switch loading="true">Some label</p-switch>
<p-switch loading="true" checked="true">Some label</p-switch>`;

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
    themeTabs.forEach(tab => tab.addEventListener('tabChange', () => {
      this.registerEvents();
    }));
  }

  updated(){
    this.registerEvents();
  }

  registerEvents() {
    const switches = this.$el.querySelectorAll('.playground .demo p-switch');
    switches.forEach(switchEl => switchEl.addEventListener('switchChange', (e) => (e.target.checked = e.detail.checked)));
  }
}
</script>
