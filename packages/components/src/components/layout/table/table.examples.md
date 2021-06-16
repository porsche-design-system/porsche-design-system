# Table

## Live Example

<Playground>
  <p-table ref="table">
    <p-table-head>
      <p-table-head-row>
        <p-table-head-cell v-for="(item, index) in headData" :key="index" ref="headCells">{{ item.name }}</p-table-head-cell>
      </p-table-head-row>
    </p-table-head>
    <p-table-body>
      <p-table-row v-for="(item, index) in bodyData" :key="index">
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
          <p-button-pure icon="edit">
            <span style="white-space: nowrap">Edit Lead</span>
          </p-button-pure>
        </p-table-cell>
        <p-table-cell>
          <p-button variant="tertiary" icon="refresh">
            <span style="white-space: nowrap">Overwrite</span>
          </p-button>
        </p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>
</Playground>

## Framework Implementations

<CodeBlockExtended :frameworks="frameworks"></CodeBlockExtended>


<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { data, head, getTableCodeSample } from '@porsche-design-system/shared';

  @Component
  export default class Code extends Vue {
    headData = head;
    bodyData = data;

    frameworks = {
      'vanilla-js': getTableCodeSample('vanilla-js'),
      angular: getTableCodeSample('angular'),
      react: getTableCodeSample('react'),
      shared: getTableCodeSample('shared'),
    };

    mounted(): void {
      this.syncHeadCellProperties();
      this.registerEvents();
    }

    registerEvents(): void {
      const { table } = this.$refs;
      table.addEventListener('sortingChange', (e) => {
        const { id, direction } = e.detail;
        this.headData = this.headData.map((x) => ({ ...x, isSorting: false, ...(x.id === id && e.detail) }));
        this.bodyData = [...this.bodyData].sort((a, b) => (direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])));
        this.syncHeadCellProperties();
      });
    }

    syncHeadCellProperties(): void {
      this.$refs.headCells.forEach((cell, i) => {
        cell.sort = this.headData[i];
        cell.hideLabel = this.headData[i].hideLabel;
      });
    }
  }
</script>
