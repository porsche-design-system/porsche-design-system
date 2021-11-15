# Notifications

## Toast

Review the [notification decision tree](components/notifications/decision-tree) to determine which notification component is best for a particular scenario.

// TODO: Hint about using it outside of routing if possible

## z-index Concept

| Component | z-index             |
| --------- | ------------------- |
| Banner    | {{zIndexes.banner}} |
| Toast     | {{zIndexes.toast}}  |
| Modal     | {{zIndexes.modal}}  |

## Basic

<Playground :frameworkMarkup="basic" :config="config" @onThemeChange="onThemeChange">
  <select v-model="state">
    <option disabled>Select a state</option>
    <option value="neutral">Neutral</option>
    <option value="success">Success</option>
  </select>
  <br><br>
  <button type="button" v-on:click="queueToast()">Queue Toast</button>
</Playground>

## Offset

The position of the `p-toast` can be adjusted via the `offset` property.

<Playground :markup="offsetMarkup" :config="{...config, withoutDemo: true}" @onThemeChange="onThemeChange">
  <input type="number" min="0" max="200" step="5" v-model="offset" @change="onOffsetChange">
</Playground>

<!-- shared across playgrounds -->
<p-toast ref="toast"></p-toast>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { getToastCodeSamples } from '@porsche-design-system/shared';
  import { componentsReady } from '@porsche-design-system/components-js';
  import { BANNER_Z_INDEX, MODAL_Z_INDEX, TOAST_Z_INDEX } from '@porsche-design-system/components/src/constants';
  import { defaultToastOffset } from '@porsche-design-system/components/src/components/feedback/toast/toast/toast-utils';
  import type { Theme } from '@/models';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };

    state = 'neutral';
    toastCounter = 1;
    offset = defaultToastOffset.bottom;

    zIndexes = {
      banner: BANNER_Z_INDEX,
      toast: TOAST_Z_INDEX,
      modal: MODAL_Z_INDEX,
    };
    
    get basic() { 
      return Object.entries(getToastCodeSamples()).reduce((result, [key, markup]) => ({
        ...result,
        [key]: markup
          .replace(/(state:) 'success'/, `$1 '${this.state}'`)
          .replace(/(Some) (message)/, `$1 ${this.state} $2`)
      }), {});
    }

    get offsetMarkup() {
      return `<p-toast offset="{ bottom: ${this.offset} }"></p-toast>`;
    }

    queueToast(): void {
      this.$refs.toast.addMessage({ message: `Some ${this.state.toLowerCase()} message ${this.toastCounter}`, state: this.state });
      this.toastCounter++;
    }

    onThemeChange(theme: Theme): void {
      this.$refs.toast.theme = theme;
    }

    onOffsetChange(): void {
      this.$refs.toast.offset = { bottom: this.offset };
    }
  }
</script>

<style lang="scss" scoped>
  button {
    padding: .5rem 1rem;
  }
</style>