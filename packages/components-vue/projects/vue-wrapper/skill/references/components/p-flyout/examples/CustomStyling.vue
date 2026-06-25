<script setup lang="ts">
  import { ref } from 'vue';
  import { PButton, PButtonPure, PDisplay, PFlyout, PText } from '@porsche-design-system/components-vue';

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

  <PFlyout :open="open" :aria="{'aria-label': 'Some Heading'}" footerBehavior="fixed" class="[--p-flyout-width:90vw]" @dismiss="onDismiss">
    <div class="-mt-(--ref-p-flyout-pt) -mx-(--ref-p-flyout-px) h-[300px]">
      <img class="w-full h-full object-cover" src="assets/lights.jpg" alt="Some image description" />
    </div>
    <PDisplay class="mt-fluid-md" size="small" tag="h2">
      Some heading
    </PDisplay>
    <PText class="mt-fluid-sm">
      Some paragraph.
    </PText>
    <div slot="footer" class="grid grid-cols-[auto_1fr_auto] gap-static-sm justify-items-center">
      <PButtonPure icon="arrow-left" type="button" :hideLabel="true">
        Prev
      </PButtonPure>
      <PText>
        1/4
      </PText>
      <PButtonPure icon="arrow-right" type="button" :hideLabel="true">
        Next
      </PButtonPure>
    </div>
  </PFlyout>
</template>
