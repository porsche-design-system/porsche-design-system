<script setup lang="ts">
  import { type DataAdvanced, dataAdvanced, headAdvanced } from '@porsche-design-system/shared';
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

  const head = ref(headAdvanced);
  const data = ref(dataAdvanced);

  const onUpdate = (e: TableUpdateEventDetail): void => {
    const { id, direction } = e as TableUpdateEventDetail & { id: keyof DataAdvanced };
    head.value = head.value.map((item) => ({ ...item, active: false, ...(item.id === id && e) }));
    data.value = [...data.value].sort((a, b) =>
      direction === 'asc' ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id])
    );
  };
</script>

<template>
  <PTable @update="onUpdate">
    <!-- eslint-disable vue/no-deprecated-slot-attribute -->
    <PHeading :slot="'caption'" :size="'large'">Some visual caption</PHeading>
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
            <img :src="item.imageUrl" :width="80" :height="45" :style="{ marginRight: '.5rem' }" alt="" />
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
