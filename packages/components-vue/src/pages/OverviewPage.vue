<script setup lang="ts">
  import {
    PAccordion,
    PBanner,
    PButton,
    PButtonGroup,
    PButtonPure,
    PCarousel,
    PCheckboxWrapper,
    PContentWrapper,
    PCrest,
    PDisplay,
    PDivider,
    PFlyout,
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
    PMarque,
    PModal,
    PModelSignature,
    PorscheDesignSystemProvider,
    PPagination,
    PPinCode,
    PPopover,
    PRadioButtonWrapper,
    PScroller,
    PSegmentedControl,
    PSegmentedControlItem,
    PSelectWrapper,
    PSpinner,
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
    PFieldset,
    PTextFieldWrapper,
    PTextList,
    PTextListItem,
    PWordmark,
  } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="root">
    <div>
      <div class="playground light" title="should render default heading">
        <PHeading>Default Components</PHeading>
      </div>

      <div class="playground light" title="should render default headline">
        <PHeadline>Some Headline</PHeadline>
      </div>

      <div class="playground light" title="should render default display">
        <PDisplay>Some Display</PDisplay>
      </div>

      <!-- eslint-disable vue/no-deprecated-slot-attribute -->
      <div class="playground light playground--banner" title="should render default banner">
        <PBanner :open="true">
          <span slot="title">Default banner component</span>
          <span slot="description">Some slotted banner description</span>
        </PBanner>
      </div>
      <!-- eslint-enable -->

      <div class="playground light playground--modal" title="should render default modal">
        <PModal :heading="'Heading'" :open="true">Some Content</PModal>
      </div>

      <div class="playground light playground--flyout" title="should render default flyout">
        <PFlyout :open="true">
          <span slot="header">Sticky Header</span>
          Some Content
          <span slot="footer">Sticky Footer</span>
          <span slot="sub-footer">Some Sub Footer Content</span>
        </PFlyout>
      </div>

      <div class="playground light" title="should render default inline-notification">
        <PInlineNotification :heading="'Some heading'" :description="'Some description'" />
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

      <div class="playground light" title="should render default select-wrapper">
        <PSelectWrapper :label="'Some label'">
          <select>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </PSelectWrapper>
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
        <PLink :href="'https://www.porsche.com'">Some label</PLink>
      </div>

      <div class="playground light" title="should render default link-pure">
        <PLinkPure :href="'https://www.porsche.com'">Some label</PLinkPure>
      </div>

      <div class="playground light" title="should render default link-social">
        <PLinkSocial :href="'https://www.porsche.com'" :icon="'logo-facebook'">Some label</PLinkSocial>
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
        <PPagination :totalItemsCount="500" :itemsPerPage="25" :activePage="1" />
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
    </div>

    <PorscheDesignSystemProvider prefix="my-prefix">
      <div>
        <div class="playground light" title="should render default heading with custom prefix">
          <PHeading>Prefixed Components</PHeading>
        </div>

        <div class="playground light" title="should render default headline with custom prefix">
          <PHeadline>Some Headline</PHeadline>
        </div>

        <div class="playground light" title="should render default display with custom prefix">
          <PDisplay>Some Display</PDisplay>
        </div>

        <!-- eslint-disable vue/no-deprecated-slot-attribute -->
        <div class="playground light playground--banner" title="should render default banner with custom prefix">
          <PBanner :open="true">
            <span slot="title">Prefixed banner component</span>
            <span slot="description">Some slotted banner description</span>
          </PBanner>
        </div>
        <!-- eslint-enable -->

        <div class="playground light playground--modal" title="should render default modal with custom prefix">
          <PModal :heading="'Heading'" :open="true">Some Content</PModal>
        </div>

        <div class="playground light playground--flyout" title="should render default flyout with custom prefix">
          <PFlyout :open="true">
            <span slot="header">Sticky Header</span>
            Some Content
            <span slot="footer">Sticky Footer</span>
            <span slot="sub-footer">Some Sub Footer Content</span>
          </PFlyout>
        </div>

        <div class="playground light" title="should render default inline-notification with custom prefix">
          <PInlineNotification :heading="'Some heading'" :description="'Some description'" />
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

        <div class="playground light" title="should render default select-wrapper with custom prefix">
          <PSelectWrapper :label="'Some label'">
            <select>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </select>
          </PSelectWrapper>
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
          <PLink :href="'https://www.porsche.com'">Some label</PLink>
        </div>

        <div class="playground light" title="should render default link-pure with custom prefix">
          <PLinkPure :href="'https://www.porsche.com'">Some label</PLinkPure>
        </div>

        <div class="playground light" title="should render default link-social with custom prefix">
          <PLinkSocial :href="'https://www.porsche.com'" :icon="'logo-facebook'">Some label</PLinkSocial>
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
          <PPagination :totalItemsCount="500" :itemsPerPage="25" :activePage="1" />
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

  .playground--banner,
  .playground--modal,
  .playground--flyout {
    transform: translate3d(0, 0, 0);
    height: 10rem;
    padding: 0;
    margin: 1rem;
  }

  .playground--modal,
  .playground--flyout {
    height: 20rem;
  }
</style>
