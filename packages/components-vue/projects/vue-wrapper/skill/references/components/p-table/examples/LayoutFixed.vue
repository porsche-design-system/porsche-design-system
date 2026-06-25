<script setup lang="ts">
  import { PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableHeadRow, PTableRow, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PTable caption="Some caption" layout="fixed">
    <PTableHead>
      <PTableHeadRow>
        <PTableHeadCell class="w-[50%] max-w-[50%]">
          Column 1 (50%)
        </PTableHeadCell>
        <PTableHeadCell class="w-[150px] max-w-[150px]">
          Column 2 (150px)
        </PTableHeadCell>
        <PTableHeadCell>
          Column 3 (auto)
        </PTableHeadCell>
      </PTableHeadRow>
    </PTableHead>
    <PTableBody>
      <PTableRow>
        <PTableCell class="w-[50%] max-w-[50%]">
          Cell 1
        </PTableCell>
        <PTableCell class="w-[150px] max-w-[150px]">
          Cell 2
        </PTableCell>
        <PTableCell>
          Cell 3
        </PTableCell>
      </PTableRow>
      <PTableRow>
        <PTableCell class="w-[50%] max-w-[50%]">
          Cell 1
        </PTableCell>
        <PTableCell class="w-[150px] max-w-[150px]">
          <PText :ellipsis="true" title="Cell 2 with more content">
            Cell 2 with more content
          </PText>
        </PTableCell>
        <PTableCell>
          Cell 3
        </PTableCell>
      </PTableRow>
    </PTableBody>
  </PTable>
</template>
