<script setup lang="ts">
  import {
    PTable,
    PTableBody,
    PTableCell,
    PTableHead,
    PTableHeadCell,
    PTableHeadRow,
    PTableRow,
  } from '@porsche-design-system/components-vue';
  import { dataSorting, headSorting } from '@porsche-design-system/shared';
  import type { DataSorting } from '@porsche-design-system/shared';
  import type { TableChangeEvent } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const head = ref(headSorting);
  const data = ref(dataSorting);

  const onChange = (e: CustomEvent<TableChangeEvent>): void => {
    const { id, direction } = e as TableChangeEvent & { id: keyof DataSorting };
    head.value = head.value.map((item) => ({ ...item, active: false, ...(item.id === id && e) }));
    data.value = [...data.value].sort((a, b) =>
      direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])
    );
  };
</script>

<template>
  <PTable :caption="'Some caption'" @change="onChange">
    <PTableHead>
      <PTableHeadRow>
        <PTableHeadCell v-for="(item, index) in head" :key="index" :sort="item">{{ item.name }}</PTableHeadCell>
      </PTableHeadRow>
    </PTableHead>
    <PTableBody>
      <PTableRow v-for="(item, index) in data" :key="index">
        <PTableCell>{{ item.col1 }}</PTableCell>
        <PTableCell>{{ item.col2 }}</PTableCell>
        <PTableCell>{{ item.col3 }}</PTableCell>
      </PTableRow>
    </PTableBody>
  </PTable>
</template>
