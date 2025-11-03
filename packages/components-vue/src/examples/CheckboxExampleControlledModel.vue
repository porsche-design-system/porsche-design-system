<template>
  <PCheckbox
    v-model:checked="form.myCheckbox"
    :name="'myCheckbox'"
    :label="'Some Label'"
  />

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ form.myCheckbox }}</span></div>
</template>

<script setup lang="ts">
import { PCheckbox } from '@porsche-design-system/components-vue';
import { reactive } from 'vue';

const form = reactive({
  myCheckbox: false,
});

const resetValue = () => {
  form.myCheckbox = false;
};
</script>
