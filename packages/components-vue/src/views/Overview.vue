<script setup lang="ts">
  import PAccordion from '../../projects/vue-wrapper/src/lib/components/accordion.wrapper.vue';
  import PBanner from '../../projects/vue-wrapper/src/lib/components/banner.wrapper.vue';
  import PButton from '../../projects/vue-wrapper/src/lib/components/button.wrapper.vue';
  import PButtonGroup from '../../projects/vue-wrapper/src/lib/components/button-group.wrapper.vue';
  import PButtonPure from '../../projects/vue-wrapper/src/lib/components/button-pure.wrapper.vue';
  import PCarousel from '../../projects/vue-wrapper/src/lib/components/carousel.wrapper.vue';
  import PCheckboxWrapper from '../../projects/vue-wrapper/src/lib/components/checkbox-wrapper.wrapper.vue';
  import PContentWrapper from '../../projects/vue-wrapper/src/lib/components/content-wrapper.wrapper.vue';
  import PDivider from '../../projects/vue-wrapper/src/lib/components/divider.wrapper.vue';
  import PFieldsetWrapper from '../../projects/vue-wrapper/src/lib/components/fieldset-wrapper.wrapper.vue';
  import PFlex from '../../projects/vue-wrapper/src/lib/components/flex.wrapper.vue';
  import PFlexItem from '../../projects/vue-wrapper/src/lib/components/flex-item.wrapper.vue';
  import PGrid from '../../projects/vue-wrapper/src/lib/components/grid.wrapper.vue';
  import PGridItem from '../../projects/vue-wrapper/src/lib/components/grid-item.wrapper.vue';
  import PHeadline from '../../projects/vue-wrapper/src/lib/components/headline.wrapper.vue';
  import PIcon from '../../projects/vue-wrapper/src/lib/components/icon.wrapper.vue';
  import PInlineNotification from '../../projects/vue-wrapper/src/lib/components/inline-notification.wrapper.vue';
  import PLink from '../../projects/vue-wrapper/src/lib/components/link.wrapper.vue';
  import PLinkPure from '../../projects/vue-wrapper/src/lib/components/link-pure.wrapper.vue';
  import PLinkSocial from '../../projects/vue-wrapper/src/lib/components/link-social.wrapper.vue';
  import PLinkTile from '../../projects/vue-wrapper/src/lib/components/link-tile.wrapper.vue';
  import PMarque from '../../projects/vue-wrapper/src/lib/components/marque.wrapper.vue';
  import PModal from '../../projects/vue-wrapper/src/lib/components/modal.wrapper.vue';
  import PPagination from '../../projects/vue-wrapper/src/lib/components/pagination.wrapper.vue';
  import PPopover from '../../projects/vue-wrapper/src/lib/components/popover.wrapper.vue';
  import PRadioButtonWrapper from '../../projects/vue-wrapper/src/lib/components/radio-button-wrapper.wrapper.vue';
  import PScroller from '../../projects/vue-wrapper/src/lib/components/scroller.wrapper.vue';
  import PSegmentedControl from '../../projects/vue-wrapper/src/lib/components/segmented-control.wrapper.vue';
  import PSegmentedControlItem from '../../projects/vue-wrapper/src/lib/components/segmented-control-item.wrapper.vue';
  import PSelectWrapper from '../../projects/vue-wrapper/src/lib/components/select-wrapper.wrapper.vue';
  import PSpinner from '../../projects/vue-wrapper/src/lib/components/spinner.wrapper.vue';
  import PStepperHorizontal from '../../projects/vue-wrapper/src/lib/components/stepper-horizontal.wrapper.vue';
  import PStepperHorizontalItem from '../../projects/vue-wrapper/src/lib/components/stepper-horizontal-item.wrapper.vue';
  import PSwitch from '../../projects/vue-wrapper/src/lib/components/switch.wrapper.vue';
  import PTable from '../../projects/vue-wrapper/src/lib/components/table.wrapper.vue';
  import PTableBody from '../../projects/vue-wrapper/src/lib/components/table-body.wrapper.vue';
  import PTableCell from '../../projects/vue-wrapper/src/lib/components/table-cell.wrapper.vue';
  import PTableHead from '../../projects/vue-wrapper/src/lib/components/table-head.wrapper.vue';
  import PTableHeadCell from '../../projects/vue-wrapper/src/lib/components/table-head-cell.wrapper.vue';
  import PTableHeadRow from '../../projects/vue-wrapper/src/lib/components/table-head-row.wrapper.vue';
  import PTableRow from '../../projects/vue-wrapper/src/lib/components/table-row.wrapper.vue';
  import PTabs from '../../projects/vue-wrapper/src/lib/components/tabs.wrapper.vue';
  import PTabsBar from '../../projects/vue-wrapper/src/lib/components/tabs-bar.wrapper.vue';
  import PTabsItem from '../../projects/vue-wrapper/src/lib/components/tabs-item.wrapper.vue';
  import PTag from '../../projects/vue-wrapper/src/lib/components/tag.wrapper.vue';
  import PTagDismissible from '../../projects/vue-wrapper/src/lib/components/tag-dismissible.wrapper.vue';
  import PText from '../../projects/vue-wrapper/src/lib/components/text.wrapper.vue';
  import PTextFieldWrapper from '../../projects/vue-wrapper/src/lib/components/text-field-wrapper.wrapper.vue';
  import PTextList from '../../projects/vue-wrapper/src/lib/components/text-list.wrapper.vue';
  import PTextListItem from '../../projects/vue-wrapper/src/lib/components/text-list-item.wrapper.vue';
  import PTextareaWrapper from '../../projects/vue-wrapper/src/lib/components/textarea-wrapper.wrapper.vue';
  import PToast from '../../projects/vue-wrapper/src/lib/components/toast.wrapper.vue';
</script>

<template>
  <div class="root" style="display: flex">
    <div style="flex: 1">
      <div class="playground light" title="should render default headline">
        <PHeadline>Default Components</PHeadline>
      </div>

      <div class="playground light" title="should render default inline-notification">
        <PInlineNotification heading="Some heading" description="Some description" />
      </div>

      <div class="playground light" title="should render default popover">
        <PPopover direction="right">Some popover content</PPopover>
      </div>

      <div class="playground light" title="should render default divider">
        <PDivider />
      </div>

      <div class="playground light" title="should render default button">
        <PButton>Some label</PButton>
      </div>

      <div class="playground light" title="should render default button-group">
        <PButtonGroup>
          <PButton>Some label</PButton>
          <PButton>Some label</PButton>
        </PButtonGroup>
      </div>

      <div class="playground light" title="should render default button-pure">
        <PButtonPure>Some label</PButtonPure>
      </div>

      <div class="playground light" title="should render default checkbox-wrapper">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" />
        </PCheckboxWrapper>
      </div>

      <div class="playground light" title="should render default radio-button-wrapper">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" />
        </PRadioButtonWrapper>
      </div>

      <div class="playground light" title="should render default select-wrapper">
        <PSelectWrapper label="Some label">
          <select>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div class="playground light" title="should render default text-field-wrapper">
        <PTextFieldWrapper label="Some label">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div class="playground light" title="should render default textarea-wrapper">
        <PTextareaWrapper label="Some label">
          <textarea />
        </PTextareaWrapper>
      </div>

      <div class="playground light" title="should render default fieldset-wrapper">
        <PFieldsetWrapper label="Some label" />
      </div>

      <div class="playground light" title="should render default content-wrapper">
        <PContentWrapper>
          <p>Some content</p>
        </PContentWrapper>
      </div>

      <div class="playground light" title="should render default text">
        <PText>The quick brown fox jumps over the lazy dog</PText>
      </div>

      <div class="playground light" title="should render default text-list">
        <PTextList>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
        </PTextList>
      </div>

      <div class="playground light" title="should render default icon">
        <PIcon />
      </div>

      <div class="playground light" title="should render default link">
        <PLink href="https://www.porsche.com">Some label</PLink>
      </div>

      <div class="playground light" title="should render default link-pure">
        <PLinkPure href="https://www.porsche.com">Some label</PLinkPure>
      </div>

      <div class="playground light" title="should render default link-social">
        <PLinkSocial href="https://www.porsche.com" icon="logo-facebook">Some label</PLinkSocial>
      </div>

      <div class="playground light" title="should render default marque">
        <PMarque />
      </div>

      <div class="playground light" title="should render default pagination">
        <PPagination totalItemsCount="{500}" itemsPerPage="{25}" activePage="{1}" />
      </div>

      <div class="playground light" title="should render default table">
        <PTable>
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell>Column 1</PTableHeadCell>
              <PTableHeadCell>Column 2</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
          <PTableBody>
            <PTableRow>
              <PTableCell>Cell 1</PTableCell>
              <PTableCell>Cell 2</PTableCell>
            </PTableRow>
          </PTableBody>
        </PTable>
      </div>

      <div class="playground light" title="should render default tabs">
        <PTabs activeTabIndex="{0}">
          <PTabsItem label="Tab1">Content 1</PTabsItem>
          <PTabsItem label="Tab2">Content 2</PTabsItem>
          <PTabsItem label="Tab3">Content 3</PTabsItem>
        </PTabs>
      </div>

      <div class="playground light" title="should render default tabs-bar">
        <PTabsBar activeTabIndex="{0}">
          <button>Tab1</button>
          <button>Tab2</button>
          <button>Tab3</button>
        </PTabsBar>
      </div>

      <div class="playground light" title="should render default accordion">
        <PAccordion heading="Some accordion heading">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
      </div>

      <div class="playground light" title="should render default spinner">
        <PSpinner />
      </div>

      <div class="playground light" title="should render default flex">
        <PFlex>
          <PFlexItem><p>1</p></PFlexItem>
          <PFlexItem><p>2</p></PFlexItem>
        </PFlex>
      </div>

      <div class="playground light" title="should render default grid">
        <PGrid>
          <PGridItem size="{6}"><p>1</p></PGridItem>
          <PGridItem size="{6}"><p>2</p></PGridItem>
        </PGrid>
      </div>

      <div class="playground light" title="should render default tag">
        <PTag>Some Tag</PTag>
      </div>

      <div class="playground light" title="should render default tag-dismissible">
        <PTagDismissible>Some Tag</PTagDismissible>
      </div>

      <div class="playground light" title="should render default segmented-control">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl">XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div class="playground light" title="should render default stepper-horizontal">
        <PStepperHorizontal>
          <PStepperHorizontalItem state="current">Step 1</PStepperHorizontalItem>
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
        <PLinkTile href="#" label="Some Label" description="Default">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="{50}"
            height="{50}"
            alt="Beach"
          />
        </PLinkTile>
      </div>

      <div class="playground light" title="should render default carousel">
        <PCarousel heading="Heading">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>
    </div>

    <!--    <PorscheDesignSystemProvider prefix="my-prefix">-->
    <div style="flex: 1">
      <div class="playground light" title="should render default headline with custom prefix">
        <PHeadline>Prefixed Components</PHeadline>
      </div>

      <div class="playground light" title="should render default inline-notification with custom prefix">
        <PInlineNotification heading="Some heading" description="Some description" />
      </div>

      <div class="playground light" title="should render default popover with custom prefix">
        <PPopover direction="right">Some popover content</PPopover>
      </div>

      <div class="playground light" title="should render default divider with custom prefix">
        <PDivider />
      </div>

      <div class="playground light" title="should render default button with custom prefix">
        <PButton>Some label</PButton>
      </div>

      <div class="playground light" title="should render default button-group with custom prefix">
        <PButtonGroup>
          <PButton>Some label</PButton>
          <PButton>Some label</PButton>
        </PButtonGroup>
      </div>

      <div class="playground light" title="should render default button-pure with custom prefix">
        <PButtonPure>Some label</PButtonPure>
      </div>

      <div class="playground light" title="should render default checkbox-wrapper with custom prefix">
        <PCheckboxWrapper label="Some label">
          <input type="checkbox" />
        </PCheckboxWrapper>
      </div>

      <div class="playground light" title="should render default radio-button-wrapper with custom prefix">
        <PRadioButtonWrapper label="Some label">
          <input type="radio" />
        </PRadioButtonWrapper>
      </div>

      <div class="playground light" title="should render default select-wrapper with custom prefix">
        <PSelectWrapper label="Some label">
          <select>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div class="playground light" title="should render default text-field-wrapper with custom prefix">
        <PTextFieldWrapper label="Some label">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div class="playground light" title="should render default textarea-wrapper with custom prefix">
        <PTextareaWrapper label="Some label">
          <textarea />
        </PTextareaWrapper>
      </div>

      <div class="playground light" title="should render default fieldset-wrapper with custom prefix">
        <PFieldsetWrapper label="Some label" />
      </div>

      <div class="playground light" title="should render default content-wrapper with custom prefix">
        <PContentWrapper>
          <p>Some content</p>
        </PContentWrapper>
      </div>

      <div class="playground light" title="should render default text with custom prefix">
        <PText>The quick brown fox jumps over the lazy dog</PText>
      </div>

      <div class="playground light" title="should render default text-list with custom prefix">
        <PTextList>
          <PTextListItem>The quick brown fox jumps over the lazy dog</PTextListItem>
        </PTextList>
      </div>

      <div class="playground light" title="should render default icon with custom prefix">
        <PIcon />
      </div>

      <div class="playground light" title="should render default link with custom prefix">
        <PLink href="https://www.porsche.com">Some label</PLink>
      </div>

      <div class="playground light" title="should render default link-pure with custom prefix">
        <PLinkPure href="https://www.porsche.com">Some label</PLinkPure>
      </div>

      <div class="playground light" title="should render default link-social with custom prefix">
        <PLinkSocial href="https://www.porsche.com" icon="logo-facebook">Some label</PLinkSocial>
      </div>

      <div class="playground light" title="should render default marque with custom prefix">
        <PMarque />
      </div>

      <div class="playground light" title="should render default pagination with custom prefix">
        <PPagination totalItemsCount="{500}" itemsPerPage="{25}" activePage="{1}" />
      </div>

      <div class="playground light" title="should render default table with custom prefix">
        <PTable>
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell>Column 1</PTableHeadCell>
              <PTableHeadCell>Column 2</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
          <PTableBody>
            <PTableRow>
              <PTableCell>Cell 1</PTableCell>
              <PTableCell>Cell 2</PTableCell>
            </PTableRow>
          </PTableBody>
        </PTable>
      </div>

      <div class="playground light" title="should render default tabs with custom prefix">
        <PTabs>
          <PTabsItem label="Tab1">Content 1</PTabsItem>
          <PTabsItem label="Tab2">Content 2</PTabsItem>
          <PTabsItem label="Tab3">Content 3</PTabsItem>
        </PTabs>
      </div>

      <div class="playground light" title="should render default tabs-bar with custom prefix">
        <PTabsBar activeTabIndex="{0}">
          <button>Tab1</button>
          <button>Tab2</button>
          <button>Tab3</button>
        </PTabsBar>
      </div>

      <div class="playground light" title="should render default accordion with custom prefix">
        <PAccordion heading="Some accordion heading">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </PAccordion>
      </div>

      <div class="playground light" title="should render default spinner with custom prefix">
        <PSpinner />
      </div>

      <div class="playground light" title="should render default flex with custom prefix">
        <PFlex>
          <PFlexItem><p>1</p></PFlexItem>
          <PFlexItem><p>2</p></PFlexItem>
        </PFlex>
      </div>

      <div class="playground light" title="should render default grid with custom prefix">
        <PGrid>
          <PGridItem size="{6}"><p>1</p></PGridItem>
          <PGridItem size="{6}"><p>2</p></PGridItem>
        </PGrid>
      </div>

      <div class="playground light" title="should render default tag with custom prefix">
        <PTag>Some Tag</PTag>
      </div>

      <div class="playground light" title="should render default tag-dismissible with custom prefix">
        <PTagDismissible>Some Tag</PTagDismissible>
      </div>

      <div class="playground light" title="should render default segmented-control with custom prefix">
        <PSegmentedControl value="s">
          <PSegmentedControlItem value="s">S</PSegmentedControlItem>
          <PSegmentedControlItem value="m">M</PSegmentedControlItem>
          <PSegmentedControlItem value="l">L</PSegmentedControlItem>
          <PSegmentedControlItem value="xl">XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div class="playground light" title="should render default stepper-horizontal with custom prefix">
        <PStepperHorizontal>
          <PStepperHorizontalItem state="current">Step 1</PStepperHorizontalItem>
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
        <PLinkTile href="#" label="Some Label" description="Default">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="{50}"
            height="{50}"
            alt="Beach"
          />
        </PLinkTile>
      </div>

      <div class="playground light" title="should render default carousel with custom prefix">
        <PCarousel heading="Heading">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>
    </div>
    <!--    </PorscheDesignSystemProvider>-->
  </div>
</template>

<style>
  p-flex-item > p,
  my-prefix-p-flex-item > p,
  p-grid-item > p,
  my-prefix-p-grid-item > p,
  p-content-wrapper > p,
  my-prefix-p-content-wrapper > p {
    margin: 0;
    padding: 4px 2vw;
    text-align: center;
    color: white;
    background: lightskyblue;
  }

  p-flex-item:nth-child(1n) > p,
  my-prefix-p-flex-item:nth-child(1n) > p,
  p-grid-item:nth-child(1n) > p,
  my-prefix-p-grid-item:nth-child(1n) > p {
    background: skyblue;
  }

  p-flex-item:nth-child(2n) > p,
  my-prefix-p-flex-item:nth-child(2n) > p,
  p-grid-item:nth-child(2n) > p,
  my-prefix-p-grid-item:nth-child(2n) > p {
    background: deepskyblue;
  }

  p-link-tile,
  my-prefix-p-link-tile {
    max-width: 400px;
  }
</style>
