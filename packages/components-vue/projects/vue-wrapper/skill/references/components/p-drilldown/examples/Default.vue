<script setup lang="ts">
  import { ref } from 'vue';
  import { PButton, PDrilldown, PDrilldownItem, PDrilldownLink, type DrilldownUpdateEventDetail } from '@porsche-design-system/components-vue';

  const activeIdentifier = ref(undefined);
  const open = ref(false);

  const onClick = () => {
    open.value = true;
  }
  const onUpdate = (e: CustomEvent<DrilldownUpdateEventDetail>) => {
    activeIdentifier.value = e.detail.activeIdentifier;
  }
  const onDismiss = () => {
    open.value = false;
  }
</script>

<template>
  <nav aria-label="Main">
    <PButton type="button" :aria="{'aria-haspopup': 'dialog'}" @click="onClick">
      Open Drilldown
    </PButton>
    <PDrilldown :open="open" :activeIdentifier="activeIdentifier" @update="onUpdate" @dismiss="onDismiss">
      <PDrilldownItem identifier="id-1" label="Some Label (1)">
        <PDrilldownItem identifier="id-1-1" label="Some Label (1-1)">
          <PDrilldownLink href="#">
            Some anchor (1-1)
          </PDrilldownLink>
          <PDrilldownLink>
            <a href="#">
              Some anchor (1-1)
            </a>
          </PDrilldownLink>
        </PDrilldownItem>
        <PDrilldownItem identifier="id-1-2" label="Some Label (1-2)">
          <PDrilldownLink href="#">
            Some anchor (1-2)
          </PDrilldownLink>
          <PDrilldownLink href="#">
            Some anchor (1-2)
          </PDrilldownLink>
          <PDrilldownLink href="#">
            Some anchor (1-2)
          </PDrilldownLink>
          <PDrilldownItem identifier="id-1-2-1" label="Some Label (1-2-1)">
            <PDrilldownLink href="#">
              Some anchor (1-2-1)
            </PDrilldownLink>
            <PDrilldownLink href="#">
              Some anchor (1-2-1)
            </PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownLink href="#">
            Some anchor (1-2)
          </PDrilldownLink>
        </PDrilldownItem>
        <PDrilldownLink href="#">
          Some anchor (1-1)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (1-1)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (1-1)
        </PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-2" label="Some Label (2)">
        <PDrilldownLink href="#">
          Some anchor (2)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (2)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (2)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (2)
        </PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-3" label="Some Label (3)">
        <PDrilldownLink href="#">
          Some anchor (3)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (3)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (3)
        </PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-4" label="Some Label (4)">
        <PDrilldownLink href="#">
          Some anchor (4)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (4)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (4)
        </PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-5" label="Some Label (5)">
        <PDrilldownLink href="#">
          Some anchor (5)
        </PDrilldownLink>
        <PDrilldownLink href="#">
          Some anchor (5)
        </PDrilldownLink>
      </PDrilldownItem>
    </PDrilldown>
  </nav>
</template>
