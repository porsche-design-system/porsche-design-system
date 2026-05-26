<script setup lang="ts">
import { PButton, PInlineNotification } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isActive = ref(false);
const onShow = (): void => {
  isActive.value = true;
};
const onDismiss = (): void => {
  isActive.value = false;
};
</script>

<template>
  <PButton :type="'button'" :compact="true" @click="onShow">Show Inline Notification</PButton>
  <PInlineNotification
    v-if="isActive"
    :heading="'Some heading'"
    :headingTag="'h4'"
    :description="'Some description.'"
    @dismiss="onDismiss"
  ></PInlineNotification>
</template>
