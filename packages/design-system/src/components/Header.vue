<template>
  <header class="header">
    <router-link class="link" :to="`/${encodeUrl(area)}`">
      <Marque />
    </router-link>
    <p-headline class="p-spacing-mt--16" type="headline-4" level="1">
      Porsche UI Kit
      <span v-show="area === 'app'">App</span>
    </p-headline>
    <p-text type="small">Current Release: v{{version}}</p-text>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Marque from '@/components/Marque.vue';
import { encodeUrl } from '@/services/utils';
// import {version} from '@porscheui/ui-kit-js/package.json';

@Component({
  components: {
    Marque
  }
})
export default class Header extends Vue {
  @Prop({ default: '' }) public area?: string;
  public encodeUrl = encodeUrl;

  get version() {
    return this.area === 'web' ? '1.0.0-alpha.2' : '1.0.0-alpha.1';
  }
}
</script>

<style scoped lang="scss">
@import '~@porscheui/ui-kit-js/src/styles/utility/index';

.header {
  text-align: center;
}

.link {
  display: inline-block;

  &:focus {
    outline: 1px solid $p-color-state-focus;
    outline-offset: 4px;
  }
}
</style>
