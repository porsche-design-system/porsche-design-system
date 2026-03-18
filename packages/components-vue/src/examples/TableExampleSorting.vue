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
import { ref } from 'vue';

type HeadSorting = {
  id: string;
  name: string;
  active?: boolean;
  direction?: 'asc' | 'desc';
};

const headSorting: HeadSorting[] = [
  { name: 'Column 1', id: 'col1' } as HeadSorting,
  { name: 'Column 2', id: 'col2' } as HeadSorting,
  { name: 'Column 3', id: 'col3' } as HeadSorting,
].map((item, i) => ({
  ...item,
  active: i === 1,
  direction: 'asc',
}));

type DataSorting = {
  col1: string;
  col2: string;
  col3: string;
};

const dataSorting: DataSorting[] = [
  {
    col1: 'Name A',
    col2: '9',
    col3: '01.06.2021',
  },
  {
    col1: 'Name Z',
    col2: '1',
    col3: '24.06.2021',
  },
];

const head = ref(headSorting);
const data = ref(dataSorting);

const onUpdate = (e: CustomEvent<TableUpdateEventDetail>): void => {
  const { id, direction } = e.detail as TableUpdateEventDetail & { id: keyof DataSorting };
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
