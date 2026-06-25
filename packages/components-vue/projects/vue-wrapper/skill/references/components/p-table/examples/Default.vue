<script setup lang="ts">
  import { PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableHeadRow, PTableRow } from '@porsche-design-system/components-vue';
</script>

<template>
  <PTable caption="Some caption">
    <PTableHead>
      <PTableHeadRow>
        <PTableHeadCell>
          Model
        </PTableHeadCell>
        <PTableHeadCell>
          Date
        </PTableHeadCell>
        <PTableHeadCell>
          Purchase Intention
        </PTableHeadCell>
        <PTableHeadCell>
          Status
        </PTableHeadCell>
        <PTableHeadCell>
          Lead ID
        </PTableHeadCell>
      </PTableHeadRow>
    </PTableHead>
    <PTableBody>
      <PTableRow>
        <PTableCell>
          718 Cayman
        </PTableCell>
        <PTableCell>
          23.06.2021
        </PTableCell>
        <PTableCell>
          New Car
        </PTableCell>
        <PTableCell>
          Won
        </PTableCell>
        <PTableCell>
          0000824402
        </PTableCell>
      </PTableRow>
      <PTableRow>
        <PTableCell>
          Panamera 4S
        </PTableCell>
        <PTableCell>
          19.06.2021
        </PTableCell>
        <PTableCell>
          New Car
        </PTableCell>
        <PTableCell>
          Lost
        </PTableCell>
        <PTableCell>
          0000824409
        </PTableCell>
      </PTableRow>
      <PTableRow>
        <PTableCell>
          911 Carrera S
        </PTableCell>
        <PTableCell>
          19.05.2021
        </PTableCell>
        <PTableCell>
          Used Car
        </PTableCell>
        <PTableCell>
          Won
        </PTableCell>
        <PTableCell>
          0000824408
        </PTableCell>
      </PTableRow>
      <PTableRow>
        <PTableCell>
          Macan Turbo
        </PTableCell>
        <PTableCell>
          10.05.2021
        </PTableCell>
        <PTableCell>
          Used Car
        </PTableCell>
        <PTableCell>
          Lost
        </PTableCell>
        <PTableCell>
          0000824407
        </PTableCell>
      </PTableRow>
      <PTableRow>
        <PTableCell>
          Taycan
        </PTableCell>
        <PTableCell>
          03.05.2021
        </PTableCell>
        <PTableCell>
          New Car
        </PTableCell>
        <PTableCell>
          Won
        </PTableCell>
        <PTableCell>
          0000824406
        </PTableCell>
      </PTableRow>
    </PTableBody>
  </PTable>
</template>
