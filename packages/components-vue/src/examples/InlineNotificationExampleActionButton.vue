<script setup lang="ts">
import { PInlineNotification } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isLoading = ref(false);
const onAction = (): void => {
  isLoading.value = !isLoading.value;
};
</script>

<template>
  <PInlineNotification
    :heading="'Some heading'"
    :headingTag="'h4'"
    :description="'Some description.'"
    :actionLabel="'Retry'"
    :actionIcon="'reset'"
    :actionLoading="isLoading"
    @action="onAction"
  ></PInlineNotification>
  <button type="button" @click="onAction">Reset `actionLoading`</button>
</template>
