<template>
  <div>
    <h1>Component</h1>
    <Tabs>
      <Tab name="Design" :selected="true">design</Tab>
      <Tab name="Code">code</Tab>
      <Tab name="Props">props</Tab>
    </Tabs>
  </div>
</template>

<script lang="js">
  import {Component, Vue} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import Tab from '@/components/Tab.vue';

  @Component({
    components: {
      Tabs,
      Tab,
    },
  })
  export default class Page extends Vue {}
</script>
