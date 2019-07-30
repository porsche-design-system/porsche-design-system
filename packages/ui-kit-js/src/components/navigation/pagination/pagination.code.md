# Pagination

## Introduction
The pagination is the component of choice primarily to navigate through listed content (e.g. search results, archives etc.).

## Basic usage
<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-pagination :theme="theme" total-items-count="500" items-per-page="25" active-page="1"></p-pagination>
  </template>
</Playground>

## Differences in mobile and Tablet/Desktop viewports
To correctly display the pagination in different viewport sizes, the maximum amount of page links displayed is meant to be reduced for lower resolutions.
Currently the maximum number is either `7` (desktop/tablet) or `5` (mobile). The components handles viewport sizing internally by default.
To adapt the maximum number of page links for smaller screens for individual breakpoints, the `page-range` property can be changed to `1` (desktop default) or `0` (mobile).

### Page range: auto (default)
<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-pagination :theme="theme" total-items-count="500" items-per-page="25" active-page="1"></p-pagination>
  </template>
</Playground>

### Page range: large (desktop)
<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-pagination :theme="theme" total-items-count="500" items-per-page="25" active-page="1" page-range="large"></p-pagination>
  </template>
</Playground>

### Page range: small (mobile)
<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-pagination :theme="theme" total-items-count="500" items-per-page="25" active-page="1" page-range="small"></p-pagination>
  </template>
</Playground>

--- 

## Playground
Test pagination behaviour by changing values for total amount of items, items to display per page and number of currently active page.

<Playground :themeable="true">
  <template v-slot:configurator="{theme}">
    <label class="p-spacing-mr-16" style="display:inline-block">
      <p-text tag="span" variant="small" :color="(theme === 'dark') ? 'porsche-light' : 'porsche-black'">Total items count</p-text>
      <input type="number" v-bind:value="totalItemsCount" v-on:input="totalItemsCount = $event.target.value"/>
    </label>
    <label class="p-spacing-mr-16" style="display:inline-block">
      <p-text tag="span" variant="small" :color="(theme === 'dark') ? 'porsche-light' : 'porsche-black'">Items per page</p-text>
      <input type="number" v-bind:value="itemsPerPage" v-on:input="itemsPerPage = $event.target.value"/>
    </label>
    <label style="display:inline-block">
      <p-text tag="span" variant="small" :color="(theme === 'dark') ? 'porsche-light' : 'porsche-black'">Active page</p-text>
      <input ref="activePage" type="number" v-bind:value="activePage" v-on:input="activePage = $event.target.value"/>
    </label>
  </template>
  <template v-slot:default="{theme}">
    <p-pagination ref="paginationPlayground" :theme="theme" :total-items-count="totalItemsCount" :items-per-page="itemsPerPage" :active-page="activePage"></p-pagination>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundPagination extends Vue {
    public totalItemsCount:number = 500;
    public itemsPerPage:number = 25;
    public activePage:number = 1;
    
    mounted(){
      this.$refs.paginationPlayground.addEventListener('pClick', (e, page) => {
        this.activePage = e.detail.page;
      });
    }
  }
</script>