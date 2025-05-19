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
    <div class="grid-template fixed inset-0 pointer-events-none">
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

    <div class="grid-template items-end">
      <div class="col-full row-1 bg-[rgba(0,0,255,0.25)] h-[clamp(300px,50vh,500px)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover ms-static-sm mt-static-sm">
          <b>Full</b> for Background and Media
        </span>
      </div>
      <div class="col-wide row-1 pb-fluid-md flex flex-col justify-end bg-[rgba(0,255,0,0.25)]">
        <h1 class="prose-display-lg">Hero Heading</h1>
        <p class="prose-text-lg mt-fluid-xs">Subline for the Hero Header in Wide Grid</p>
      </div>
    </div>

    <div class="grid-template mt-fluid-lg">
      <div class="col-wide sm:col-start-wide sm:col-span-5 p-fluid-md rounded-lg bg-[rgba(255,125,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Wide Sidebar</b></span>
        <PAccordion heading="Some Heading" tag="h3" />
        <PAccordion heading="Some Heading" tag="h3" />
        <PAccordion heading="Some Heading" tag="h3" />
      </div>
      <div class="col-wide sm:col-span-11 sm:col-end-wide p-fluid-md rounded-lg bg-[rgba(255,125,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Wide Content</b></span>
      </div>
    </div>

    <div class="grid-template mt-fluid-lg">
      <div class="col-start-extended col-span-one-half p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
      <div class="col-end-extended col-span-one-half p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
    </div>

    <div class="grid-template mt-fluid-md">
      <div class="col-extended sm:col-start-extended sm:col-span-8 sm:row-span-2 p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Custom (column desktop: 2-9)</b> for Image Grids</span>
      </div>
      <div class="col-start-extended col-span-one-half sm:col-span-6 sm:col-end-extended p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Custom (column desktop: 10-15)</b> for Image Grids</span>
      </div>
      <div class="col-span-one-half col-end-extended sm:col-span-5 sm:col-end-basic p-fluid-md rounded-lg bg-[rgba(0,255,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Custom (column desktop: 10-14)</b> for Image Grids</span>
      </div>
    </div>

    <div class="grid-template mt-fluid-lg">
      <div class="col-full row-1 bg-[rgba(0,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover ms-static-sm mt-static-sm">
          <b>Full</b> for Teaser Backgrounds and Media (Former Basic)
        </span>
      </div>
      <div class="col-basic row-1 my-fluid-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Basic</b> for Content in Teaser</span>
        <h2 class="prose-heading-xl">Heading in Teaser</h2>
        <p class="prose-text-sm mt-fluid-xs">Subline or Copy Text in Large Teaser</p>
        <PButton class="mt-fluid-md" variant="secondary">Some label</PButton>
      </div>
    </div>

    <div class="grid-template mt-fluid-lg">
      <div class="col-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Basic</b> for Content Tiles</span>
        <h3 class="prose-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">Some label</PButton>
      </div>
      <div class="col-start-basic col-span-one-half p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Basic Half</b> for Content Tiles</span>
        <h3 class="prose-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">Some label</PButton>
      </div>
      <div class="col-span-one-half col-end-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover"><b>Basic Half</b> for Content Tiles</span>
        <h3 class="prose-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">Some label</PButton>
      </div>
      <div class="col-basic sm:col-start-basic sm:col-span-one-third p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 class="prose-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">
          Some label
        </PButton>
      </div>
      <div class="col-basic sm:col-span-one-third p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 class="prose-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">
          Some label
        </PButton>
      </div>
      <div class="col-basic sm:col-span-one-third sm:col-end-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 class="prose-heading-lg">Heading in Tile</h3>
        <PButton class="mt-fluid-md" variant="secondary">
          Some label
        </PButton>
      </div>
      <div class="col-basic sm:col-start-basic sm:col-span-two-thirds p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Basic Two Thirds</b> for Content Tiles
        </span>
      </div>
      <div class="col-basic sm:col-span-one-third sm:col-end-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Basic One Third</b> for Content Tiles
        </span>
      </div>
      <div class="col-basic sm:col-start-basic sm:col-span-5 p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Custom (desktop: column 3-7)</b> for Content
        </span>
      </div>
      <div class="col-basic sm:col-span-6 sm:col-end-basic p-fluid-md rounded-lg bg-[rgba(255,0,255,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Custom (desktop: column 9-14)</b> for Content
        </span>
      </div>
    </div>

    <div class="grid-template mt-fluid-lg">
      <div class="col-narrow rounded-lg bg-[rgba(255,255,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover ms-static-sm mt-static-sm">
          <b>Narrow</b> for small Components and Content
        </span>
        <PAccordion heading="Some Heading" tag="h3" :open="isAccordion1Open" @update="onAccordion1Update">
          <p class="prose-text-sm mt-fluid-xs">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam felis, ultricies nec, pellentesque eu. Aenean massa.
          </p>
        </PAccordion>
        <PAccordion heading="Some Heading" tag="h3" :open="isAccordion2Open" @update="onAccordion2Update">
          <p class="prose-text-sm mt-fluid-xs">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam felis, ultricies nec, pellentesque eu. Aenean massa.
          </p>
        </PAccordion>
      </div>
      <div class="col-start-narrow col-span-one-half p-fluid-sm rounded-lg bg-[rgba(255,255,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Narrow</b> Half for small Content Tiles
        </span>
        <h3 class="prose-heading-lg">Experience</h3>
        <p class="prose-text-sm mt-fluid-xs">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
          to your wishes.
        </p>
      </div>
      <div class="col-span-one-half col-end-narrow p-fluid-sm rounded-lg bg-[rgba(255,255,0,0.25)]">
        <span class="prose-text-xs inline-block align-top rounded-sm mb-fluid-sm py-static-xs px-static-sm bg-hover">
          <b>Narrow</b> Half for small Content Tiles
        </span>
        <h3 class="prose-heading-lg">Experience</h3>
        <p class="prose-text-sm mt-fluid-xs">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
          to your wishes.
        </p>
      </div>
    </div>
  </div>
</template>
