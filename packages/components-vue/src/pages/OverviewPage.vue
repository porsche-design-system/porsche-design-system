<script lang="ts" setup>
import {
  PAccordion,
  PButton,
  PButtonGroup,
  PButtonPure,
  PButtonTile,
  PCarousel,
  PCheckboxWrapper,
  PContentWrapper,
  PCrest,
  PDisplay,
  PDivider,
  PFieldset,
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
  PLinkTileModelSignature,
  PLinkTileProduct,
  PMarque,
  PModelSignature,
  PMultiSelect,
  PMultiSelectOption,
  PPagination,
  PPinCode,
  PPopover,
  PRadioButtonWrapper,
  PScroller,
  PSegmentedControl,
  PSegmentedControlItem,
  PSelect,
  PSelectOption,
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
  PTextFieldWrapper,
  PTextList,
  PTextListItem,
  PTextareaWrapper,
  PWordmark,
  PorscheDesignSystemProvider,
} from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="root">
    <div>
      <div class="playground light" title="should render default heading">
        <PHeading>Some Heading</PHeading>
      </div>

      <div class="playground light" title="should render default headline">
        <PHeadline>Some Headline</PHeadline>
      </div>

      <div class="playground light" title="should render default display">
        <PDisplay>Some Display</PDisplay>
      </div>

      <div class="playground light" title="should render default action-sheet">
        <iframe src="/action-sheet-basic?iframe=true" loading="eager" title="fix-linter-1a"></iframe>
      </div>

      <div class="playground light" title="should render default modal">
        <iframe src="/modal-basic?iframe=true" loading="eager" title="fix-linter-1b"></iframe>
      </div>

      <div class="playground light" title="should render default flyout">
        <iframe src="/flyout-basic?iframe=true" loading="eager" title="fix-linter-2a"></iframe>
      </div>

      <div class="playground light" title="should render default banner">
        <iframe src="/banner-basic?iframe=true" loading="eager" title="fix-linter-3a"></iframe>
      </div>

      <div class="playground light" title="should render default toast">
        <iframe src="/toast-basic?iframe=true" loading="eager" title="fix-linter-4a"></iframe>
      </div>

      <div class="playground light" title="should render default flyout-multilevel">
        <iframe src="/flyout-multilevel-basic?iframe=true" loading="eager" title="fix-linter-5a"></iframe>
      </div>

      <div class="playground light" title="should render default inline-notification">
        <PInlineNotification :description="'Some description'" :heading="'Some heading'" />
      </div>

      <div class="playground light" title="should render default popover">
        <PPopover :direction="'right'">Some popover content</PPopover>
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
        <PCheckboxWrapper :label="'Some label'">
          <input type="checkbox" />
        </PCheckboxWrapper>
      </div>

      <div class="playground light" title="should render default radio-button-wrapper">
        <PRadioButtonWrapper :label="'Some label'">
          <input type="radio" />
        </PRadioButtonWrapper>
      </div>

      <div class="playground light" title="should render default select">
        <PSelect :label="'Some label'" :name="'options'">
          <PSelectOption value="a">Option A</PSelectOption>
          <PSelectOption value="b">Option B</PSelectOption>
          <PSelectOption value="c">Option C</PSelectOption>
        </PSelect>
      </div>

      <div class="playground light" title="should render default select-wrapper">
        <PSelectWrapper :label="'Some label'">
          <select>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
      </div>

      <div class="playground light" title="should render default multi-select">
        <PMultiSelect :label="'Some label'" :name="'options'">
          <PMultiSelectOption value="a">Option A</PMultiSelectOption>
          <PMultiSelectOption value="b">Option B</PMultiSelectOption>
          <PMultiSelectOption value="c">Option C</PMultiSelectOption>
        </PMultiSelect>
      </div>

      <div class="playground light" title="should render default text-field-wrapper">
        <PTextFieldWrapper :label="'Some label'">
          <input type="text" />
        </PTextFieldWrapper>
      </div>

      <div class="playground light" title="should render default textarea-wrapper">
        <PTextareaWrapper :label="'Some label'">
          <textarea />
        </PTextareaWrapper>
      </div>

      <div class="playground light" title="should render default fieldset">
        <PFieldset :label="'Some label'"></PFieldset>
      </div>

      <div class="playground light" title="should render default fieldset-wrapper">
        <PFieldsetWrapper :label="'Some label'" />
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
        <PIcon>Some Icon</PIcon>
      </div>

      <div class="playground light" title="should render default link">
        <PLink :href="'https://porsche.com'">Some label</PLink>
      </div>

      <div class="playground light" title="should render default link-pure">
        <PLinkPure :href="'https://porsche.com'">Some label</PLinkPure>
      </div>

      <div class="playground light" title="should render default link-social">
        <PLinkSocial :href="'https://porsche.com'" :icon="'logo-facebook'">Some label</PLinkSocial>
      </div>

      <div class="playground light" title="should render default marque">
        <PMarque />
      </div>

      <div class="playground light" title="should render default wordmark">
        <PWordmark />
      </div>

      <div class="playground light" title="should render default crest">
        <PCrest />
      </div>

      <div class="playground light" title="should render default model-signature">
        <PModelSignature />
      </div>

      <div class="playground light" title="should render default pagination">
        <PPagination :activePage="1" :itemsPerPage="25" :totalItemsCount="500" />
      </div>

      <div class="playground light" title="should render default pin-code">
        <PPinCode :label="'Some label'" />
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
        <PTabs :activeTabIndex="0">
          <PTabsItem :label="'Tab1'">Content 1</PTabsItem>
          <PTabsItem :label="'Tab2'">Content 2</PTabsItem>
          <PTabsItem :label="'Tab3'">Content 3</PTabsItem>
        </PTabs>
      </div>

      <div class="playground light" title="should render default tabs-bar">
        <PTabsBar :activeTabIndex="0">
          <button>Tab1</button>
          <button>Tab2</button>
          <button>Tab3</button>
        </PTabsBar>
      </div>

      <div class="playground light" title="should render default accordion">
        <PAccordion :heading="'Some accordion heading'">
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
          <PGridItem :size="6"><p>1</p></PGridItem>
          <PGridItem :size="6"><p>2</p></PGridItem>
        </PGrid>
      </div>

      <div class="playground light" title="should render default tag">
        <PTag>Some Tag</PTag>
      </div>

      <div class="playground light" title="should render default tag-dismissible">
        <PTagDismissible>Some Tag</PTagDismissible>
      </div>

      <div class="playground light" title="should render default segmented-control">
        <PSegmentedControl :value="'s'">
          <PSegmentedControlItem :value="'s'">S</PSegmentedControlItem>
          <PSegmentedControlItem :value="'m'">M</PSegmentedControlItem>
          <PSegmentedControlItem :value="'l'">L</PSegmentedControlItem>
          <PSegmentedControlItem :value="'xl'">XL</PSegmentedControlItem>
        </PSegmentedControl>
      </div>

      <div class="playground light" title="should render default scroller">
        <PScroller>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
          <button>Default</button>
        </PScroller>
      </div>

      <div class="playground light" title="should render default carousel">
        <PCarousel :heading="'Heading'">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </PCarousel>
      </div>

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
        <PLinkTile :description="'Default'" :href="'#'" :label="'Some Label'">
          <img
            alt="Beach"
            height="50"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="50"
          />
        </PLinkTile>
      </div>

      <div class="playground light" title="should render default button-tile">
        <PButtonTile :description="'Default'" :label="'Some Label'">
          <img
            alt="Beach"
            height="50"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="50"
          />
        </PButtonTile>
      </div>

      <div class="playground light" title="should render default link-tile-model-signature">
        <!-- eslint-disable vue/no-deprecated-slot-attribute -->
        <PLinkTileModelSignature :description="'Default'" :heading="'Some Heading'">
          <img
            alt="Beach"
            height="50"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
            width="50"
          />
          <PLink slot="primary" :href="'#primary'">Some label</PLink>
          <PLink slot="secondary" :href="'#secondary'">Some label</PLink>
        </PLinkTileModelSignature>
        <!-- eslint-enable vue/no-deprecated-slot-attribute -->
      </div>

      <div class="playground light" title="should render default link-tile-product">
        <PLinkTileProduct :heading="'Some product'" :href="'https://porsche.com'" :price="'1.911,00 €'">
          <img alt="Some alt text" height="900" src="http://localhost:3002/placeholder_800x900.svg" width="800" />
        </PLinkTileProduct>
      </div>

      <div class="playground light" title="should render default switch">
        <PSwitch>Some label</PSwitch>
      </div>
    </div>

    <PorscheDesignSystemProvider prefix="my-prefix">
      <div>
        <div class="playground light" title="should render default heading with custom prefix">
          <PHeading>Some Heading</PHeading>
        </div>

        <div class="playground light" title="should render default headline with custom prefix">
          <PHeadline>Some Headline</PHeadline>
        </div>

        <div class="playground light" title="should render default display with custom prefix">
          <PDisplay>Some Display</PDisplay>
        </div>

        <div class="playground light" title="should render default action-sheet with custom prefix">
          <iframe src="/action-sheet-prefixed?iframe=true" loading="eager" title="fix-linter-1a"></iframe>
        </div>

        <div class="playground light" title="should render default modal with custom prefix">
          <iframe src="/modal-prefixed?iframe=true" loading="eager" title="fix-linter-1b"></iframe>
        </div>

        <div class="playground light" title="should render default flyout with custom prefix">
          <iframe src="/flyout-prefixed?iframe=true" loading="eager" title="fix-linter-2b"></iframe>
        </div>

        <div class="playground light" title="should render default banner with custom prefix">
          <iframe src="/banner-prefixed?iframe=true" loading="eager" title="fix-linter-3b"></iframe>
        </div>

        <div class="playground light" title="should render default toast with custom prefix">
          <iframe src="/toast-prefixed?iframe=true" loading="eager" title="fix-linter-4b"></iframe>
        </div>

        <div class="playground light" title="should render default flyout-multilevel with custom prefix">
          <iframe src="/flyout-multilevel-prefixed?iframe=true" loading="eager" title="fix-linter-5b"></iframe>
        </div>

        <div class="playground light" title="should render default inline-notification with custom prefix">
          <PInlineNotification :description="'Some description'" :heading="'Some heading'" />
        </div>

        <div class="playground light" title="should render default popover with custom prefix">
          <PPopover :direction="'right'">Some popover content</PPopover>
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
          <PCheckboxWrapper :label="'Some label'">
            <input type="checkbox" />
          </PCheckboxWrapper>
        </div>

        <div class="playground light" title="should render default radio-button-wrapper with custom prefix">
          <PRadioButtonWrapper :label="'Some label'">
            <input type="radio" />
          </PRadioButtonWrapper>
        </div>

        <div class="playground light" title="should render default select with custom prefix">
          <PSelect :label="'Some label'" :name="'options'">
            <PSelectOption value="a">Option A</PSelectOption>
            <PSelectOption value="b">Option B</PSelectOption>
            <PSelectOption value="c">Option C</PSelectOption>
          </PSelect>
        </div>

        <div class="playground light" title="should render default select-wrapper with custom prefix">
          <PSelectWrapper :label="'Some label'">
            <select>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </PSelectWrapper>
        </div>

        <div class="playground light" title="should render default multi-select with custom prefix">
          <PMultiSelect :label="'Some label'" :name="'options'">
            <PMultiSelectOption value="a">Option A</PMultiSelectOption>
            <PMultiSelectOption value="b">Option B</PMultiSelectOption>
            <PMultiSelectOption value="c">Option C</PMultiSelectOption>
          </PMultiSelect>
        </div>

        <div class="playground light" title="should render default text-field-wrapper with custom prefix">
          <PTextFieldWrapper :label="'Some label'">
            <input type="text" />
          </PTextFieldWrapper>
        </div>

        <div class="playground light" title="should render default textarea-wrapper with custom prefix">
          <PTextareaWrapper :label="'Some label'">
            <textarea />
          </PTextareaWrapper>
        </div>

        <div class="playground light" title="should render default fieldset with custom prefix">
          <PFieldset :label="'Some label'"></PFieldset>
        </div>

        <div class="playground light" title="should render default fieldset-wrapper with custom prefix">
          <PFieldsetWrapper :label="'Some label'" />
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
          <PLink :href="'https://porsche.com'">Some label</PLink>
        </div>

        <div class="playground light" title="should render default link-pure with custom prefix">
          <PLinkPure :href="'https://porsche.com'">Some label</PLinkPure>
        </div>

        <div class="playground light" title="should render default link-social with custom prefix">
          <PLinkSocial :href="'https://porsche.com'" :icon="'logo-facebook'">Some label</PLinkSocial>
        </div>

        <div class="playground light" title="should render default marque with custom prefix">
          <PMarque />
        </div>

        <div class="playground light" title="should render default wordmark with custom prefix">
          <PWordmark />
        </div>

        <div class="playground light" title="should render default crest with custom prefix">
          <PCrest />
        </div>

        <div class="playground light" title="should render default model-signature with custom prefix">
          <PModelSignature />
        </div>

        <div class="playground light" title="should render default pagination with custom prefix">
          <PPagination :activePage="1" :itemsPerPage="25" :totalItemsCount="500" />
        </div>

        <div class="playground light" title="should render default pin-code with custom prefix">
          <PPinCode :label="'Some label'" />
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
            <PTabsItem :label="'Tab1'">Content 1</PTabsItem>
            <PTabsItem :label="'Tab2'">Content 2</PTabsItem>
            <PTabsItem :label="'Tab3'">Content 3</PTabsItem>
          </PTabs>
        </div>

        <div class="playground light" title="should render default tabs-bar with custom prefix">
          <PTabsBar :activeTabIndex="0">
            <button>Tab1</button>
            <button>Tab2</button>
            <button>Tab3</button>
          </PTabsBar>
        </div>

        <div class="playground light" title="should render default accordion with custom prefix">
          <PAccordion :heading="'Some accordion heading'">
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
            <PGridItem :size="6"><p>1</p></PGridItem>
            <PGridItem :size="6"><p>2</p></PGridItem>
          </PGrid>
        </div>

        <div class="playground light" title="should render default tag with custom prefix">
          <PTag>Some Tag</PTag>
        </div>

        <div class="playground light" title="should render default tag-dismissible with custom prefix">
          <PTagDismissible>Some Tag</PTagDismissible>
        </div>

        <div class="playground light" title="should render default segmented-control with custom prefix">
          <PSegmentedControl :value="'s'">
            <PSegmentedControlItem :value="'s'">S</PSegmentedControlItem>
            <PSegmentedControlItem :value="'m'">M</PSegmentedControlItem>
            <PSegmentedControlItem :value="'l'">L</PSegmentedControlItem>
            <PSegmentedControlItem :value="'xl'">XL</PSegmentedControlItem>
          </PSegmentedControl>
        </div>

        <div class="playground light" title="should render default scroller with custom prefix">
          <PScroller>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
            <button>Default</button>
          </PScroller>
        </div>

        <div class="playground light" title="should render default carousel with custom prefix">
          <PCarousel :heading="'Heading'">
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          </PCarousel>
        </div>

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
          <PLinkTile :description="'Default'" :href="'#'" :label="'Some Label'">
            <img
              alt="Beach"
              height="50"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width="50"
            />
          </PLinkTile>
        </div>

        <div class="playground light" title="should render default button-tile with custom prefix">
          <PButtonTile :description="'Default'" :label="'Some Label'">
            <img
              alt="Beach"
              height="50"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width="50"
            />
          </PButtonTile>
        </div>

        <div class="playground light" title="should render default link-tile-model-signature with custom prefix">
          <!-- eslint-disable vue/no-deprecated-slot-attribute -->
          <PLinkTileModelSignature :description="'Default'" :heading="'Some Heading'">
            <img
              alt="Beach"
              height="50"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII="
              width="50"
            />
            <PLink slot="primary" :href="'#primary'">Some label</PLink>
            <PLink slot="secondary" :href="'#secondary'">Some label</PLink>
          </PLinkTileModelSignature>
          <!-- eslint-enable vue/no-deprecated-slot-attribute -->
        </div>

        <div class="playground light" title="should render default link-tile-product with custom prefix">
          <PLinkTileProduct :heading="'Some product'" :href="'https://porsche.com'" :price="'1.911,00 €'">
            <img alt="Some alt text" height="900" src="http://localhost:3002/placeholder_800x900.svg" width="800" />
          </PLinkTileProduct>
        </div>

        <div class="playground light" title="should render default switch with custom prefix">
          <PSwitch>Some label</PSwitch>
        </div>
      </div>
    </PorscheDesignSystemProvider>
  </div>
</template>

<style scoped>
  .root {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }

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
  p-button-tile,
  p-link-tile-model-signature,
  p-link-tile-product,
  my-prefix-p-link-tile,
  my-prefix-p-button-tile,
  my-prefix-p-link-tile-model-signature,
  my-prefix-p-link-tile-product {
    max-width: 400px;
  }

  .playground > iframe {
    height: 20rem;
    width: 100%;
    margin-inline-start: 0;
  }
</style>
