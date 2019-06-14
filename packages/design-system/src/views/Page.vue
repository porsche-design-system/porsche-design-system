<template>
  <component v-if="page" :is="page"></component>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';

  @Component
  export default class Page extends Vue {

    private page = null;

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.updateComponent();
    }

    private async created(): Promise<void> {
      await this.updateComponent();
    }

    private async updateComponent(): Promise<void> {
      this.page = (await import(`@/pages/${this.$route.params.page}.md`)).default;
    }
  }
</script>
