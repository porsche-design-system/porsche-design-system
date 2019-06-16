# Select

## Introduction

### Default

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-select name="some-name" value="Some value" label="Some label"></p-select>
  </template>
</Playground>

---

### Edge Cases

Visualization of edge cases

#### Long text

<Playground :themeable="false">
  <template v-slot="slotProps">
    <div style="max-width: 320px;">
      <p-select name="some-name" value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." label="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."></p-select>
    </div>
  </template>
</Playground>
