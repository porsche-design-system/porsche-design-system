<script setup lang="ts">
import { pdsTheme } from '@porsche-design-system/components-vue/ag-grid';
import { dataAdvanced } from '@porsche-design-system/shared';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { inject } from 'vue';
import { type Theme, themeInjectionKey } from '../main';

ModuleRegistry.registerModules([AllCommunityModule]);

const theme = inject<Theme>(themeInjectionKey, 'scheme-light');

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
    :theme="pdsTheme"
    :rowData="rowData"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    style="height: 100vh"
    :data-ag-theme-mode="theme === 'scheme-light' ? null : 'dark'"
    :pagination="true"
  >
  </ag-grid-vue>
</template>
