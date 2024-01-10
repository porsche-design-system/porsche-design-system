<script setup lang="ts">
  import { ref } from 'vue';
  import {
    PAccordion,
    PCarousel,
    PBanner,
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
    AccordionUpdateEvent, // using deprecated to verify it is still available
    CarouselUpdateEvent, // using deprecated to verify it is still available
    PaginationUpdateEvent, // using deprecated to verify it is still available
    TableUpdateEvent, // using deprecated to verify it is still available
    SwitchUpdateEvent, // using deprecated to verify it is still available
    TabsBarUpdateEvent, // using deprecated to verify it is still available
    TabsUpdateEvent, // using deprecated to verify it is still available
  } from '@porsche-design-system/components-vue';

  const accordionUpdateEventCounter = ref(0);
  const paginationUpdateEventCounter = ref(0);
  const tabsBarUpdateEventCounter = ref(0);
  const tabsUpdateEventCounter = ref(0);
  const textFieldSearchValue = ref('');
  const switchUpdateEventCounter = ref(0);
  const bannerDismissEventCounter = ref(0);
  const isBannerOpen = ref(false);
  const modalDismissEventCounter = ref(0);
  const isModalOpen = ref(false);
  const tableUpdateEventCounter = ref(0);
  const carouselUpdateEventCounter = ref(0);

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported from package root
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const onAccordionUpdate = (detail: AccordionUpdateEvent) => accordionUpdateEventCounter.value++;
  const onPaginationUpdate = (detail: PaginationUpdateEvent) => paginationUpdateEventCounter.value++;
  const onTabsBarUpdate = (detail: TabsBarUpdateEvent) => tabsBarUpdateEventCounter.value++;
  const onTabsUpdate = (detail: TabsUpdateEvent) => tabsUpdateEventCounter.value++;
  const onTextFieldSearchChange = (e: Event) => (textFieldSearchValue.value = (e.target as HTMLInputElement).value);
  const onSwitchUpdate = (detail: SwitchUpdateEvent) => switchUpdateEventCounter.value++;
  const onBannerDismiss = () => {
    bannerDismissEventCounter.value++;
    isBannerOpen.value = false;
  };
  const onModalDismiss = () => {
    modalDismissEventCounter.value++;
    isModalOpen.value = false;
  };
  const onTableUpdate = (detail: TableUpdateEvent) => tableUpdateEventCounter.value++;
  const onCarouselUpdate = (detail: CarouselUpdateEvent) => carouselUpdateEventCounter.value++;
  /* eslint-enable @typescript-eslint/no-unused-vars */
</script>

<template>
  <div class="playground light">
    <PAccordion :heading="'Some heading'" @update="onAccordionUpdate" />
    <p>{{ accordionUpdateEventCounter }}</p>
  </div>

  <div class="playground light">
    <PPagination :totalItemsCount="500" :itemsPerPage="25" :activePage="1" @update="onPaginationUpdate" />
    <p>{{ paginationUpdateEventCounter }}</p>
  </div>

  <div class="playground light">
    <PTabsBar :activeTabIndex="0" @update="onTabsBarUpdate">
      <button>Tab 1</button>
      <button>Tab 2</button>
      <button>Tab 3</button>
    </PTabsBar>
    <p>{{ tabsBarUpdateEventCounter }}</p>
  </div>

  <div class="playground light">
    <PTabs :activeTabIndex="0" @update="onTabsUpdate">
      <PTabsItem :label="'Tab 1'">Content 1</PTabsItem>
      <PTabsItem :label="'Tab 2'">Content 2</PTabsItem>
      <PTabsItem :label="'Tab 3'">Content 3</PTabsItem>
    </PTabs>
    <p>{{ tabsUpdateEventCounter }}</p>
  </div>

  <div class="playground light">
    <PTextFieldWrapper>
      <input type="search" :value="textFieldSearchValue" @input="onTextFieldSearchChange" />
    </PTextFieldWrapper>
    <p>Value: {{ textFieldSearchValue }}</p>
  </div>

  <div class="playground light">
    <PSwitch @update="onSwitchUpdate">Switch</PSwitch>
    <p>{{ switchUpdateEventCounter }}</p>
  </div>

  <div class="playground light">
    <PBanner :open="isBannerOpen" @dismiss="onBannerDismiss" heading="Banner"></PBanner>
    <p>{{ bannerDismissEventCounter }}</p>
    <button @click="isBannerOpen = true">Open Banner</button>
  </div>

  <div class="playground light">
    <PModal :open="isModalOpen" @dismiss="onModalDismiss">Modal</PModal>
    <p>{{ modalDismissEventCounter }}</p>
    <button @click="isModalOpen = true">Open Modal</button>
  </div>

  <div class="playground light">
    <PTable @update="onTableUpdate">
      <PTableHead>
        <PTableHeadRow>
          <PTableHeadCell :sort="{ id: 'col1', active: true, direction: 'asc' }">Col 1</PTableHeadCell>
        </PTableHeadRow>
      </PTableHead>
    </PTable>
    <p>{{ tableUpdateEventCounter }}</p>
  </div>

  <div class="playground light">
    <PCarousel @update="onCarouselUpdate">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </PCarousel>
    <p>{{ carouselUpdateEventCounter }}</p>
  </div>
</template>
