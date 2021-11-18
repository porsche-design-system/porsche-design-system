# Notifications

## Toast

Review the [notification decision tree](components/notifications/decision-tree) to determine which notification component is best for a particular scenario.

// TODO: Hint about using it outside of routing if possible


## Basic

<Playground :frameworkMarkup="basic" :config="config" @onThemeChange="onThemeChange">
  <label>
    State:
    <select v-model="toastState">
      <option disabled>Select a state</option>
      <option value="neutral">Neutral</option>
      <option value="success">Success</option>
    </select>
  </label>
  <br><br>
  <label>
    Text:&nbsp;
    <input type="text" v-model="toastText">
  </label>
  <br><br>
  <button type="button" v-on:click="queueToast()">Queue Toast</button>
</Playground>

## Offset

The position of the `p-toast` can be adjusted via the `offset` property.

<Playground :markup="offsetMarkup" :config="{...config, withoutDemo: true}" @onThemeChange="onThemeChange">
  <label>
    Offset Bottom
    <input type="number" min="0" max="200" step="5" v-model="offsetBottom" @change="onOffsetChange">
  </label>
  <br><br>
  <button type="button" v-on:click="queueToast()">Queue Toast</button>
</Playground>

<!-- shared across playgrounds -->
<p-toast ref="toast"></p-toast>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { getToastCodeSamples } from '@porsche-design-system/shared';
  import { defaultToastOffset } from '@porsche-design-system/components/src/components/feedback/toast/toast/toast-utils';
  import type { Theme } from '@/models';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };

    toastState = 'neutral';
    toastText = 'Some message';
    toastCounter = 1;
    offsetBottom = defaultToastOffset.s;
    
    get basic() { 
      return Object.entries(getToastCodeSamples()).reduce((result, [key, markup]) => ({
        ...result,
        [key]: markup
          .replace(/(state:) 'success'/, `$1 '${this.toastState}'`)
          .replace(/(Some message)/, this.toastText)
      }), {});
    }

    get offsetMarkup() {
      return `<p-toast offset-bottom="${this.offsetBottom}"></p-toast>`;
    }

    queueToast(): void {
      this.$refs.toast.addMessage({ text: `${this.toastText} ${this.toastCounter}`, state: this.toastState });
      this.toastCounter++;
    }

    onThemeChange(theme: Theme): void {
      this.$refs.toast.theme = theme;
    }

    onOffsetChange(): void {
      this.$refs.toast.offsetBottom = this.offsetBottom;
    }
  }
</script>

<style lang="scss" scoped>
  button {
    padding: .5rem 1rem;
  }
</style>