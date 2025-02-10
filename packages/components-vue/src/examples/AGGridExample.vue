<script setup lang="ts">
import { PLinkPure, type Theme, themeInjectionKey } from '@porsche-design-system/components-vue';
import { pdsTheme } from '@porsche-design-system/components-vue/ag-grid';
import { dataAdvanced } from '@porsche-design-system/shared';
import { AllEnterpriseModule, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { inject } from 'vue';
ModuleRegistry.registerModules([AllEnterpriseModule]);

const theme = inject<Theme>(themeInjectionKey, 'light');

const ImageUrlRendererer = {
  template: `
      <img :src="cellValue.replace('/porsche-design-system/', '/dummyasset/')" width="80" height="45" alt="" />
    `,
  setup(props: any) {
    return {
      cellValue: props.params.value,
    };
  },
};

const ButtonRenderer = {
  components: {
    PLinkPure,
  },
  template: `
      <span class="cell-centered">
      <PLinkPure
        :underline="true"
        :theme="theme"
        target="_blank"
        :href="'https://www.porsche.com/germany/models/' + data.model.toLowerCase()"
      >
        More information
      </PLinkPure>
      </span>
    `,
  setup(props: any) {
    return {
      theme,
      data: props.params.data,
    };
  },
};

const rowData = dataAdvanced.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));

const columnDefs = [
  {
    field: 'active',
    showDisabledCheckboxes: true,
    width: 170,
  },
  {
    field: 'imageUrl',
    headerName: 'Image',
    cellRenderer: ImageUrlRendererer,
    editable: false,
    filter: false,
    sortable: false,
    width: 130,
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
  {
    field: 'leadId',
    headerName: 'More',
    cellRenderer: ButtonRenderer,
    editable: false,
    sortable: false,
    filter: false,
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
    style="height: 80vh"
    :data-ag-theme-mode="theme === 'light' ? null : 'dark'"
    :pagination="true"
    :sideBar="true"
    :enableRangeSelection="true"
  >
  </ag-grid-vue>
</template>

<style>

  img {
    object-fit: contain;
  }
  .cell-centered {
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
