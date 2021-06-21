# Table

## Simple Table

### Live Example

<Playground>
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
</Playground>

### Framework Implementations

<CodeBlockExtended :frameworks="basic"></CodeBlockExtended>

### Caption

### Sorting

### Hide Label

## Advanced Table

### Live Example

<Playground>
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
</Playground>

### Framework Implementations

<CodeBlockExtended :frameworks="advanced"></CodeBlockExtended>


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
    }
  }
</script>
