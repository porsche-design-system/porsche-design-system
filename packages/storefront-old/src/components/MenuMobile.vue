<template>
  <p-flyout
    :theme="this.$store.getters.storefrontTheme"
    :open="this.$store.getters.isMenuActive"
    position="start"
    @dismiss="() => this.$store.commit('setIsMenuActive', false)"
  >
    <div class="menu-mobile">
      <VersionSelect />
      <Search />
      <Navigation />
      <Footer />
    </div>
  </p-flyout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Search from '@/components/Search.vue';
import Footer from '@/components/Footer.vue';
import Navigation from '@/components/Navigation.vue';
import VersionSelect from '@/components/VersionSelect.vue';

@Component({
  components: { VersionSelect, Navigation, Footer, Search },
})
export default class MenuMobile extends Vue {}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  p-flyout {
    @include pds-media-query-min('m') {
      display: none !important;
    }
  }

  .menu-mobile {
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-fluid-large;
  }
</style>
