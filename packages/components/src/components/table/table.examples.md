<ComponentHeading name="Table"></ComponentHeading>

The `p-table` component displays tabular data and offers column-wise sorting options.  
It combines a consistent appearance together with great accessibility while not having restrictions regarding its
content. Therefore, it can be used for plain text but also rich content like images, form elements and buttons.

It is a controlled component. This means it does not contain any internal state, and you got full control over its
behavior.

<TableOfContents></TableOfContents>

## Basic Table

<Playground :frameworkMarkup="basic" :config="config">
  <p-table :theme="theme" caption="Some caption" ref="tableBasic">
    <p-table-head>
      <p-table-head-row>
        <p-table-head-cell v-for="(item, index) in headBasic" :key="index">{{ item }}</p-table-head-cell>
      </p-table-head-row>
    </p-table-head>
    <p-table-body>
      <p-table-row v-for="(item, index) in dataBasic" :key="index">
        <p-table-cell>{{ item.model }}</p-table-cell>
        <p-table-cell>{{ item.date }}</p-table-cell>
        <p-table-cell>{{ item.interest }}</p-table-cell>
        <p-table-cell>{{ item.status }}</p-table-cell>
        <p-table-cell>{{ item.leadId }}</p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>
</Playground>

---

## Caption

A caption that describes the content of the table can be set in two ways. It's mandatory to define a descriptive caption
to fulfill accessibility criteria.

### Via property

Using the `caption` property doesn't display the caption but instead can be used to improve accessibility of the table.

<Playground :markup="captionProperty" :config="config"></Playground>

### Via slot

When using the `caption` slot its content will be rendered while offering full control of appearance.

<Playground :markup="captionSlot" :config="config"></Playground>

---

## Column Headers

The `p-table`'s head can be configured by setting one or more of the following properties on each `p-table-head-cell`.

### Sorting

In order to have a sortable table column you need to provide the `sort` property.  
It has the following structure:

```ts
type TableHeadCellSort = {
  id: string; // identifier for the column to be sorted by
  active: boolean;
  direction: 'asc' | 'desc';
};
```

Upon clicking a sortable `p-table-head-cell` element, the `p-table` emits an `update` event that you should subscribe
to.

<Notification heading="Deprecation hint" heading-tag="h4" state="warning">
  The <code>sortingChange</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>update</code> event instead.
</Notification>

<Playground :frameworkMarkup="sorting" :config="config">
  <p-table caption="Some caption" ref="tableSorting" :theme="theme">
    <p-table-head>
      <p-table-head-row>
        <p-table-head-cell v-for="(item, index) in headSorting" :key="index" ref="headCellsSorting">{{ item.name }}</p-table-head-cell>
      </p-table-head-row>
    </p-table-head>
    <p-table-body>
      <p-table-row v-for="(item, index) in dataSorting" :key="index">
        <p-table-cell>{{ item.col1 }}</p-table-cell>
        <p-table-cell>{{ item.col2 }}</p-table-cell>
        <p-table-cell>{{ item.col3 }}</p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>
</Playground>

### Hide Label

Sometimes you want to hide the label of a table column for example when the column's content is self-explanatory. This
can be achieved by setting the `hide-label` property.

<Playground :markup="hideLabel" :config="config"></Playground>

---

## Advanced Table

The appearance of a table's contents can be customized as illustrated in the following example.

<Playground :frameworkMarkup="advanced" :config="config">
  <p-table ref="tableAdvanced" :theme="theme">
    <p-heading slot="caption" :theme="theme" size="large" tag="h3">Some visual caption</p-heading>
    <p-table-head>
      <p-table-head-row>
        <p-table-head-cell v-for="(item, index) in headAdvanced" :key="index" ref="headCellsAdvanced">{{ item.name }}</p-table-head-cell>
      </p-table-head-row>
    </p-table-head>
    <p-table-body>
      <p-table-row v-for="(item, index) in dataAdvanced" :key="index">
        <p-table-cell>
          <p-flex>
            <p-flex-item>
              <img :src="item.imageUrl" width="80" height="45" style="margin-inline-end: 8px; object-fit: contain" alt="">
            </p-flex-item>
            <p-flex-item>
              <p-text :theme="theme" weight="semibold">{{ item.model }}</p-text>
              <p-text :theme="theme" size="x-small">{{ item.date }}</p-text>
            </p-flex-item>
          </p-flex>
        </p-table-cell>
        <p-table-cell>{{ item.interest }}</p-table-cell>
        <p-table-cell><a href="https://porsche.com">{{ item.vin }}</a></p-table-cell>
        <p-table-cell>{{ item.purchaseIntention }}</p-table-cell>
        <p-table-cell>{{ item.status }}</p-table-cell>
        <p-table-cell multiline="true" style="min-width: 10rem;">{{ item.comment }}</p-table-cell>
        <p-table-cell>{{ item.leadId }} <p-popover description="Some additional content."></p-popover></p-table-cell>
        <p-table-cell>
          <p-select-wrapper filter="true" label="Select Something" style="min-width: 160px;">
            <select name="some-name">
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
              <option value="d">Option D</option>
              <option value="e">Option E</option>
              <option value="f">Option F</option>
              <option value="g">Option G</option>
              <option value="h">Option H</option>
              <option value="i">Option I</option>
              <option value="j">Option J</option>
              <option value="k">Option K</option>
            </select>
          </p-select-wrapper>
        </p-table-cell>
        <p-table-cell>
          <p-select name="options" label="Select Something" style="min-width: 160px; display: block;">
            <p-select-option value="a">Option A</p-select-option>
            <p-select-option value="b">Option B</p-select-option>
            <p-select-option value="c">Option C</p-select-option>
            <p-select-option value="d">Option D</p-select-option>
            <p-select-option value="e">Option E</p-select-option>
            <p-select-option value="f">Option F</p-select-option>
            <p-select-option value="g">Option G</p-select-option>
            <p-select-option value="h">Option H</p-select-option>
            <p-select-option value="i">Option I</p-select-option>
            <p-select-option value="j">Option J</p-select-option>
            <p-select-option value="k">Option K</p-select-option>
          </p-select>
        </p-table-cell>
        <p-table-cell>
          <p-multi-select name="name" label="Multi-Select Something" style="min-width: 160px;">
            <p-multi-select-option value="a">Option A</p-multi-select-option>
            <p-multi-select-option value="b">Option B</p-multi-select-option>
            <p-multi-select-option value="c">Option C</p-multi-select-option>
            <p-multi-select-option value="d">Option D</p-multi-select-option>
            <p-multi-select-option value="e">Option E</p-multi-select-option>
            <p-multi-select-option value="f">Option F</p-multi-select-option>
            <p-multi-select-option value="g">Option G</p-multi-select-option>
            <p-multi-select-option value="h">Option H</p-multi-select-option>
            <p-multi-select-option value="i">Option I</p-multi-select-option>
            <p-multi-select-option value="j">Option J</p-multi-select-option>
            <p-multi-select-option value="k">Option K</p-multi-select-option>
          </p-multi-select>
        </p-table-cell>
        <p-table-cell>
          <p-button-pure :theme="theme" icon="edit" style="padding: .5rem">Edit</p-button-pure>
          <p-button-pure :theme="theme" icon="delete" style="padding: .5rem">Delete</p-button-pure>
        </p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { dataBasic, headBasic, dataSorting, headSorting, dataAdvanced, headAdvanced, getTableCodeSamples } from '@porsche-design-system/shared';
import type { Theme } from '@/models';

@Component
export default class Code extends Vue {
  config = { themeable: true, overflowX: 'visible' };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  headBasic = headBasic;
  dataBasic = dataBasic;
  headSorting = headSorting;
  dataSorting = dataSorting;
  headAdvanced = headAdvanced;
  dataAdvanced = dataAdvanced.map(({imageUrl, ...rest}) => ({
    ...rest,
    imageUrl: imageUrl.replace(/http:\/\/localhost:3002/, '/assets')
  }));

  basic = getTableCodeSamples('example-basic');
  sorting = getTableCodeSamples('example-sorting');
    advanced = getTableCodeSamples('example-advanced');

  basicTableHead = `<p-table-head>
    <p-table-head-row>
      <p-table-head-cell>Column 1</p-table-head-cell>
      <p-table-head-cell>Column 2</p-table-head-cell>
      <p-table-head-cell>Column 3</p-table-head-cell>
    </p-table-head-row>
  </p-table-head>`;

  basicTableBodyRow = `<p-table-row>
      <p-table-cell>Cell 1</p-table-cell>
      <p-table-cell>Cell 2</p-table-cell>
      <p-table-cell>Cell 3</p-table-cell>
    </p-table-row>`;

  basicTableBody = `<p-table-body>
     ${this.basicTableBodyRow}
  </p-table-body>`;

  captionProperty = `<p-table caption="Some caption">
  ${this.basicTableHead}
  ${this.basicTableBody}
</p-table>`;

  captionSlot = `<p-table>
  <p-heading slot="caption" :theme="theme" size="large">Some slotted caption</p-heading>
  ${this.basicTableHead}
  ${this.basicTableBody}
</p-table>`;

  hideLabel = `<p-table caption="Some caption">
  <p-table-head>
    <p-table-head-row>
      <p-table-head-cell>Column 1</p-table-head-cell>
      <p-table-head-cell>Column 2</p-table-head-cell>
      <p-table-head-cell hide-label="true">Column 3</p-table-head-cell>
    </p-table-head-row>
  </p-table-head>
  ${this.basicTableBody}
</p-table>`;

  mounted(): void {
    this.syncHeadCellProperties();
    this.registerEvents();
  }

  registerEvents(): void {
    this.$refs.tableAdvanced.addEventListener('update', (e) => {
      const { id, direction } = e.detail;
      this.headAdvanced = this.headAdvanced.map((x) => ({ ...x, active: false, ...(x.id === id && e.detail) }));
      this.dataAdvanced = [...this.dataAdvanced].sort((a, b) => (direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])));
      this.syncHeadCellProperties();
    });

    this.$refs.tableSorting.addEventListener('update', (e) => {
      const { id, direction } = e.detail;
      this.headSorting = this.headSorting.map((x) => ({ ...x, active: false, ...(x.id === id && e.detail) }));
      this.dataSorting = [...this.dataSorting].sort((a, b) => (direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])));
      this.syncHeadCellProperties();
    });
  }

  syncHeadCellProperties(): void {
    this.$refs.headCellsAdvanced.forEach((cell, i) => {
      cell.sort = this.headAdvanced[i];
      cell.hideLabel = this.headAdvanced[i].hideLabel;
    });

    this.$refs.headCellsSorting.forEach((cell, i) => {
      cell.sort = this.headSorting[i];
    });
  }
}
</script>
