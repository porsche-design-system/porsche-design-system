# Switch

The **Switch** component is a control that is used to quickly switch between two possible states. 
A switch is only used for these binary actions that occur immediately after the user “flips the switch”. 
Commonly it is used for “on/off” state.

## Basic example

The **Switch** component can be used with a visible or hidden label, but it's recommended to keep the label visible for better accessibility whenever possible.
A `label` is a caption which informs the user which action is followed by interaction.
When used with hidden label, it's best practice to provide a descriptive label text for screen readers.

<Playground :markup="basic" :config="config">
  <select v-model="label">
    <option value="show">With label</option>
    <option value="hide">Without label</option>
    <option value="responsive">Responsive</option>
  </select>
</Playground>

**Switch** is a component which does not work by itself and needs to be controlled from the outside.
This grants you flexible control over the `checked` state.

In order to get notified when `checked` state changes, you need to register an event listener for the `switchChange` event which is emitted by **Switch**.

### Vanilla JS

```js
switchElement.addEventListener('switchChange', (switchChangeEvent) => {
  const { checked } = switchChangeEvent.detail;
  switchChangeEvent.target.setAttribute('checked', checked);
});
```

### Angular

```ts
import { Component } from '@angular/core';
import type { SwitchChangeEvent } from '@porsche-design-system/components-angular';

@Component({
  selector: 'some-switch-page',
  template: `<p-switch [checked]="checked" (switchChange)="handleSwitchChange($event)">Some label</p-switch>`,
})
export class SomeSwitchPage {
  checked: boolean;

  handleSwitchChange(e: CustomEvent<SwitchChangeEvent>) {
    const { checked } = e.detail;
    this.checked = checked;
  }
}
```

### React

```tsx
import { useCallback, useState } from 'react';
import { PSwitch } from '@porsche-design-system/components-react';
import type { SwitchChangeEvent } from '@porsche-design-system/components-react';

const SomeSwitchPage = (): JSX.Element => {
  const [checked, setChecked] = useState<boolean>();
  const handleSwitchChange = useCallback((e: CustomEvent<SwitchChangeEvent>) => {
    const { checked } = e.detail;
    setChecked(checked);
  }, []);

  return <PSwitch checked={checked} onSwitchChange={handleSwitchChange}>Some label</PSwitch>
}
```

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

## Remove from tab order
With setting the `tabbable` property to `false` you can remove the **Switch** from the tab order.
For technical restrictions it's currently not possible to set an individual `tabindex` attribute.

<Playground :markup="taborder" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };

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

  taborder = `<p-switch tabbable="false">Some label</p-switch>
<p-switch tabbable="true">Some label</p-switch>`;

  mounted() {
    /* initially update switch with checked attribute in playground */
    this.registerEvents();

    /* theme switch needs to register event listeners again */
    const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
    themeTabs.forEach(tabs => tabs.addEventListener('tabChange', (e) => {
      this.registerEvents();
    }));
  }

  updated(){
    this.registerEvents();
  }

  registerEvents() {
    const switches = this.$el.querySelectorAll('.playground .demo p-switch');
    switches.forEach(switchEl => switchEl.addEventListener('switchChange', this.handleSwitchChange));
  }

  handleSwitchChange =  (e: CustomEvent) => {
    const { checked } = e.detail;
    e.target.setAttribute('checked', checked);
  }
}
</script>
