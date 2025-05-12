<script setup lang="ts">
import { type AccordionUpdateEventDetail, PAccordion, PButton } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isAccordion1Open = ref(false);
const isAccordion2Open = ref(false);

const onAccordion1Update = (e: AccordionUpdateEventDetail) => {
  isAccordion1Open.value = e.open;
};
const onAccordion2Update = (e: AccordionUpdateEventDetail) => {
  isAccordion2Open.value = e.open;
};
</script>

<template>
  <div :style="{ transform: 'translate3d(0px, 0px, 0px)' }">
    <div class="pds-grid fixed inset-0 pointer-events-none">
      <span class="bg-[rgba(125,0,255,0.1)]" />
      <span class="bg-[rgba(0,0,255,0.1)]" />
      <span class="bg-[rgba(0,0,255,0.1)]" />
      <span class="bg-[rgba(0,0,255,0.1)]" />
      <span class="bg-[rgba(0,0,255,0.1)]" />
      <span class="bg-[rgba(0,0,255,0.1)]" />
      <span class="bg-[rgba(0,0,255,0.1)]" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:bg-[rgba(125,0,255,0.1)]" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(0,0,255,0.1)] max-sm:hidden" />
      <span class="bg-[rgba(125,0,255,0.1)] max-sm:hidden" />
    </div>

    <div class="pds-grid items-end">
      <div class="col-[full] row-1 bg-[rgba(0,0,255,0.25)] h-[clamp(300px,50vh,500px)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover ms-static-sm mt-static-sm">
          <b>Full</b> for Background and Media
        </span>
      </div>
      <div class="col-[wide] row-1 pb-fluid-md flex flex-col justify-end bg-[rgba(0,255,0,0.25)]">
        <h1 class="pds-display-lg">Hero Heading</h1>
        <p class="pds-text-lg mt-fluid-xs">Subline for the Hero Header in Wide Grid</p>
      </div>
    </div>

    <div class="pds-grid mt-fluid-lg">
      <div class="col-[wide] sm:col-[var(--pds-grid-wide-start)_/_span_5] p-fluid-md rounded-lg bg-[rgba(255,125,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Wide Sidebar</b></span>
        <PAccordion heading="Some Heading" tag="h3" />
        <PAccordion heading="Some Heading" tag="h3" />
        <PAccordion heading="Some Heading" tag="h3" />
      </div>
      <div class="col-[wide] sm:col-[span_11_/_var(--pds-grid-wide-end)] p-fluid-md rounded-lg bg-[rgba(255,125,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Wide Content</b></span>
      </div>
    </div>

    <div class="pds-grid mt-fluid-lg">
      <div class="col-start-(--pds-grid-extended-start) col-span-(--pds-grid-extended-one-half) p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
      <div class="col-end-(--pds-grid-extended-end) col-span-(--pds-grid-extended-one-half) p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
    </div>

    <div class="pds-grid mt-fluid-md">
      <div class="col-[extended] sm:col-start-(--pds-grid-extended-start) sm:col-span-8 sm:row-span-2 p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Custom (column desktop: 2-9)</b> for Image Grids</span>
      </div>
      <div class="col-start-(--pds-grid-extended-start) col-span-(--pds-grid-extended-one-half) sm:col-span-6 sm:col-end-(--pds-grid-extended-end) p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Custom (column desktop: 10-15)</b> for Image Grids</span>
      </div>
      <div class="col-span-(--pds-grid-extended-one-half) col-end-(--pds-grid-extended-end) sm:col-span-5 sm:col-end-(--pds-grid-basic-end) p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Custom (column desktop: 10-14)</b> for Image Grids</span>
      </div>
    </div>

    <div class="pds-grid mt-fluid-lg">
      <div class="col-[full] row-1 bg-[rgba(0,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover ms-static-sm mt-static-sm">
          <b>Full</b> for Teaser Backgrounds and Media (Former Basic)
        </span>
      </div>
      <div class="col-[basic] row-1 my-fluid-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Basic</b> for Content in Teaser</span>
        <h2 class="pds-heading-xl">Heading in Teaser</h2>
        <p class="pds-text-sm mt-fluid-xs">Subline or Copy Text in Large Teaser</p>
        <PButton class="mt-fluid-md" variant="secondary">Some label</PButton>
      </div>
    </div>

    <div class="pds-grid mt-fluid-lg">
      <div class="col-[basic] p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Basic</b> for Content Tiles</span>
        <h3 class="pds-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">Some label</PButton>
      </div>
      <div class="col-start-(--pds-grid-basic-start) col-span-(--pds-grid-basic-one-half) p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Basic Half</b> for Content Tiles</span>
        <h3 class="pds-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">Some label</PButton>
      </div>
      <div class="col-span-(--pds-grid-basic-one-half) col-end-(--pds-grid-basic-end) p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover"><b>Basic Half</b> for Content Tiles</span>
        <h3 class="pds-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">Some label</PButton>
      </div>
      <div class="col-[basic] sm:col-start-(--pds-grid-basic-start) sm:col-span-(--pds-grid-basic-one-third) p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 class="pds-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">
          Some label
        </PButton>
      </div>
      <div class="col-[basic] sm:col-span-(--pds-grid-basic-one-third) p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 class="pds-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">
          Some label
        </PButton>
      </div>
      <div class="col-[basic] sm:col-span-(--pds-grid-basic-one-third) sm:col-end-(--pds-grid-basic-end) p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 class="pds-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">
          Some label
        </PButton>
      </div>
      <div class="col-[basic] sm:col-start-(--pds-grid-basic-start) sm:col-span-(--pds-grid-basic-two-thirds) p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Basic Two Thirds</b> for Content Tiles
        </span>
      </div>
      <div class="col-[basic] sm:col-span-(--pds-grid-basic-one-third) sm:col-end-(--pds-grid-basic-end) p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Basic One Third</b> for Content Tiles
        </span>
      </div>
      <div class="col-[basic] sm:col-start-(--pds-grid-basic-start) sm:col-span-5 p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Custom (desktop: column 3-7)</b> for Content
        </span>
      </div>
      <div class="col-[basic] sm:col-span-6 sm:col-end-(--pds-grid-basic-end) p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Custom (desktop: column 9-14)</b> for Content
        </span>
      </div>
    </div>

    <div class="pds-grid mt-fluid-lg">
      <div class="col-[narrow] rounded-lg bg-[rgba(255,255,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover ms-static-sm mt-static-sm">
          <b>Narrow</b> for small Components and Content
        </span>
        <PAccordion heading="Some Heading" tag="h3" :open="isAccordion1Open" @update="onAccordion1Update">
          <p class="pds-text-sm mt-fluid-xs">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam felis, ultricies nec, pellentesque eu. Aenean massa.
          </p>
        </PAccordion>
        <PAccordion heading="Some Heading" tag="h3" :open="isAccordion2Open" @update="onAccordion2Update">
          <p class="pds-text-sm mt-fluid-xs">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam felis, ultricies nec, pellentesque eu. Aenean massa.
          </p>
        </PAccordion>
      </div>
      <div class="col-start-(--pds-grid-narrow-start) col-span-(--pds-grid-narrow-one-half) p-fluid-sm rounded-lg bg-[rgba(255,255,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Narrow</b> Half for small Content Tiles
        </span>
        <h3 class="pds-heading-lg">Experience</h3>
        <p class="pds-text-sm mt-fluid-xs">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
          to your wishes.
        </p>
      </div>
      <div class="col-span-(--pds-grid-narrow-one-half) col-end-(--pds-grid-narrow-end) p-fluid-sm rounded-lg bg-[rgba(255,255,0,0.25)]">
        <span class="pds-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-state-hover">
          <b>Narrow</b> Half for small Content Tiles
        </span>
        <h3 class="pds-heading-lg">Experience</h3>
        <p class="pds-text-sm mt-fluid-xs">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
          to your wishes.
        </p>
      </div>
    </div>
  </div>
</template>
