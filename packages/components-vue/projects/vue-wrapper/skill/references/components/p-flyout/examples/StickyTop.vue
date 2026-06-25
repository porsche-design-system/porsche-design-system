<script setup lang="ts">
  import { ref } from 'vue';
  import { PButton, PFlyout, PHeading, PText } from '@porsche-design-system/components-vue';

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
    Open Flyout
  </PButton>

  <PFlyout :open="open" :aria="{'aria-label': 'Some Heading'}" @dismiss="onDismiss">
    <PHeading slot="header" size="large" tag="h2">
      Some Heading
    </PHeading>
    <div class="grid grid-cols-[2fr_1fr] gap-static-md items-start">
      <div class="sticky top-[calc(var(--p-flyout-sticky-top,0)+16px)] p-static-md bg-surface">
        Some sticky element within content relying on --p-flyout-sticky-top
      </div>
      <div>
        <PText>
          Some Content Begin
        </PText>
        <div class="w-[10px] h-[120vh] bg-[deeppink]"></div>
        <PText>
          Some Content End
        </PText>
      </div>
    </div>
  </PFlyout>
</template>
