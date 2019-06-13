<template>
  <header>
    <router-link to="/">
      <Logo/>
    </router-link>
    <h1>Porsche UI Kit</h1>
    <p>Current Release: v1.0.0-alpha.1</p>
  </header>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Logo from '@/components/Logo.vue';

  @Component({
    components: {
      Logo,
    },
  })
  export default class Header extends Vue {}
</script>

<style scoped lang="scss">
  img {
    width: 100px;
  }
</style>
