# Spinner

## Introduction
Basic animated spinner to visualize loading states, e.g. page loading, form validation, etc. The Spinner component sizes are predefined.

### X-small

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-spinner size="x-small" ally-label="Loading" :theme="slotProps.theme" />
  </template>
</Playground>

### Small

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-spinner size="small" ally-label="Loading" :theme="slotProps.theme" />
  </template>
</Playground>

### Medium

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-spinner size="medium" ally-label="Loading" :theme="slotProps.theme" />
  </template>
</Playground>

### Large

<Playground :themeable="true">
  <template v-slot="slotProps">
    <p-spinner size="large" ally-label="Loading" :theme="slotProps.theme" />
  </template>
</Playground>