# Pagination

## Basic usage

To adapt the pagination to the specific viewport context, the amount of displayed page items varies between either `7` (desktop/tablet) or `5` (mobile). The components handles responsive viewport sizing by default.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-pagination :theme="theme" total-items-count="500" items-per-page="25" active-page="1"></p-pagination>
  </template>
</Playground>

### Max Number of Page Links: 7 (desktop)
<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-pagination :theme="theme" total-items-count="500" items-per-page="25" active-page="1" max-number-of-page-links="7"></p-pagination>
  </template>
</Playground>

### Max Number of Page Links: 5 (mobile)
<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-pagination :theme="theme" total-items-count="500" items-per-page="25" active-page="1" max-number-of-page-links="5"></p-pagination>
  </template>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-pagination :theme="theme" total-items-count="500" items-per-page="25" active-page="1" max-number-of-page-links="{ base: 5, s: 7 }"></p-pagination>
  </template>
</Playground>


--- 

## Behaviour playground
By changing values for total amount of items, items to display per page and number of currently active page, the behaviour of the pagination component can be changed.

<Playground :themeable="true">
  <template v-slot:configurator="{theme}">
    <label style="display:inline-block; margin-right: 16px;">
      <p-text tag="span" size="x-small" :theme="theme">Total items count</p-text>
      <input type="number" v-bind:value="totalItemsCount" v-on:input="totalItemsCount = $event.target.value"/>
    </label>
    <label style="display:inline-block; margin-right: 16px;">
      <p-text tag="span" size="x-small" :theme="theme">Items per page</p-text>
      <input type="number" v-bind:value="itemsPerPage" v-on:input="itemsPerPage = $event.target.value"/>
    </label>
    <label style="display:inline-block">
      <p-text tag="span" size="x-small" :theme="theme">Active page</p-text>
      <input ref="activePage" type="number" v-bind:value="activePage" v-on:input="activePage = $event.target.value"/>
    </label>
  </template>
  <template v-slot:default="{theme}">
    <p-pagination ref="paginationPlayground" :theme="theme" :total-items-count="totalItemsCount" :items-per-page="itemsPerPage" :active-page="activePage"></p-pagination>
  </template>
</Playground>

<script lang="ts">
  import Vue from 'vue';
import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundPagination extends Vue {
    public totalItemsCount:number = 500;
    public itemsPerPage:number = 25;
    public activePage:number = 1;
    
    mounted(){
      this.$refs.paginationPlayground.addEventListener('pageChange', (e) => {
        this.activePage = e.detail.page;
      });
    }
  }
</script>