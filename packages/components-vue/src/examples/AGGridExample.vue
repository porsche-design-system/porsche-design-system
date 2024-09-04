<script setup lang="ts">
  import { AgGridVue } from 'ag-grid-vue3'; // Vue Data Grid Component
  import { dataAdvanced } from '@porsche-design-system/shared';
  import 'ag-grid-enterprise/styles/ag-grid.css';
  import '@porsche-design-system/components-js/ag-grid/theme-light.css';

  const ImageUrlRendererer = {
    template: `
      <img :src="cellValue.replace('/porsche-design-system/', '/dummyasset/')" width="80" height="45" alt="" />
    `,
    setup(props) {
      return {
        cellValue: props.params.value,
      };
    },
  };

  const columnDefs = [
    {
      field: 'imageUrl',
      cellRenderer: ImageUrlRendererer,
    },
    {
      field: 'model',
    },
    {
      field: 'date',
    },
    {
      field: 'interest',
    },
    {
      field: 'vin',
    },
    {
      field: 'purchaseIntention',
    },
    {
      field: 'status',
    },
    {
      field: 'comment',
    },
    {
      field: 'leadId',
    },
  ];
  // Configurations applied to all columns
  const defaultColDef = {
    filter: true,
    editable: true,
  };
</script>

<template>
  <ag-grid-vue
    :rowData="dataAdvanced"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    style="height: 80vh"
    class="ag-theme-quartz"
    :pagination="true"
  >
  </ag-grid-vue>
</template>
