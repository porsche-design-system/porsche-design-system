<template>
  <p-button
    theme="dark"
    variant="secondary"
    hide-label="true"
    icon="close"
    @click="toggleMenuVisibility()"
    >Close menu</p-button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Menu extends Vue {
    public toggleMenuVisibility(): void {
      this.$store.commit('toggleIsMenuActive');
    }
  }
</script>
