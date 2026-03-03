<script setup lang="ts">
import { type AccordionUpdateEventDetail, PAccordion, PButton } from '@porsche-design-system/components-vue';
import { spacingFluidMedium, spacingStaticSmall } from '@porsche-design-system/components-vue/vanilla-extract';
import { ref } from 'vue';
import {
  BasicContent,
  BasicContentCustomLeft,
  BasicContentCustomRight,
  BasicContentGrid,
  BasicContentHalfLeft,
  BasicContentHalfRight,
  BasicContentOneThirdFollow,
  BasicContentOneThirdLeft,
  BasicContentOneThirdRight,
  BasicContentTwoThirdsLeft,
  Display,
  ExtendedContentGrid,
  ExtendedContentHalfLeft,
  ExtendedContentHalfRight,
  Heading,
  HeadingXLarge,
  HeroGrid,
  HeroHeader,
  HeroMedia,
  Info,
  MasonryCustom1,
  MasonryCustom2,
  MasonryCustom3,
  MasonryGrid,
  NarrowContent,
  NarrowContentGrid,
  NarrowContentHalfLeft,
  NarrowContentHalfRight,
  TeaserContent,
  TeaserGrid,
  TeaserMedia,
  Text,
  TextLarge,
  VisualizeGrid,
  VisualizeGridColumns,
  WideContent,
  WideGrid,
  WideSidebar,
} from './grid-layout.css';

const props = defineProps({
  visualizeGrid: {
    type: Boolean,
    default: true,
  },
});

const isAccordion1Open = ref(false);
const isAccordion2Open = ref(false);

const onAccordion1Update = (e: CustomEvent<AccordionUpdateEventDetail>) => {
  isAccordion1Open.value = e.detail.open;
};
const onAccordion2Update = (e: CustomEvent<AccordionUpdateEventDetail>) => {
  isAccordion2Open.value = e.detail.open;
};
</script>

<template>
  <div :style="{ transform: 'translate3d(0px, 0px, 0px)' }">
    <div :class="VisualizeGrid" v-if="visualizeGrid">
      <span :class="VisualizeGridColumns" v-for="i in 18" :key="i" />
    </div>

    <div :class="HeroGrid">
      <div :class="HeroMedia">
        <span :class="Info" :style="{ marginLeft: spacingStaticSmall, marginTop: spacingStaticSmall }">
          <b>Full</b> for Background and Media
        </span>
      </div>
      <div :class="HeroHeader">
        <h1 :class="Display">Hero Heading</h1>
        <p :class="TextLarge">Subline for the Hero Header in Wide Grid</p>
      </div>
    </div>

    <div :class="WideGrid">
      <div :class="WideSidebar">
        <span :class="Info"><b>Wide Sidebar</b></span>
        <PAccordion heading="Some Heading" tag="h3" />
        <PAccordion heading="Some Heading" tag="h3" />
        <PAccordion heading="Some Heading" tag="h3" />
      </div>
      <div :class="WideContent">
        <span :class="Info"><b>Wide Content</b></span>
      </div>
    </div>

    <div :class="ExtendedContentGrid">
      <div :class="ExtendedContentHalfLeft">
        <span :class="Info"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
      <div :class="ExtendedContentHalfRight">
        <span :class="Info"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
    </div>

    <div :class="MasonryGrid">
      <div :class="MasonryCustom1">
        <span :class="Info"><b>Custom (column desktop: 2-9)</b> for Image Grids</span>
      </div>
      <div :class="MasonryCustom2">
        <span :class="Info"><b>Custom (column desktop: 10-15)</b> for Image Grids</span>
      </div>
      <div :class="MasonryCustom3">
        <span :class="Info"><b>Custom (column desktop: 10-14)</b> for Image Grids</span>
      </div>
    </div>

    <div :class="TeaserGrid">
      <div :class="TeaserMedia">
        <span :class="Info" :style="{ marginLeft: spacingStaticSmall, marginTop: spacingStaticSmall }">
          <b>Full</b> for Teaser Backgrounds and Media (Former Basic)
        </span>
      </div>
      <div :class="TeaserContent">
        <span :class="Info"><b>Basic</b> for Content in Teaser</span>
        <h2 :class="HeadingXLarge">Heading in Teaser</h2>
        <p :class="Text">Subline or Copy Text in Large Teaser</p>
        <PButton :style="{ marginTop: spacingFluidMedium }" variant="secondary">Some label</PButton>
      </div>
    </div>

    <div :class="BasicContentGrid">
      <div :class="BasicContent">
        <span :class="Info"><b>Basic</b> for Content Tiles</span>
        <h3 :class="Heading">Heading in Tile</h3>
        <PButton :style="{ marginTop: spacingFluidMedium }" variant="secondary">Some label</PButton>
      </div>
      <div :class="BasicContentHalfLeft">
        <span :class="Info"><b>Basic Half</b> for Content Tiles</span>
        <h3 :class="Heading">Heading in Tile</h3>
        <PButton :style="{ marginTop: spacingFluidMedium }" variant="secondary">Some label</PButton>
      </div>
      <div :class="BasicContentHalfRight">
        <span :class="Info"><b>Basic Half</b> for Content Tiles</span>
        <h3 :class="Heading">Heading in Tile</h3>
        <PButton :style="{ marginTop: spacingFluidMedium }" variant="secondary">Some label</PButton>
      </div>
      <div :class="BasicContentOneThirdLeft">
        <span :class="Info">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 :class="Heading">Heading in Tile</h3>
        <PButton :style="{ marginTop: spacingFluidMedium }" variant="secondary">
          Some label
        </PButton>
      </div>
      <div :class="BasicContentOneThirdFollow">
        <span :class="Info">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 :class="Heading">Heading in Tile</h3>
        <PButton :style="{ marginTop: spacingFluidMedium }" variant="secondary">
          Some label
        </PButton>
      </div>
      <div :class="BasicContentOneThirdFollow">
        <span :class="Info">
          <b>Basic Third</b> for Content Tiles
        </span>
        <h3 :class="Heading">Heading in Tile</h3>
        <PButton :style="{ marginTop: spacingFluidMedium }" variant="secondary">
          Some label
        </PButton>
      </div>
      <div :class="BasicContentTwoThirdsLeft">
        <span :class="Info">
          <b>Basic Two Thirds</b> for Content Tiles
        </span>
      </div>
      <div :class="BasicContentOneThirdRight">
        <span :class="Info">
          <b>Basic One Third</b> for Content Tiles
        </span>
      </div>
      <div :class="BasicContentCustomLeft">
        <span :class="Info">
          <b>Custom (desktop: column 3-7)</b> for Content
        </span>
      </div>
      <div :class="BasicContentCustomRight">
        <span :class="Info">
          <b>Custom (desktop: column 9-14)</b> for Content
        </span>
      </div>
    </div>

    <div :class="NarrowContentGrid">
      <div :class="NarrowContent">
        <span :class="Info" :style="{ marginLeft: spacingStaticSmall, marginTop: spacingStaticSmall }">
          <b>Narrow</b> for small Components and Content
        </span>
        <PAccordion heading="Some Heading" tag="h3" :open="isAccordion1Open" @update="onAccordion1Update">
          <p :class="Text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam felis, ultricies nec, pellentesque eu. Aenean massa.
          </p>
        </PAccordion>
        <PAccordion heading="Some Heading" tag="h3" :open="isAccordion2Open" @update="onAccordion2Update">
          <p :class="Text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam felis, ultricies nec, pellentesque eu. Aenean massa.
          </p>
        </PAccordion>
      </div>
      <div :class="NarrowContentHalfLeft">
        <span :class="Info">
          <b>Narrow</b> Half for small Content Tiles
        </span>
        <h3 :class="Heading">Experience</h3>
        <p :class="Text">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
          to your wishes.
        </p>
      </div>
      <div :class="NarrowContentHalfRight">
        <span :class="Info">
          <b>Narrow</b> Half for small Content Tiles
        </span>
        <h3 :class="Heading">Experience</h3>
        <p :class="Text">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according
          to your wishes.
        </p>
      </div>
    </div>
  </div>
</template>
