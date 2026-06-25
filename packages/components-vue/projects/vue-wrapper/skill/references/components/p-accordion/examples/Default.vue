<script setup lang="ts">
  import { ref } from 'vue';
  import { PAccordion, PHeading, PText, type AccordionUpdateEventDetail } from '@porsche-design-system/components-vue';

  const open = ref(false);

  const onUpdate = (e: CustomEvent<AccordionUpdateEventDetail>) => {
    open.value = e.detail.open;
  }
</script>

<template>
  <PAccordion :open="open" @update="onUpdate">
    <PHeading slot="summary" tag="h2" size="small" weight="semibold">
      Some summary
    </PHeading>
    <PText>
      Some details. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore agna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </PText>
  </PAccordion>
</template>
