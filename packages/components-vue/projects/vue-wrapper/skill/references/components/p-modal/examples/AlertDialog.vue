<script setup lang="ts">
  import { ref } from 'vue';
  import { PButton, PHeading, PModal, PText } from '@porsche-design-system/components-vue';

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
    Open Modal
  </PButton>

  <PModal :open="open" :aria="{'role': 'alertdialog'}" :disableBackdropClick="true" @dismiss="onDismiss">
    <PHeading slot="header" size="large" tag="h2">
      Some important Heading
    </PHeading>
    <PText>
      Some important Content
    </PText>
    <div slot="footer" role="group" class="flex flex-wrap gap-fluid-sm max-xs:flex-col">
      <PButton type="button">
        Accept
      </PButton>
      <PButton type="button" variant="secondary">
        Deny
      </PButton>
    </div>
  </PModal>
</template>
