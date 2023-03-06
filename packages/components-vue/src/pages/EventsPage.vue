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
  } from '@porsche-design-system/components-vue';
  import type {
    AccordionChangeEvent,
    CarouselChangeEvent,
    PaginationChangeEvent,
    TableChangeEvent,
    SwitchChangeEvent,
    TabsBarChangeEvent,
    TabsChangeEvent,
  } from '@porsche-design-system/components-vue';

  const accordionChangeEventCounter = ref(0);
  const paginationChangeEventCounter = ref(0);
  const tabsBarChangeEventCounter = ref(0);
  const tabsChangeEventCounter = ref(0);
  const textFieldSearchValue = ref('');
  const switchChangeEventCounter = ref(0);
  const modalDismissEventCounter = ref(0);
  const isModalOpen = ref(false);
  const tableChangeEventCounter = ref(0);
  const carouselChangeEventCounter = ref(0);

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported from package root
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const onAccordionChange = (detail: AccordionChangeEvent) => accordionChangeEventCounter.value++;
  const onPaginationChange = (detail: PaginationChangeEvent) => paginationChangeEventCounter.value++;
  const onTabsBarChange = (detail: TabsBarChangeEvent) => tabsBarChangeEventCounter.value++;
  const onTabsChange = (detail: TabsChangeEvent) => tabsChangeEventCounter.value++;
  const onTextFieldSearchChange = (e: Event) => (textFieldSearchValue.value = (e.target as HTMLInputElement).value);
  const onSwitchChange = (detail: SwitchChangeEvent) => switchChangeEventCounter.value++;
  const onModalDismiss = () => {
    modalDismissEventCounter.value++;
    isModalOpen.value = false;
  };
  const onTableChange = (detail: TableChangeEvent) => tableChangeEventCounter.value++;
  const onCarouselChange = (detail: CarouselChangeEvent) => carouselChangeEventCounter.value++;
  /* eslint-enable @typescript-eslint/no-unused-vars */
</script>

<template>
  <div className="playground light">
    <PAccordion :heading="'Some heading'" @change="onAccordionChange" />
    <p>{{ accordionChangeEventCounter }}</p>
  </div>

  <div className="playground light">
    <PPagination :totalItemsCount="500" :itemsPerPage="25" :activePage="1" @change="onPaginationChange" />
    <p>{{ paginationChangeEventCounter }}</p>
  </div>

  <div className="playground light">
    <PTabsBar :activeTabIndex="0" @change="onTabsBarChange">
      <button>Tab 1</button>
      <button>Tab 2</button>
      <button>Tab 3</button>
    </PTabsBar>
    <p>{{ tabsBarChangeEventCounter }}</p>
  </div>

  <div className="playground light">
    <PTabs :activeTabIndex="0" @change="onTabsChange">
      <PTabsItem :label="'Tab 1'">Content 1</PTabsItem>
      <PTabsItem :label="'Tab 2'">Content 2</PTabsItem>
      <PTabsItem :label="'Tab 3'">Content 3</PTabsItem>
    </PTabs>
    <p>{{ tabsChangeEventCounter }}</p>
  </div>

  <div className="playground light">
    <PTextFieldWrapper>
      <input type="search" :value="textFieldSearchValue" @input="onTextFieldSearchChange" />
    </PTextFieldWrapper>
    <p>Value: {{ textFieldSearchValue }}</p>
  </div>

  <div className="playground light">
    <PSwitch @change="onSwitchChange">Switch</PSwitch>
    <p>{{ switchChangeEventCounter }}</p>
  </div>

  <div className="playground light">
    <PModal :open="isModalOpen" @dismiss="onModalDismiss">Modal</PModal>
    <p>{{ modalDismissEventCounter }}</p>
    <button @click="isModalOpen = true">Open Modal</button>
  </div>

  <div className="playground light">
    <PTable @change="onTableChange">
      <PTableHead>
        <PTableHeadRow>
          <PTableHeadCell :sort="{ id: 'col1', active: true, direction: 'asc' }">Col 1</PTableHeadCell>
        </PTableHeadRow>
      </PTableHead>
    </PTable>
    <p>{{ tableChangeEventCounter }}</p>
  </div>

  <div className="playground light">
    <PCarousel @change="onCarouselChange">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </PCarousel>
    <p>{{ carouselChangeEventCounter }}</p>
  </div>
</template>
