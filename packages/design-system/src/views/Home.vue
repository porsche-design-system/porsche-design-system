<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <Accessibility/>
  </div>
</template>

<script>
  import Accessibility from '../pages/basics/accessibility.mdx';

  export default {
    name: 'app',
    components: {
      Accessibility,
    },
  };
</script>
