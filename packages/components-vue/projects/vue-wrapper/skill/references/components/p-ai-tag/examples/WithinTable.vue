<script setup lang="ts">
  import { PAiTag, PHeading, PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableHeadRow, PTableRow } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="w-full">
    <PTable>
      <PHeading slot="caption" size="large" tag="h3">
        Some slotted caption
      </PHeading>
      <PTableHead>
        <PTableHeadRow>
          <PTableHeadCell :sort="{'id': 'model', 'active': 'true', 'direction': 'desc'}">
            Model
          </PTableHeadCell>
          <PTableHeadCell>
            Date
          </PTableHeadCell>
          <PTableHeadCell>
            Purchase Intention
          </PTableHeadCell>
          <PTableHeadCell>
            <span class="inline-flex items-center gap-static-sm">
              Status
              <PAiTag variant="abbreviation"></PAiTag>
            </span>
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
            15.03.2023
          </PTableCell>
          <PTableCell>
            Used Car
          </PTableCell>
          <PTableCell>
            Lost
          </PTableCell>
          <PTableCell>
            0000824408
          </PTableCell>
        </PTableRow>
        <PTableRow>
          <PTableCell>
            911 Carrera S
          </PTableCell>
          <PTableCell>
            28.08.2025
          </PTableCell>
          <PTableCell>
            New Car
          </PTableCell>
          <PTableCell>
            Won
          </PTableCell>
          <PTableCell>
            0000824409
          </PTableCell>
        </PTableRow>
      </PTableBody>
    </PTable>
  </div>
</template>
