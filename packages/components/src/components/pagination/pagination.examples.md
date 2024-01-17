<ComponentHeading name="Pagination"></ComponentHeading>

<TableOfContents></TableOfContents>

<Notification heading="Deprecation hint" state="warning">
  The <code>pageChange</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>update</code> event instead.
</Notification>

## Basic usage

To adapt the pagination to the specific viewport context, the amount of displayed page items varies between either `7`
(desktop/tablet) or `5` (mobile). The components handles responsive viewport sizing by default.

<Playground :markup="basic" :config="config"></Playground>

## Max Number of Page Links (deprecated)

<Notification heading="Important note" state="warning">
  The <code>maxNumberOfPageLinks</code> property is deprecated since v3.10.0 and has no effect anymore. Therefor, it will be removed with the next major release.
</Notification>

## Without last page

In case you don't need or want the ability to see and jump to the last page, you can disable it via
`showLastPage="false"`.

<Playground :markup="withoutLastPage" :config="config"></Playground>

## Behaviour playground

By changing values for total amount of items, items to display per page and number of currently active page, the
behaviour of the pagination component can be changed.

<Playground class="playground-pagination" :markup="behaviour" :config="config">
  <template v-slot:default="{ theme }">
    <PlaygroundInput type="number" v-model="totalItemsCount" name="Total items count"></PlaygroundInput>
    <PlaygroundInput type="number" v-model="itemsPerPage" name="Items per page"></PlaygroundInput>
    <PlaygroundInput type="number" v-model="activePage" name="Active page"></PlaygroundInput>
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

  basic =`<p-pagination total-items-count="500" items-per-page="25" active-page="1"></p-pagination>`;
  withoutLastPage = this.basic.replace('>', ' show-last-page="false">');

  get behaviour() {
    return `<p-pagination total-items-count="${this.totalItemsCount}" items-per-page="${this.itemsPerPage}" active-page="${this.activePage}"></p-pagination>`;
  }

  mounted(){
    this.registerEvents();
  }

  updated(){
    this.registerEvents();
  }

  registerEvents() {
    const el = this.$el.querySelector('.playground-pagination p-pagination');
    el.addEventListener('update', (e) => {
      this.activePage = e.detail.page;
    });
  }
}
</script>
