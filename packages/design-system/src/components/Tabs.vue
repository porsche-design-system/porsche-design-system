<template>
  <div class="tabs">
    <nav class="nav">
      <ul>
        <li v-for="tab in tabs" :class="{'is-active': tab.isActive}">
          <span @click="selectTab(tab)">{{tab.name}}</span>
        </li>
      </ul>
    </nav>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Tabs extends Vue {

    public tabs: any[] = [];

    public created(): void {
      this.tabs = this.$children;
    }

    public selectTab(selectedTab: any): void {
      for (const tab of this.tabs) {
        tab.isActive = tab.name === selectedTab.name;
      }
    }
  }
</script>

<style scoped lang="scss">
  .is-active {
    color: red;
  }
</style>
