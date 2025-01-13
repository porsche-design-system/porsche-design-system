<script setup lang="ts">
import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
} from '@porsche-design-system/components-vue';
import { dataBasic, headBasic } from '@porsche-design-system/shared';
</script>

<template>
  <PTable :caption="'Some caption'">
    <PTableHead>
      <PTableRow>
        <PTableHeadCell v-for="(item, i) in headBasic" :key="i">{{ item }}</PTableHeadCell>
      </PTableRow>
    </PTableHead>
    <PTableBody>
      <PTableRow v-for="(item, i) in dataBasic" :key="i">
        <PTableCell>{{ item.model }}</PTableCell>
        <PTableCell>{{ item.date }}</PTableCell>
        <PTableCell>{{ item.interest }}</PTableCell>
        <PTableCell>{{ item.status }}</PTableCell>
        <PTableCell>{{ item.leadId }}</PTableCell>
      </PTableRow>
    </PTableBody>
  </PTable>
</template>
