# Table

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

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  const head = [
    { name: 'Model' },
    { name: 'Interest', key: 'interest' },
    { name: 'VIN', key: 'vin' },
    { name: 'Purchase Intention', key: 'purchaseIntention' },
    { name: 'Status', key: 'status' },
    { name: 'Lead ID', key: 'leadId' },
    { name: '' },
    { name: '' },
  ];

  const data = [
    {
      imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911.jpg',
      model: '911 Carrera S',
      date: '03.05.2021',
      interest: 'New Car',
      vin: '-',
      purchaseIntention: '08.2020',
      status: 'Won',
      leadId: '0000824402',
    },
    {
      imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/taycan.jpg',
      model: '911 Carrera S',
      date: '03.05.2021',
      interest: 'New Car',
      vin: '-',
      purchaseIntention: '11.2020',
      status: 'Lost',
      leadId: '0000824409',
    },
    {
      imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911.jpg',
      model: '911 Carrera S',
      date: '03.05.2021',
      interest: 'Used Car',
      vin: '-',
      purchaseIntention: '09.2020',
      status: 'Won',
      leadId: '0000824408',
    },
    {
      imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/718.jpg',
      model: '911 Carrera S',
      date: '03.05.2021',
      interest: 'Used Car',
      vin: '-',
      purchaseIntention: '04.2020',
      status: 'Lost',
      leadId: '0000824407',
    },
    {
      imageUrl: 'https://nav.porsche.com/00BC524/series-assets/1366/911.jpg',
      model: '911 Carrera S',
      date: '03.05.2021',
      interest: 'New Car',
      vin: '-',
      purchaseIntention: '03.2020',
      status: 'Won',
      leadId: '0000824406',
    },
  ];

  const headSortable = head.map((item, i) => ({
    ...item,
    ...(item.name && {
      isSortable: i > 0,
      isSorting: i === 1,
      direction: 'asc',
    }),
  }));
  
  @Component
  export default class Code extends Vue {
    headData = headSortable;
    bodyData = data;

    mounted(): void {
      this.syncHeadCellProperties();
      this.registerEvents();
    }

    registerEvents() {
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
