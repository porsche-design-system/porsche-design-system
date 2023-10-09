# Toast

The `p-toast` component manages both the queue and display of toast messages.  
Therefore, you can only have a single instance of this component within in your application. We recommend rendering it
close to the `body`, e.g., in your `App.tsx` or `app.component.ts`. This way you reduce the chance of having issues with
its z-index and fixed positioning.

Review the [notification decision tree](patterns/notifications/decision-tree) to determine which notification component
is best for a particular scenario.

<TableOfContents></TableOfContents>

## Basic

Queuing messages on `p-toast` component happens via its `addMessage()` method.  
For Angular users, we offer the injectable `ToastManager` service, for React, there is the `useToastManager()` hook.  
Both expose the `addMessage()` method, which needs to be called with a parameter that has the following structure:

```ts
type ToastMessage = {
  text: string;
  state?: 'info' | 'success';
};
```

<Notification heading="Deprecation hint" state="warning">
  Following state has been deprecated and will be removed with the next major release: "neutral".
</Notification>

<Playground :frameworkMarkup="stateMarkup" :config="config">
  <SelectOptions v-model="state" :values="states" name="state"></SelectOptions>
  <br><br>
  <label>
    Text:&nbsp;
    <input type="text" v-model="toastText">
  </label>
  <br><br>
  <p-button type="button" :theme="theme" @click="queueToast()">Queue Toast</p-button>
  <!-- shared across playgrounds -->
  <p-toast ref="toast" :theme="theme" :style="`--p-toast-position-bottom: ${positionBottom}px`"></p-toast>
</Playground>

### <A11yIcon></A11yIcon> Accessibility hints

By their very nature, toast components are **not fully accessibility compliant** and do not meet success criterion 2.2.1
("Timing Adjustable") because of the default timing of 6 seconds until it automatically disappears. This behavior cannot
be adjusted and could result in users not being able to interact with Web content in a reasonable amount of time. So be
careful **not to use toast messages for relevant information**. Content and user interactions should always be
understandable and usable without a toast message.

## Position

The bottom position of the `p-toast` can be adjusted via the `--p-toast-position-bottom` CSS variable.

<Playground :markup="offsetMarkup" :config="{...config, withoutDemo: true}">
  <label>
    Position Bottom
    <input type="number" min="0" max="200" step="5" v-model="positionBottom">
  </label>
  <br><br>
  <p-button type="button" :theme="theme" @click="queueToast()">Queue Toast</p-button>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getToastCodeSamples } from '@porsche-design-system/shared';
import type { Theme } from '@/models';
import { TOAST_STATES, TOAST_STATES_DEPRECATED } from './toast/toast-utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true };
  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  toastText = 'Some message';
  toastCounter = 1;
  positionBottom = 64;
  
  state = 'info';
  states = TOAST_STATES.map(item => TOAST_STATES_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get stateMarkup() { 
    return Object.entries(getToastCodeSamples()).reduce((result, [key, markup]) => ({
      ...result,
      [key]: markup
        .replace(/(state:) 'success'/, `$1 '${this.state}'`)
        .replace(/(Some message)/, this.toastText)
    }), {});
  }

  get offsetMarkup() {
    return `<p-toast style="--p-toast-position-bottom: ${this.positionBottom}px"></p-toast>`;
  }

  queueToast(): void {
    this.$refs.toast.addMessage({ text: `${this.toastText} ${this.toastCounter}`, state: this.state });
    this.toastCounter++;
  }
}
</script>

<style lang="scss" scoped>
  button {
    padding: .5rem 1rem;
  }
  .example--dark label {
    color: white
  }
</style>
