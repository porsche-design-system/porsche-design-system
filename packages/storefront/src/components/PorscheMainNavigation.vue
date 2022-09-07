<template>
  <div>
    <script type="module" src="//nav.porsche.com/00BC524/porsche-navigation.esm.js"></script>
    <phn-header locale="en-US" page-name="home" env="production"></phn-header>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class PorscheMainNavigation extends Vue {}
</script>
