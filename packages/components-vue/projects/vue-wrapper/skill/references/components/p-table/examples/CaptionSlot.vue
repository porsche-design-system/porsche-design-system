<script setup lang="ts">
  import { PHeading, PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableHeadRow, PTableRow } from '@porsche-design-system/components-vue';
</script>

<template>
  <PTable>
    <PHeading slot="caption" size="large" tag="h3">
      Some slotted caption
    </PHeading>
    <PTableHead>
      <PTableHeadRow>
        <PTableHeadCell>
          Column 1
        </PTableHeadCell>
        <PTableHeadCell>
          Column 2
        </PTableHeadCell>
        <PTableHeadCell>
          Column 3
        </PTableHeadCell>
      </PTableHeadRow>
    </PTableHead>
    <PTableBody>
      <PTableRow>
        <PTableCell>
          Cell 1
        </PTableCell>
        <PTableCell>
          Cell 2
        </PTableCell>
        <PTableCell>
          Cell 3
        </PTableCell>
      </PTableRow>
    </PTableBody>
  </PTable>
</template>
