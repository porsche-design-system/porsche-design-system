<template>
  <PRadioGroup v-model:value="myRadioGroup" :name="'myRadioGroup'" :label="'Some Label'">
    <PRadioGroupOption label="Option A" :value="'a'"></PRadioGroupOption>
    <PRadioGroupOption label="Option B" :value="'b'"></PRadioGroupOption>
    <PRadioGroupOption label="Option C" :value="'c'"></PRadioGroupOption>
    <PRadioGroupOption label="Option D" :value="'d'"></PRadioGroupOption>
    <PRadioGroupOption label="Option E" :value="'e'"></PRadioGroupOption>
    <PRadioGroupOption label="Option F" :value="'f'"></PRadioGroupOption>
  </PRadioGroup>

  <button type="button" @click="resetValue">Reset</button>

  <div>Value: <span data-field="value">{{ myRadioGroup }}</span></div>
</template>

<script setup lang="ts">
import { PRadioGroup, PRadioGroupOption } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const myRadioGroup = ref('');

const resetValue = () => {
  myRadioGroup.value = '';
};
</script>
