# Table

## Live Example

<Playground>
  <p-table ref="table">
    <p-table-head>
      <p-table-row>
        <p-table-head-cell v-for="(item, index) in headData" :key="index" ref="headCells">{{ item.name }}</p-table-head-cell>
      </p-table-row>
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

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { data, head } from '@porsche-design-system/shared';
  
  @Component
  export default class Code extends Vue {
    headData = head;
    bodyData = data;

    mounted(): void {
      this.syncHeadCellProperties();
      this.registerEvents();
    }

    registerEvents(): void {
      const { table } = this.$refs;
      table.addEventListener('sortingChange', (e) => {
        const { key, direction } = e.detail;
        this.headData = this.headData.map((x) => ({ ...x, isSorting: false, ...(x.key === key && e.detail) }));
        this.bodyData = [...this.bodyData].sort((a, b) => (direction === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])));
        this.syncHeadCellProperties();
      });
    }

    syncHeadCellProperties(): void {
      this.$refs.headCells.forEach((cell, i) => {
        cell.item = this.headData[i];
      });
    }
  }
</script>
