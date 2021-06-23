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
It has the following structure:

```ts
type TableHeadCellSort = {
  id: string;
  active: boolean;
  direction: 'asc' | 'desc';
};
```

Upon clicking a sortable `p-table-head-cell` element, the `p-table` emits a `sortingChange` event that you should subscribe to.

<CodeBlockExtended :frameworks="sorting">
  <p-table ref="tableSorting">
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

The appearance of a table's contents can be customized as illustrated in the following example. 

<CodeBlockExtended :frameworks="advanced">
  <p-table ref="tableAdvanced">
    <p-table-head>
      <p-table-head-row>
        <p-table-head-cell v-for="(item, index) in headAdvanced" :key="index" :hide-label="item.hideLabel" ref="headCellsAdvanced">{{ item.name }}</p-table-head-cell>
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
      { id: 'col1', active: true, direction: 'asc' },
      { id: 'col2', active: false, direction: 'asc' },
    ];

    sorting = {
      'vanilla-js' :`const table = document.getElementById('#sortable-table');
const tableHeadCells = table.querySelectorAll('p-table-head-cell');

const passHeadItemsToNodes = (items) => 
  tableHeadCells.forEach((el, index) => {
    el.sort = items[index];
  });

passHeadItemsToNodes(headItems); // initial state

table.addEventListener('sortingChange', (e) => {
  const { id } = e.detail;
  const sortedHeadItems = headItems.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) }));
  passHeadItemsToNodes(sortedHeadItems);
});`,
      angular: `// template code
<p-table (sortingChange)="onSortingChange($event)">
  <p-table-head>
    <p-table-head-row>
      <p-table-head-cell *ngFor="let item of headItems" [sort]="item">
        {{ item.name }}
      </p-table-head-cell>
    </p-table-head-row>
  </p-table-head>
  <p-table-body>...</p-table-body>
</p-table>

// component code
onSortingChange(e: CustomEvent<TableHeadCellSort>): void {
  const { id } = e.detail;
  this.headItems = this.headItems.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) }));
}`,
      react: `const headRow = useRef<HTMLElement>();
const [head, setHead] = useState(headItems);

useEffect(() => {
  headRow.current.childNodes.forEach((node, index) => {
    (node as any).sort = head[index];
  });
}, [headItems]);

const onSortingChange = useCallback((e: CustomEvent<TableHeadCellSort>) => {
  const { id } = e.detail;
  setHead((prev) => prev.map((item) => ({ ...item, active: false, ...(item.id === id && e.detail) })));
}, []);

return (
  <PTable onSortingChange={onSortingChange}>
    <PTableHead>
      <PTableHeadRow ref={headRow}>
        {head.map((item, i) => (
          <PTableHeadCell key={i} sort={item}>{item.name}</PTableHeadCell>
        ))}
      </PTableHeadRow>
    </PTableHead>
    <PTableBody>...</PTableBody>
  </PTable>
);`,
      shared: `const headItems: TableHeadCellSort[] = [\n  ${this.sortingHeadData
        .map(x => JSON.stringify(x).replace('{', '{ ').replace('}', ' }').replace(/,"/g, ', "').replace(/"([a-z]+)":/g, '$1: '))
        .join(',\n  ')}\n];`
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
      this.$refs.tableAdvanced.addEventListener('sortingChange', (e) => {
        const { id, direction } = e.detail;
        this.headAdvanced = this.headAdvanced.map((x) => ({ ...x, active: false, ...(x.id === id && e.detail) }));
        this.dataAdvanced = [...this.dataAdvanced].sort((a, b) => (direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])));
        this.syncHeadCellProperties();
      });

      this.$refs.tableSorting.addEventListener('sortingChange', (e) => {
        const { id } = e.detail;
        this.sortingHeadData = this.sortingHeadData.map((x) => ({ ...x, active: false, ...(x.id === id && e.detail) }));
        this.syncHeadCellProperties();
      });
    }

    syncHeadCellProperties(): void {
      this.$refs.headCellsAdvanced.forEach((cell, i) => {
        cell.sort = this.headAdvanced[i];
        cell.hideLabel = this.headAdvanced[i].hideLabel;
      });

      this.$refs.headCellsSorting.forEach((cell, i) => {
        cell.sort = this.sortingHeadData[i];
      });
    }
  }
</script>
