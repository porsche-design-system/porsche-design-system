# Table

## Basic Table

<CodeBlockExtended :frameworks="basic">
   <p-table ref="tableBasic">
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
</CodeBlockExtended>

---

### Caption

A caption that describes the content of the table can set in 2 ways.

#### Via property

Using the `caption` property doesn't display the caption but instead can be used to improve accessibility of the table.  

<Playground :markup="captionProperty"></Playground>

#### Via slot

When using the `caption` slot its content will be rendered while offering full control of appearance.  

<Playground :markup="captionSlot"></Playground>

---

### Column Headers

The `table`'s head can be configured by setting one or more of the following properties on each `p-table-head-cell`.

#### Sorting

In order to have a sortable table column you need to provide the `sort` property.

<CodeBlockExtended :frameworks="sorting">
  <p-table>
    <p-table-head>
      <p-table-head-row>
        <p-table-head-cell v-for="(item, index) in sortingHeadData" :key="index" ref="headCellsSorting">Column {{ index + 1 }}</p-table-head-cell>
      </p-table-head-row>
    </p-table-head>
    <p-table-body v-html="basicTableBodyRow"></p-table-body>
  </p-table>
</CodeBlockExtended>

#### Hide Label

Sometimes you want to hide the label of table column for example when the columns content is self-explanatory. This can be achieved by setting the `hide-label` property.

<Playground :markup="hideLabel"></Playground>

---

## Advanced Table

<CodeBlockExtended :frameworks="advanced">
  <p-table ref="tableAdvanced">
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
              <img :src="item.imageUrl" width="80" style="margin-right: 8px" alt="">
            </p-flex-item>
            <p-flex-item>
              <p-text weight="semibold">{{ item.model }}</p-text>
              <p-text size="x-small">{{ item.date }}</p-text>
            </p-flex-item>
          </p-flex>
        </p-table-cell>
        <p-table-cell>{{ item.interest }}</p-table-cell>
        <p-table-cell>{{ item.vin }}</p-table-cell>
        <p-table-cell>{{ item.purchaseIntention }}</p-table-cell>
        <p-table-cell>{{ item.status }}</p-table-cell>
        <p-table-cell>{{ item.leadId }}</p-table-cell>
        <p-table-cell>
          <p-button-pure icon="edit" style="padding: .5rem">Edit Lead</p-button-pure>
        </p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>
</CodeBlockExtended>


<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { dataBasic, headBasic, dataAdvanced, headAdvanced, getTableCodeSample } from '@porsche-design-system/shared';

  @Component
  export default class Code extends Vue {
    headBasic = headBasic;
    dataBasic = dataBasic;
    headAdvanced = headAdvanced;
    dataAdvanced = dataAdvanced;

    basic = {
      'vanilla-js': getTableCodeSample('vanilla-js', 'example-basic'),
      angular: getTableCodeSample('angular', 'example-basic'),
      react: getTableCodeSample('react', 'example-basic'),
      shared: getTableCodeSample('shared', 'example-basic'),
    };

    advanced = {
      'vanilla-js': getTableCodeSample('vanilla-js', 'example-advanced'),
      angular: getTableCodeSample('angular', 'example-advanced'),
      react: getTableCodeSample('react', 'example-advanced'),
      shared: getTableCodeSample('shared', 'example-advanced'),
    };

    basicTableHead = `<p-table-head>
    <p-table-head-row>
      <p-table-head-cell>Column 1</p-table-head-cell>
      <p-table-head-cell>Column 2</p-table-head-cell>
    </p-table-head-row>
  </p-table-head>`;

    basicTableBodyRow = `<p-table-row>
      <p-table-cell>Cell 1</p-table-cell>
      <p-table-cell>Cell 2</p-table-cell>
    </p-table-row>`

    basicTableBody = `<p-table-body>
     ${this.basicTableBodyRow}
  </p-table-body>`;

    captionProperty = `<p-table caption="Some caption">
  ${this.basicTableHead}
  ${this.basicTableBody}
</p-table>`;

    captionSlot = `<p-table>
  <p-headline slot="caption" variant="headline-3" align="center" style="margin-bottom: 1rem">Some slotted caption</p-headline>
  ${this.basicTableHead}
  ${this.basicTableBody}
</p-table>`;

    sortingHeadData: any[] = [
      { active: true, direction: 'asc' },
      { active: false, direction: 'asc' },
    ];

    sorting = {
      'vanilla-js' :`Array.from(document.querySelectorAll('#sortable-table .p-table-head-cell')).forEach((el, index) => {
  el.sort = items[index];
});`,
      angular: `<p-table-head-cell *ngFor="let item of items" [sort]="item">
  {{ item.name }}
</p-table-head-cell>`,
      react: `const headRow = useRef<HTMLElement>();

useEffect(() => {
  headRow.current.childNodes.forEach((node, index) => {
    (node as any).sort = head[index];
  });
}, [items]);`,
      shared: `const items: TableHeadCellSort[] = ${JSON.stringify(this.sortingHeadData)};`
  };

    hideLabel = `<p-table>
  <p-table-head>
    <p-table-head-row>
      <p-table-head-cell>Column 1</p-table-head-cell>
      <p-table-head-cell hide-label="true">Column 2</p-table-head-cell>
    </p-table-head-row>
  </p-table-head>
  ${this.basicTableBody}
</p-table>`;

    mounted(): void {
      this.syncHeadCellProperties();
      this.registerEvents();
    }

    registerEvents(): void {
      const { tableAdvanced } = this.$refs;
      tableAdvanced.addEventListener('sortingChange', (e) => {
        const { id, direction } = e.detail;
        this.headAdvanced = this.headAdvanced.map((x) => ({ ...x, isSorting: false, ...(x.id === id && e.detail) }));
        this.dataAdvanced = [...this.dataAdvanced].sort((a, b) => (direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])));
        this.syncHeadCellProperties();
      });
    }

    syncHeadCellProperties(): void {
      this.$refs.headCellsAdvanced.forEach((cell, i) => {
        cell.sort = this.headAdvanced[i];
        cell.hideLabel = this.headAdvanced[i].hideLabel;
      });

      console.log(this.$refs);
      this.$refs.headCellsSorting.forEach((cell, i) => {
        cell.sort = this.sortingHeadData[i];
      });
    }
  }
</script>
