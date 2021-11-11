# Notifications

## Toast

Review the [notification decision tree](components/notifications/decision-tree) to determine which notification component is best for a particular scenario.

// TODO: Hint about using it outside of routing if possible

## Basic

<Playground :frameworkMarkup="basic" :config="config">
  <select v-model="state">
    <option disabled>Select a state</option>
    <option value="neutral">Neutral</option>
    <option value="success">Success</option>
  </select><br><br>
  <button id="addToastButton" type="button">Add Toast</button>
  <p-toast></p-toast>
</Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { getToastCodeSamples } from '@porsche-design-system/shared';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };

    state = 'neutral';
    
    get basic() { 
      return Object.entries(getToastCodeSamples()).reduce((result, [key, markup]) => ({
        ...result,
        [key]: markup.replace(/(state:) 'success'/, `$1 '${this.state}'`)
      }), {});
    }

    mounted(): void {
      document.querySelector('#addToastButton').addEventListener('click', (e) => {
        const toast = e.target.nextElementSibling;
        toast.getManager().then((manager) => manager.addToast({ message: 'Some message', state: this.state }));
      });
    }
  }
</script>

<style lang="scss" scoped>
  button {
    padding: .5rem 1rem;
  }
</style>