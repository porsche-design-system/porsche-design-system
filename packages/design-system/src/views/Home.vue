<template>
  <div>
    <BrowserCompatibility/>
    <Playground>
      <template v-slot="slotProps">
        <p-button-regular :variant="slotProps.theme">Hello World</p-button-regular>
      </template>
    </Playground>
    <img alt="Vue logo" src="../assets/logo.png">
    <Accessibility/>
  </div>
</template>

<script>
  import Accessibility from '../pages/basics/accessibility.mdx';
  import BrowserCompatibility from '../pages/basics/browser-compatibility.md';
  import Playground from '@/components/Playground.vue';

  export default {
    name: 'app',
    components: {
      Accessibility,
      Playground,
      BrowserCompatibility,
    },
  };
</script>
