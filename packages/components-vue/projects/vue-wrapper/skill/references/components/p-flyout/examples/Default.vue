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
    <PText>
      Some Content
    </PText>
    <div slot="footer">
      <PButton type="button">
        Proceed
      </PButton>
      <PButton type="button" variant="secondary">
        Cancel
      </PButton>
    </div>
    <PText slot="sub-footer">
      Some additional Sub-Footer
    </PText>
  </PFlyout>
</template>
