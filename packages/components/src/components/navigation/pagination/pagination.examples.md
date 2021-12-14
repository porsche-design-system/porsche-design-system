# Pagination

<TableOfContents></TableOfContents>

## Basic usage

To adapt the pagination to the specific viewport context, the amount of displayed page items varies between either `7` (desktop/tablet) or `5` (mobile). The components handles responsive viewport sizing by default.

<Playground :markup="basic()" :config="config"></Playground>

### Max Number of Page Links: 7 (desktop)

<Playground :markup="basic('7')" :config="config"></Playground>

### Max Number of Page Links: 5 (mobile)

<Playground :markup="basic('5')" :config="config"></Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="basic('{ base: 5, s: 7 }')" :config="config"></Playground>

--- 

## Behaviour playground
By changing values for total amount of items, items to display per page and number of currently active page, the behaviour of the pagination component can be changed.

<Playground class="playground-pagination" :markup="behaviour" :config="config">
  <template v-slot:default="{ theme }">
    <label style="display:inline-block; margin-right: 16px;">
      <p-text :theme="theme" tag="span" size="x-small">Total items count</p-text>
      <input type="number" v-bind:value="totalItemsCount" v-on:input="totalItemsCount = $event.target.value" />
    </label>
    <label style="display:inline-block; margin-right: 16px;">
      <p-text :theme="theme" tag="span" size="x-small">Items per page</p-text>
      <input type="number" v-bind:value="itemsPerPage" v-on:input="itemsPerPage = $event.target.value" />
    </label>
    <label style="display:inline-block">
      <p-text :theme="theme" tag="span" size="x-small">Active page</p-text>
      <input type="number" v-bind:value="activePage" v-on:input="activePage = $event.target.value" />
    </label>
  </template>
</Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };
    
    totalItemsCount = 500;
    itemsPerPage = 25;
    activePage = 1;
    
    basic(max: string) {
      const attr = max ? ` max-number-of-page-links="${max}"` : '';
      return `<p-pagination total-items-count="500" items-per-page="25" active-page="1"${attr}></p-pagination>`;
    }

    get behaviour() {
      return `<p-pagination total-items-count="${this.totalItemsCount}" items-per-page="${this.itemsPerPage}" active-page="${this.activePage}"></p-pagination>`
    }

    mounted(){
      this.registerEvents();
    }
    
    updated(){
      this.registerEvents();
    }
    
    registerEvents() {
      const playground = this.$el.querySelector('.playground-pagination p-pagination');
      playground.addEventListener('pageChange', (e) => {
        this.activePage = e.detail.page;
      });
    }
  }
</script>