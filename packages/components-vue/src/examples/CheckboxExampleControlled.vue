<script setup lang="ts">
  import { PCheckbox, PText, type CheckboxUpdateEventDetail } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const state = ref<{ [key: string]: boolean }>({
    'some-name': true,
  });

  const onUpdate = (e: CheckboxUpdateEventDetail) => {
    state.value[e.name] = e.checked;
  };
</script>

<template>
  <PCheckbox
    :name="'some-name'"
    :label="'Some Label'"
    :checked="state['some-name']"
    :value="'some-value'"
    @update="onUpdate"
  />
  <PText>some-name: {{ state['some-name'] }}</PText>
</template>
