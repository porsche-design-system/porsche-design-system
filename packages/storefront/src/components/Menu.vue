<template>
  <p-button-pure
    :theme="$store.getters.platformTheme"
    v-if="variant === 'open'"
    icon="menu-lines"
    hide-label="true"
    @click="toggleMenuVisibility()"
    >Open menu</p-button-pure
  >
  <p-button v-else theme="dark" variant="secondary" hide-label="true" icon="close" @click="toggleMenuVisibility()"
    >Close menu</p-button
  >
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class Menu extends Vue {
    @Prop({ default: 'open' }) public variant!: 'open' | 'close';

    public toggleMenuVisibility(): void {
      this.$store.commit('toggleIsMenuActive');
    }
  }
</script>
