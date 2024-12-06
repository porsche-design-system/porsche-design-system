<script setup lang="ts">
import 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue3'; // Vue Data Grid Component
import { dataAdvanced } from '@porsche-design-system/shared';
import '@porsche-design-system/components-vue/ag-grid/theme.css';

const theme = 'light';

const rowData = dataAdvanced.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));

const columnDefs = [
  {
    field: 'active',
    showDisabledCheckboxes: true,
    width: 170,
  },
  {
    field: 'model',
    editable: false,
  },
  {
    field: 'date',
    editable: false,
  },
  {
    field: 'interest',
    editable: false,
  },
  {
    field: 'vin',
    width: 250,
    editable: false,
  },
  {
    field: 'purchaseIntention',
    editable: false,
  },
  {
    field: 'status',
    editable: false,
  },
  {
    field: 'comment',
    filter: false,
    width: 500,
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
    :rowData="rowData"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    style="height: 100vh"
    :class="theme === 'light' ? 'ag-theme-pds' : 'ag-theme-pds-dark'"
    :pagination="true"
  >
  </ag-grid-vue>
</template>
