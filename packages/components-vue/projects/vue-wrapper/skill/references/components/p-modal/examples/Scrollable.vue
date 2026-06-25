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

  <PModal :open="open" :aria="{'aria-label': 'Some Heading'}" @dismiss="onDismiss">
    <PHeading slot="header" size="large" tag="h2">
      Some Heading
    </PHeading>
    <PText>
      Some Content Begin
    </PText>
    <div class="w-[10px] h-[120vh] bg-[deeppink]"></div>
    <PText>
      Some Content End
    </PText>
    <div slot="footer" role="group" class="flex flex-wrap gap-fluid-sm max-xs:flex-col">
      <PButton type="button">
        Proceed
      </PButton>
      <PButton type="button" variant="secondary">
        Cancel
      </PButton>
    </div>
  </PModal>
</template>
