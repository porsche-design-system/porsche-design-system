<template>
  <Markdown>
    <component :is="license" v-if="license"></component>
  </Markdown>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Markdown from '@/components/Markdown.vue';

  @Component({
    components: {
      Markdown,
    },
  })
  export default class License extends Vue {

    private license: any = null;

    private async mounted(): Promise<void> {
      const empty = '';
      this.license = (await (() => import(`@/pages/${empty}license.md`))()).default;
    }
  }
</script>
