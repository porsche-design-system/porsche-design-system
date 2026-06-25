<script setup lang="ts">
  import { ref } from 'vue';
  import { PButton, PModal } from '@porsche-design-system/components-vue';

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

  <PModal :open="open" backdrop="shading" :aria="{'aria-label': 'Some Label'}" class="[--p-modal-width:clamp(276px,45.25vw+131px,1000px)] [--p-modal-spacing-top:200px] [--p-modal-spacing-bottom:50px]" @dismiss="onDismiss">
    <img src="assets/porsche-992-carrera-s.jpg" class="-mt-(--ref-p-modal-pt) -mx-(--ref-p-modal-px) -mb-(--ref-p-modal-pb) max-w-(--p-modal-width) rounded-xl" />
  </PModal>
</template>
