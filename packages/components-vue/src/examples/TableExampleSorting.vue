<script setup lang="ts">
  import {
    PTable,
    PTableBody,
    PTableCell,
    PTableHead,
    PTableHeadCell,
    PTableHeadRow,
    PTableRow,
    type TableUpdateEventDetail,
  } from '@porsche-design-system/components-vue';
  import { type DataSorting, dataSorting, headSorting } from '@porsche-design-system/shared';
  import { ref } from 'vue';

  const head = ref(headSorting);
  const data = ref(dataSorting);

  const onUpdate = (e: TableUpdateEventDetail): void => {
    const { id, direction } = e as TableUpdateEventDetail & { id: keyof DataSorting };
    head.value = head.value.map((item) => ({ ...item, active: false, ...(item.id === id && e) }));
    data.value = [...data.value].sort((a, b) =>
      direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])
    );
  };
</script>

<template>
  <PTable :caption="'Some caption'" @update="onUpdate">
    <PTableHead>
      <PTableHeadRow>
        <PTableHeadCell v-for="(item, i) in head" :key="i" :sort="item">{{ item.name }}</PTableHeadCell>
      </PTableHeadRow>
    </PTableHead>
    <PTableBody>
      <PTableRow v-for="(item, i) in data" :key="i">
        <PTableCell>{{ item.col1 }}</PTableCell>
        <PTableCell>{{ item.col2 }}</PTableCell>
        <PTableCell>{{ item.col3 }}</PTableCell>
      </PTableRow>
    </PTableBody>
  </PTable>
</template>
