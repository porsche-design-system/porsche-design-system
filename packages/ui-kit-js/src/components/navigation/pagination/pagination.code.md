# Pagination

## Introduction
The pagination is the component of choice primarily to navigate through listed content (e.g. search results, archives etc.).

## Basic usage
<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-pagination :theme="slotProps.theme" total-items-count="500" items-per-page="25" active-page="1"></p-pagination>
  </template>
</Playground>

## Differences in mobile and Tablet/Desktop viewports
To correctly display the pagination in different viewport sizes, the maximum amount of page links displayed is meant to be reduced for lower resolutions.
Currently the maximum number is either `7` (desktop/tablet) or `5` (mobile). The components handles viewport sizing internally by default.
To adapt the maximum number of page links for smaller screens for individual breakpoints, the `page-range` property can be changed to `1` (desktop default) or `0` (mobile).

### Page range: auto (default)
<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-pagination :theme="slotProps.theme" total-items-count="500" items-per-page="25" active-page="1"></p-pagination>
  </template>
</Playground>

### Page range: desktop
<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-pagination :theme="slotProps.theme" total-items-count="500" items-per-page="25" active-page="1" page-range="1"></p-pagination>
  </template>
</Playground>

### Page range: mobile
<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-pagination :theme="slotProps.theme" total-items-count="500" items-per-page="25" active-page="1" page-range="0"></p-pagination>
  </template>
</Playground>

### Logical behaviour of pagination items

#### More than 7 items
```
{1}[2][3][...][10]
[1]{2}[3][...][10]
[1][2]{3}[...][10]
[1][...]{4}[...][10]
[1][...]{5}[...][10]
[1][...]{6}[...][10]
[1][...]{7}[...][10]
[1][...]{8}[9][10]
[1][...][8]{9}[10]
[1][...][8][9]{10}

```
```
{} := current page
```

## Playground
Test pagination behaviour by changing values for total amount of items, items to display per page and number of currently active page.

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-input class="p-spacing-mr-16 p-spacing-mb-24" label="Total items count" type="number" v-bind:value="totalItemsCount" v-on:input="totalItemsCount = $event.target.value"></p-input>
    <p-input class="p-spacing-mr-16 p-spacing-mb-24" label="Items per page" type="number" v-bind:value="itemsPerPage" v-on:input="itemsPerPage = $event.target.value"></p-input>
    <p-input class="p-spacing-mb-24" label="Active page" type="number" v-bind:value="activePage" v-on:input="activePage = $event.target.value"></p-input>
    <p-pagination :theme="slotProps.theme" :total-items-count="totalItemsCount" :items-per-page="itemsPerPage" :active-page="activePage"></p-pagination>
  </template>
</Playground>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  
  @Component
  export default class FooBar extends Vue {
    @Prop({ default: 500 }) public value: number;
    
    public totalItemsCount:number = 500;
    public itemsPerPage:number = 25;
    public activePage:number = 1;
    
  }
</script>