<script setup lang="ts">
import {
  PButtonPure,
  PHeading,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  PText,
  type TableUpdateEventDetail,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

type HeadAdvanced = {
  id: string;
  name: string;
  hideLabel: boolean;
  active?: boolean;
  direction?: 'asc' | 'desc';
};

const headAdvanced: HeadAdvanced[] = [
  { name: 'Model', id: 'model' } as HeadAdvanced,
  { name: 'Interest', id: 'interest' } as HeadAdvanced,
  { name: 'VIN', id: 'vin' } as HeadAdvanced,
  { name: 'Purchase Intention', id: 'purchaseIntention' } as HeadAdvanced,
  { name: 'Status', id: 'status' } as HeadAdvanced,
  { name: 'Comment', id: 'comment' } as HeadAdvanced,
  { name: 'Lead ID', id: 'leadId' } as HeadAdvanced,
  { name: 'Select Wrapper', id: 'selectWrapper' } as HeadAdvanced,
  { name: 'Select', id: 'select' } as HeadAdvanced,
  { name: 'Multi-Select', id: 'multiSelect' } as HeadAdvanced,
  { name: 'Action', id: 'action', hideLabel: true } as HeadAdvanced,
].map((item, i) => ({
  ...item,
  ...(i > 0 &&
    i < 7 &&
    i !== 5 && {
      active: i === 1,
      direction: 'asc',
    }),
}));

type DataAdvanced = {
  imageUrl: string;
  model: string;
  date: string;
  interest: string;
  vin: string;
  purchaseIntention: string;
  status: string;
  comment: string;
  leadId: string;
};

const dataAdvanced: DataAdvanced[] = [
  {
    imageUrl: 'http://localhost:3002/718.png',
    model: '718',
    date: '23.06.2021',
    interest: 'New Car',
    vin: '1FM5K7F84FGB16304',
    purchaseIntention: '08/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824402',
  },
  {
    imageUrl: 'http://localhost:3002/panamera.png',
    model: 'Panamera',
    date: '19.06.2021',
    interest: 'New Car',
    vin: '2GCEC13T141374801',
    purchaseIntention: '11/2021',
    status: 'Lost',
    comment: 'Some multiline text and a column with a min width.',
    leadId: '0000824409',
  },
  {
    imageUrl: 'http://localhost:3002/911.png',
    model: '911',
    date: '19.05.2021',
    interest: 'Used Car',
    vin: '5GAKVCKD8EJ335750',
    purchaseIntention: '09/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824408',
  },
  {
    imageUrl: 'http://localhost:3002/macan.png',
    model: 'Macan',
    date: '10.05.2021',
    interest: 'Used Car',
    vin: '1FMPU17L83LC09302',
    purchaseIntention: '07/2021',
    status: 'Lost',
    comment: '-',
    leadId: '0000824407',
  },
  {
    imageUrl: 'http://localhost:3002/taycan.png',
    model: 'Taycan',
    date: '03.05.2021',
    interest: 'New Car',
    vin: 'JN1BY1AR3BM375187',
    purchaseIntention: '05/2021',
    status: 'Won',
    comment: '-',
    leadId: '0000824406',
  },
];

const head = ref(headAdvanced);
const data = ref(dataAdvanced);

const onUpdate = (e: CustomEvent<TableUpdateEventDetail>): void => {
  const { id, direction } = e.detail as TableUpdateEventDetail & { id: keyof DataAdvanced };
  head.value = head.value.map((item) => ({ ...item, active: false, ...(item.id === id && e) }));
  data.value = [...data.value].sort((a, b) =>
    direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])
  );
};
</script>

<template>
  <PTable @update="onUpdate">
    <!-- eslint-disable vue/no-deprecated-slot-attribute -->
    <PHeading :slot="'caption'" :size="'large'" tag="h3">Some visual caption</PHeading>
    <!-- eslint-enable -->
    <PTableHead>
      <PTableHeadRow>
        <PTableHeadCell v-for="(item, i) in head" :key="i" :sort="item" :hideLabel="item.hideLabel">
          {{ item.name }}
        </PTableHeadCell>
      </PTableHeadRow>
    </PTableHead>
    <PTableBody>
      <PTableRow v-for="(item, i) in data" :key="i">
        <PTableCell>
          <div :style="{ display: 'flex' }">
            <img :src="item.imageUrl" :width="80" :height="45" :style="{ marginRight: '.5rem', objectFit: 'contain', maxWidth: 'none' }" alt="" />
            <div>
              <PText :weight="'semi-bold'">{{ item.model }}</PText>
              <PText :size="'x-small'">{{ item.date }}</PText>
            </div>
          </div>
        </PTableCell>
        <PTableCell>{{ item.interest }}</PTableCell>
        <PTableCell>
          <a :href="'https://porsche.com'">{{ item.vin }}</a>
        </PTableCell>
        <PTableCell>{{ item.purchaseIntention }}</PTableCell>
        <PTableCell>{{ item.status }}</PTableCell>
        <PTableCell :multiline="true" :style="{ minWidth: '10rem' }">
          {{ item.comment }}
        </PTableCell>
        <PTableCell>{{ item.leadId }}</PTableCell>
        <PTableCell>
          <PButtonPure :icon="'edit'" :style="{ padding: '.5rem' }">Edit</PButtonPure>
          <PButtonPure :icon="'delete'" :style="{ padding: '.5rem' }">Delete</PButtonPure>
        </PTableCell>
      </PTableRow>
    </PTableBody>
  </PTable>
</template>
