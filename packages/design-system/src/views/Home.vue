<template>
  <div>
    <BrowserCompatibility/>
    <Playground>
      <template v-slot="slotProps">
        <p-button-regular :variant="slotProps.theme">Hello World</p-button-regular>
      </template>
    </Playground>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
  import BrowserCompatibility from '../pages/basics/browser-compatibility.md';
  import Playground from '@/components/Playground.vue';

  export default {
    name: 'app',
    components: {
      Playground,
      BrowserCompatibility,
    },
  };
</script>
