<script setup lang="ts">
  import {
    PAccordion,
    PBanner,
    PButton,
    PButtonGroup,
    PButtonPure,
    PButtonTile,
    PCarousel,
    PCheckboxWrapper,
    PContentWrapper,
    PDisplay,
    PDivider,
    PFieldsetWrapper,
    PFlex,
    PFlexItem,
    PGrid,
    PGridItem,
    PHeading,
    PHeadline,
    PIcon,
    PInlineNotification,
    PLink,
    PLinkPure,
    PLinkSocial,
    PLinkTile,
    PMarque,
    PModelSignature,
    PorscheDesignSystemProvider,
    PPagination,
    PPopover,
    PRadioButtonWrapper,
    PScroller,
    PSegmentedControl,
    PSegmentedControlItem,
    PSelectWrapper,
    PSpinner,
    PStepperHorizontal,
    PStepperHorizontalItem,
    PSwitch,
    PTable,
    PTableBody,
    PTableCell,
    PTableHead,
    PTableHeadCell,
    PTableHeadRow,
    PTableRow,
    PTabs,
    PTabsBar,
    PTabsItem,
    PTag,
    PTagDismissible,
    PText,
    PTextareaWrapper,
    PTextFieldWrapper,
    PTextList,
    PTextListItem,
  } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="root" style="display: flex">
    <div style="flex: 1">
      <div class="playground light" title="should render default stepper-horizontal">
        <PStepperHorizontal>
          <PStepperHorizontalItem :state="'current'">Step 1</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 2</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 3</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 4</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 5</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 6</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 7</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 8</PStepperHorizontalItem>
          <PStepperHorizontalItem>Step 9</PStepperHorizontalItem>
        </PStepperHorizontal>
      </div>

      <div class="playground light" title="should render default link-tile">
        <PLinkTile :href="'#'" :label="'Some Label'" :description="'Default'">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="50"
            height="50"
            alt="Beach"
          />
        </PLinkTile>
      </div>

      <div class="playground light" title="should render default button-tile">
        <PButtonTile :label="'Some Label'" :description="'Default'">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="50"
            height="50"
            alt="Beach"
          />
        </PButtonTile>
      </div>
    </div>

    <PorscheDesignSystemProvider prefix="my-prefix">
      <div style="flex: 1">
        <div class="playground light" title="should render default stepper-horizontal with custom prefix">
          <PStepperHorizontal>
            <PStepperHorizontalItem :state="'current'">Step 1</PStepperHorizontalItem>
            <PStepperHorizontalItem>Step 2</PStepperHorizontalItem>
            <PStepperHorizontalItem>Step 3</PStepperHorizontalItem>
            <PStepperHorizontalItem>Step 4</PStepperHorizontalItem>
            <PStepperHorizontalItem>Step 5</PStepperHorizontalItem>
            <PStepperHorizontalItem>Step 6</PStepperHorizontalItem>
            <PStepperHorizontalItem>Step 7</PStepperHorizontalItem>
            <PStepperHorizontalItem>Step 8</PStepperHorizontalItem>
            <PStepperHorizontalItem>Step 9</PStepperHorizontalItem>
          </PStepperHorizontal>
        </div>

        <div class="playground light" title="should render default link-tile with custom prefix">
          <PLinkTile :href="'#'" :label="'Some Label'" :description="'Default'">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width="50"
              height="50"
              alt="Beach"
            />
          </PLinkTile>
        </div>

        <div class="playground light" title="should render default button-tile with custom prefix">
          <PButtonTile :label="'Some Label'" :description="'Default'">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width="50"
              height="50"
              alt="Beach"
            />
          </PButtonTile>
        </div>
      </div>
    </PorscheDesignSystemProvider>
  </div>
</template>

<style scoped>
  p-link-tile,
  p-button-tile,
  my-prefix-p-link-tile,
  my-prefix-p-button-tile {
    max-width: 400px;
  }
</style>
