<template>
  <p-button-pure
    :theme="this.$store.getters.storefrontTheme"
    icon="menu-lines"
    hide-label="true"
    @click="() => this.$store.commit('setIsMenuActive', true)"
    >Open menu</p-button-pure
  >
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class OpenMenuButton extends Vue {}
</script>
