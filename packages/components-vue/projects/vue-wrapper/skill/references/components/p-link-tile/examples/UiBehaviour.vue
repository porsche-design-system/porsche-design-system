<script setup lang="ts">
  import { PLinkTile, PTag } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="grid grid-cols-2 gap-static-md">
    <PLinkTile aspectRatio="4/3" href="#" label="Some Label" size="large" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.">
      <PTag slot="header" color="background-frosted" :compact="true">
        4/3
      </PTag>
      <img src="assets/lights.jpg" alt="Some image description" />
    </PLinkTile>
    <PLinkTile aspectRatio="4/3" href="#" label="Some Label" description="Some description">
      <PTag slot="header" color="background-frosted" compact="true">
        4/3
      </PTag>
      <img src="assets/lights.jpg" alt="Some image description" />
    </PLinkTile>
    <PLinkTile aspectRatio="1/1" href="#" label="Some Label" description="Some description">
      <PTag slot="header" color="background-frosted" compact="true">
        1/1
      </PTag>
      <img src="assets/lights.jpg" alt="Some image description" />
    </PLinkTile>
    <PLinkTile aspectRatio="9/16" href="#" label="Some Label" description="Some description">
      <PTag slot="header" color="background-frosted" compact="true">
        9/16
      </PTag>
      <img src="assets/lights.jpg" alt="Some image description" />
    </PLinkTile>
    <PLinkTile aspectRatio="1/1" href="#" label="Some Label" description="Some description">
      <PTag slot="header" color="background-frosted" compact="true">
        1/1
      </PTag>
      <img src="assets/lights.jpg" alt="Some image description" />
    </PLinkTile>
  </div>
</template>
