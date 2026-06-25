<script setup lang="ts">
  import { ref } from 'vue';
  import { PButton, PHeading, PSheet, PText } from '@porsche-design-system/components-vue';

  const open = ref(false);

  const onClick = () => {
    open.value = true;
  }
  const onDismiss = () => {
    open.value = false;
  }
</script>

<template>
  <PButton type="button" :aria="{'aria-haspopup': 'dialog'}" @click="onClick">
    Open Sheet
  </PButton>

  <PSheet :open="open" :aria="{'aria-label': 'Some Heading'}" @dismiss="onDismiss">
    <PHeading slot="header" size="large" tag="h2">
      Some Heading
    </PHeading>
    <PText>
      Some Content
    </PText>
  </PSheet>
</template>
