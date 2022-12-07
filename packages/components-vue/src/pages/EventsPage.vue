<script setup lang="ts">
  import { ref } from 'vue';
  import {
    PAccordion,
    PCarousel,
    PModal,
    PPagination,
    PSwitch,
    PTable,
    PTableHead,
    PTableHeadCell,
    PTableHeadRow,
    PTabs,
    PTabsBar,
    PTabsItem,
    PTextFieldWrapper,
  } from '../../projects/vue-wrapper/src/public-api';
  import type {
    AccordionChangeEvent,
    CarouselChangeEvent,
    PageChangeEvent,
    SortingChangeEvent,
    SwitchChangeEvent,
    TabChangeEvent,
  } from '../../projects/vue-wrapper/src/public-api';

  const accordionChangeEventCounter = ref(0);
  const pageChangeEventCounter = ref(0);
  const tabsBarChangeEventCounter = ref(0);
  const tabsChangeEventCounter = ref(0);
  const textFieldSearchValue = ref('');
  const switchChangeEventCounter = ref(0);
  const modalCloseEventCounter = ref(0);
  const isModalOpen = ref(false);
  const tableSortingChangeEventCounter = ref(0);
  const carouselChangeEventCounter = ref(0);

  // unused event parameters are used to verify that types can be imported from package root
  const onAccordionChange = (e: CustomEvent<AccordionChangeEvent>) => accordionChangeEventCounter.value++;
  const onPageChange = (e: CustomEvent<PageChangeEvent>) => pageChangeEventCounter.value++;
  const onTabsBarChange = (e: CustomEvent<TabChangeEvent>) => tabsBarChangeEventCounter.value++;
  const onTabsChange = (e: CustomEvent<TabChangeEvent>) => tabsChangeEventCounter.value++;
  const onTextFieldSearchChange = (e: Event & { target: HTMLInputElement }) =>
    (textFieldSearchValue.value = e.target.value);
  const onSwitchChange = (e: CustomEvent<SwitchChangeEvent>) => switchChangeEventCounter.value++;
  const onModalClose = () => {
    modalCloseEventCounter.value++;
    isModalOpen.value = false;
  };
  const onTableSortingChange = (e: CustomEvent<SortingChangeEvent>) => tableSortingChangeEventCounter.value++;
  const onCarouselChange = (e: CustomEvent<CarouselChangeEvent>) => carouselChangeEventCounter.value++;
</script>

<template>
  <div class="playground light">
    <PAccordion :heading="'Some heading'" @accordionChange="onAccordionChange" />
    <p>{{ accordionChangeEventCounter }}</p>
  </div>

  <div class="playground light">
    <PPagination :totalItemsCount="500" :itemsPerPage="25" :activePage="1" @pageChange="onPageChange" />
    <p>{{ pageChangeEventCounter }}</p>
  </div>

  <div class="playground light">
    <PTabsBar :activeTabIndex="0" @tabChange="onTabsBarChange">
      <button>Tab 1</button>
      <button>Tab 2</button>
      <button>Tab 3</button>
    </PTabsBar>
    <p>{{ tabsBarChangeEventCounter }}</p>
  </div>

  <div class="playground light">
    <PTabs :activeTabIndex="0" @tabChange="onTabsChange">
      <PTabsItem :label="'Tab 1'">Content 1</PTabsItem>
      <PTabsItem :label="'Tab 2'">Content 2</PTabsItem>
      <PTabsItem :label="'Tab 3'">Content 3</PTabsItem>
    </PTabs>
    <p>{{ tabsChangeEventCounter }}</p>
  </div>

  <div class="playground light">
    <PTextFieldWrapper>
      <input type="search" :value="textFieldSearchValue" @input="onTextFieldSearchChange" />
    </PTextFieldWrapper>
    <p>Value: {{ textFieldSearchValue }}</p>
  </div>

  <div class="playground light">
    <PSwitch @switchChange="onSwitchChange">Switch</PSwitch>
    <p>{{ switchChangeEventCounter }}</p>
  </div>

  <div class="playground light">
    <PModal :open="isModalOpen" @close="onModalClose"> Modal </PModal>
    <p>{{ modalCloseEventCounter }} <button @click="isModalOpen = true">Open Modal</button></p>
  </div>

  <div class="playground light">
    <PTable @sortingChange="onTableSortingChange">
      <PTableHead>
        <PTableHeadRow>
          <PTableHeadCell :sort="{ id: 'col1', active: true, direction: 'asc' }">Col 1</PTableHeadCell>
        </PTableHeadRow>
      </PTableHead>
    </PTable>
    <p>{{ tableSortingChangeEventCounter }}</p>
  </div>

  <div class="playground light">
    <PCarousel @carouselChange="onCarouselChange">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </PCarousel>
    <p>{{ carouselChangeEventCounter }}</p>
  </div>
</template>
