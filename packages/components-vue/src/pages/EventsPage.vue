<script setup lang="ts">
import type {
  AccordionUpdateEventDetail,
  CarouselUpdateEventDetail,
  InputDateBlurEventDetail,
  InputDateChangeEventDetail,
  InputDateInputEventDetail,
  InputEmailBlurEventDetail,
  InputEmailChangeEventDetail,
  InputEmailInputEventDetail,
  InputMonthBlurEventDetail,
  InputMonthChangeEventDetail,
  InputMonthInputEventDetail,
  InputNumberBlurEventDetail,
  InputNumberChangeEventDetail,
  InputNumberInputEventDetail,
  InputPasswordBlurEventDetail,
  InputPasswordChangeEventDetail,
  InputPasswordInputEventDetail,
  InputSearchBlurEventDetail,
  InputSearchChangeEventDetail,
  InputSearchInputEventDetail,
  InputTelBlurEventDetail,
  InputTelChangeEventDetail,
  InputTelInputEventDetail,
  InputTextBlurEventDetail,
  InputTextChangeEventDetail,
  InputTextInputEventDetail,
  InputTimeBlurEventDetail,
  InputTimeChangeEventDetail,
  InputTimeInputEventDetail,
  InputUrlBlurEventDetail,
  InputUrlChangeEventDetail,
  InputUrlInputEventDetail,
  InputWeekBlurEventDetail,
  InputWeekChangeEventDetail,
  InputWeekInputEventDetail,
  PaginationUpdateEventDetail,
  SwitchUpdateEventDetail,
  TableUpdateEventDetail,
  TabsBarUpdateEventDetail,
  TabsUpdateEventDetail,
  TextareaBlurEventDetail,
  TextareaChangeEventDetail,
  TextareaInputEventDetail,
} from '@porsche-design-system/components-vue';
import {
  PAccordion,
  PBanner,
  PCarousel,
  PInputDate,
  PInputEmail,
  PInputMonth,
  PInputNumber,
  PInputPassword,
  PInputSearch,
  PInputTel,
  PInputText,
  PInputTime,
  PInputUrl,
  PInputWeek,
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
  PTextarea,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

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

const inputDateValue = ref('');
const inputDateBlurCounter = ref(0);
const inputDateChangeCounter = ref(0);

const inputMonthValue = ref('');
const inputMonthBlurCounter = ref(0);
const inputMonthChangeCounter = ref(0);

const inputWeekValue = ref('');
const inputWeekBlurCounter = ref(0);
const inputWeekChangeCounter = ref(0);

const inputEmailValue = ref('');
const inputEmailBlurCounter = ref(0);
const inputEmailChangeCounter = ref(0);

const inputNumberValue = ref('');
const inputNumberBlurCounter = ref(0);
const inputNumberChangeCounter = ref(0);

const inputPasswordValue = ref('');
const inputPasswordBlurCounter = ref(0);
const inputPasswordChangeCounter = ref(0);

const inputSearchValue = ref('');
const inputSearchBlurCounter = ref(0);
const inputSearchChangeCounter = ref(0);

const inputTelValue = ref('');
const inputTelBlurCounter = ref(0);
const inputTelChangeCounter = ref(0);

const inputTextValue = ref('');
const inputTextBlurCounter = ref(0);
const inputTextChangeCounter = ref(0);

const inputTimeValue = ref('');
const inputTimeBlurCounter = ref(0);
const inputTimeChangeCounter = ref(0);

const inputUrlValue = ref('');
const inputUrlBlurCounter = ref(0);
const inputUrlChangeCounter = ref(0);

const textareaValue = ref('');
const textareaBlurCounter = ref(0);
const textareaChangeCounter = ref(0);

// TODO: inline-notification, segmented-control and stepper-horizontal are missing

// unused event parameters are used to verify that types can be imported from package root
/* eslint-disable @typescript-eslint/no-unused-vars */
const onAccordionUpdate = (e: CustomEvent<AccordionUpdateEventDetail>) => accordionUpdateEventCounter.value++;
const onPaginationUpdate = (e: CustomEvent<PaginationUpdateEventDetail>) => paginationUpdateEventCounter.value++;
const onTabsBarUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>) => tabsBarUpdateEventCounter.value++;
const onTabsUpdate = (e: CustomEvent<TabsUpdateEventDetail>) => tabsUpdateEventCounter.value++;
const onTextFieldSearchChange = (e: CustomEvent<InputTextInputEventDetail>) =>
  (textFieldSearchValue.value = (e.target as HTMLInputElement).value);
const onSwitchUpdate = (e: CustomEvent<SwitchUpdateEventDetail>) => switchUpdateEventCounter.value++;
const onBannerDismiss = () => {
  bannerDismissEventCounter.value++;
  isBannerOpen.value = false;
};
const onModalDismiss = () => {
  modalDismissEventCounter.value++;
  isModalOpen.value = false;
};
const onTableUpdate = (e: CustomEvent<TableUpdateEventDetail>) => tableUpdateEventCounter.value++;
const onCarouselUpdate = (e: CustomEvent<CarouselUpdateEventDetail>) => carouselUpdateEventCounter.value++;

// PInputDate
const onInputDateInput = (e: CustomEvent<InputDateInputEventDetail>) => {
  inputDateValue.value = (e.target as HTMLInputElement).value;
};
const onInputDateBlur = (_: CustomEvent<InputDateBlurEventDetail>) => inputDateBlurCounter.value++;
const onInputDateChange = (_: CustomEvent<InputDateChangeEventDetail>) => inputDateChangeCounter.value++;

// PInputMonth
const onInputMonthInput = (e: CustomEvent<InputMonthInputEventDetail>) => {
  inputMonthValue.value = (e.target as HTMLInputElement).value;
};
const onInputMonthBlur = (_: CustomEvent<InputMonthBlurEventDetail>) => inputMonthBlurCounter.value++;
const onInputMonthChange = (_: CustomEvent<InputMonthChangeEventDetail>) => inputMonthChangeCounter.value++;

// PInputWeek
const onInputWeekInput = (e: CustomEvent<InputWeekInputEventDetail>) => {
  inputWeekValue.value = (e.target as HTMLInputElement).value;
};
const onInputWeekBlur = (_: CustomEvent<InputWeekBlurEventDetail>) => inputWeekBlurCounter.value++;
const onInputWeekChange = (_: CustomEvent<InputWeekChangeEventDetail>) => inputWeekChangeCounter.value++;

// PInputEmail
const onInputEmailInput = (e: CustomEvent<InputEmailInputEventDetail>) => {
  inputEmailValue.value = (e.target as HTMLInputElement).value;
};
const onInputEmailBlur = (_: CustomEvent<InputEmailBlurEventDetail>) => inputEmailBlurCounter.value++;
const onInputEmailChange = (_: CustomEvent<InputEmailChangeEventDetail>) => inputEmailChangeCounter.value++;

// PInputNumber
const onInputNumberInput = (e: CustomEvent<InputNumberInputEventDetail>) => {
  inputNumberValue.value = (e.target as HTMLInputElement).value;
};
const onInputNumberBlur = (_: CustomEvent<InputNumberBlurEventDetail>) => inputNumberBlurCounter.value++;
const onInputNumberChange = (_: CustomEvent<InputNumberChangeEventDetail>) => inputNumberChangeCounter.value++;

// PInputPassword
const onInputPasswordInput = (e: CustomEvent<InputPasswordInputEventDetail>) => {
  inputPasswordValue.value = (e.target as HTMLInputElement).value;
};
const onInputPasswordBlur = (_: CustomEvent<InputPasswordBlurEventDetail>) => inputPasswordBlurCounter.value++;
const onInputPasswordChange = (_: CustomEvent<InputPasswordChangeEventDetail>) => inputPasswordChangeCounter.value++;

// PInputSearch
const onInputSearchInput = (e: CustomEvent<InputSearchInputEventDetail>) => {
  inputSearchValue.value = (e.target as HTMLInputElement).value;
};
const onInputSearchBlur = (_: CustomEvent<InputSearchBlurEventDetail>) => inputSearchBlurCounter.value++;
const onInputSearchChange = (_: CustomEvent<InputSearchChangeEventDetail>) => inputSearchChangeCounter.value++;

// PInputTel
const onInputTelInput = (e: CustomEvent<InputTelInputEventDetail>) => {
  inputTelValue.value = (e.target as HTMLInputElement).value;
};
const onInputTelBlur = (_: CustomEvent<InputTelBlurEventDetail>) => inputTelBlurCounter.value++;
const onInputTelChange = (_: CustomEvent<InputTelChangeEventDetail>) => inputTelChangeCounter.value++;

// PInputText
const onInputTextInput = (e: CustomEvent<InputTextInputEventDetail>) => {
  inputTextValue.value = (e.target as HTMLInputElement).value;
};
const onInputTextBlur = (_: CustomEvent<InputTextBlurEventDetail>) => inputTextBlurCounter.value++;
const onInputTextChange = (_: CustomEvent<InputTextChangeEventDetail>) => inputTextChangeCounter.value++;

// PInputTime
const onInputTimeInput = (e: CustomEvent<InputTimeInputEventDetail>) => {
  inputTimeValue.value = (e.target as HTMLInputElement).value;
};
const onInputTimeBlur = (_: CustomEvent<InputTimeBlurEventDetail>) => inputTimeBlurCounter.value++;
const onInputTimeChange = (_: CustomEvent<InputTimeChangeEventDetail>) => inputTimeChangeCounter.value++;

// PInputUrl
const onInputUrlInput = (e: CustomEvent<InputUrlInputEventDetail>) => {
  inputUrlValue.value = (e.target as HTMLInputElement).value;
};
const onInputUrlBlur = (_: CustomEvent<InputUrlBlurEventDetail>) => inputUrlBlurCounter.value++;
const onInputUrlChange = (_: CustomEvent<InputUrlChangeEventDetail>) => inputUrlChangeCounter.value++;

// PTextarea
const onTextareaInput = (e: CustomEvent<TextareaInputEventDetail>) => {
  textareaValue.value = (e.target as HTMLTextAreaElement).value;
};
const onTextareaBlur = (_: CustomEvent<TextareaBlurEventDetail>) => textareaBlurCounter.value++;
const onTextareaChange = (_: CustomEvent<TextareaChangeEventDetail>) => textareaChangeCounter.value++;
/* eslint-enable @typescript-eslint/no-unused-vars */
</script>

<template>
  <div class="playground">
    <PAccordion :heading="'Some heading'" @update="onAccordionUpdate" />
    <p>{{ accordionUpdateEventCounter }}</p>
  </div>

  <div class="playground">
    <PPagination :totalItemsCount="500" :itemsPerPage="25" :activePage="1" @update="onPaginationUpdate" />
    <p>{{ paginationUpdateEventCounter }}</p>
  </div>

  <div class="playground">
    <PTabsBar :activeTabIndex="0" @update="onTabsBarUpdate">
      <button>Tab 1</button>
      <button>Tab 2</button>
      <button>Tab 3</button>
    </PTabsBar>
    <p>{{ tabsBarUpdateEventCounter }}</p>
  </div>

  <div class="playground">
    <PTabs :activeTabIndex="0" @update="onTabsUpdate">
      <PTabsItem :label="'Tab 1'">Content 1</PTabsItem>
      <PTabsItem :label="'Tab 2'">Content 2</PTabsItem>
      <PTabsItem :label="'Tab 3'">Content 3</PTabsItem>
    </PTabs>
    <p>{{ tabsUpdateEventCounter }}</p>
  </div>

  <div class="playground">
    <PSwitch @update="onSwitchUpdate">Switch</PSwitch>
    <p>{{ switchUpdateEventCounter }}</p>
  </div>

  <div class="playground">
    <PBanner :open="isBannerOpen" @dismiss="onBannerDismiss" heading="Banner"></PBanner>
    <p>{{ bannerDismissEventCounter }}</p>
    <button @click="isBannerOpen = true">Open Banner</button>
  </div>

  <div class="playground">
    <PModal :open="isModalOpen" @dismiss="onModalDismiss">Modal</PModal>
    <p>{{ modalDismissEventCounter }}</p>
    <button @click="isModalOpen = true">Open Modal</button>
  </div>

  <div class="playground">
    <PTable @update="onTableUpdate">
      <PTableHead>
        <PTableHeadRow>
          <PTableHeadCell :sort="{ id: 'col1', active: true, direction: 'asc' }">Col 1</PTableHeadCell>
        </PTableHeadRow>
      </PTableHead>
    </PTable>
    <p>{{ tableUpdateEventCounter }}</p>
  </div>

  <div class="playground">
    <PCarousel @update="onCarouselUpdate" :pagination="true" :trimSpace="true" :rewind="true">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </PCarousel>
    <p>{{ carouselUpdateEventCounter }}</p>
  </div>

  <div class="playground">
    <PInputDate
      v-model="inputDateValue"
      @input="onInputDateInput"
      @blur="onInputDateBlur"
      @change="onInputDateChange"
      name="date"
      label="Date Input"
    />
    <p>Value: {{ inputDateValue }}</p>
    <p>Blur: {{ inputDateBlurCounter }}</p>
    <p>Change: {{ inputDateChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputMonth
      v-model="inputMonthValue"
      @input="onInputMonthInput"
      @blur="onInputMonthBlur"
      @change="onInputMonthChange"
      name="month"
      label="Month Input"
    />
    <p>Value: {{ inputMonthValue }}</p>
    <p>Blur: {{ inputMonthBlurCounter }}</p>
    <p>Change: {{ inputMonthChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputWeek
      v-model="inputWeekValue"
      @input="onInputWeekInput"
      @blur="onInputWeekBlur"
      @change="onInputWeekChange"
      name="week"
      label="Week Input"
    />
    <p>Value: {{ inputWeekValue }}</p>
    <p>Blur: {{ inputWeekBlurCounter }}</p>
    <p>Change: {{ inputWeekChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputEmail
      v-model="inputEmailValue"
      @input="onInputEmailInput"
      @blur="onInputEmailBlur"
      @change="onInputEmailChange"
      name="email"
      label="Email Input"
    />
    <p>Value: {{ inputEmailValue }}</p>
    <p>Blur: {{ inputEmailBlurCounter }}</p>
    <p>Change: {{ inputEmailChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputNumber
      v-model="inputNumberValue"
      @input="onInputNumberInput"
      @blur="onInputNumberBlur"
      @change="onInputNumberChange"
      name="number"
      label="Number Input"
      controls
    />
    <p>Value: {{ inputNumberValue }}</p>
    <p>Blur: {{ inputNumberBlurCounter }}</p>
    <p>Change: {{ inputNumberChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputPassword
      v-model="inputPasswordValue"
      @input="onInputPasswordInput"
      @blur="onInputPasswordBlur"
      @change="onInputPasswordChange"
      name="password"
      label="Password Input"
      toggle
    />
    <p>Value: {{ inputPasswordValue }}</p>
    <p>Blur: {{ inputPasswordBlurCounter }}</p>
    <p>Change: {{ inputPasswordChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputSearch
      v-model="inputSearchValue"
      @input="onInputSearchInput"
      @blur="onInputSearchBlur"
      @change="onInputSearchChange"
      name="search"
      label="Search Input"
      indicator
    />
    <p>Value: {{ inputSearchValue }}</p>
    <p>Blur: {{ inputSearchBlurCounter }}</p>
    <p>Change: {{ inputSearchChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputTel
      v-model="inputTelValue"
      @input="onInputTelInput"
      @blur="onInputTelBlur"
      @change="onInputTelChange"
      name="tel"
      label="Tel Input"
    />
    <p>Value: {{ inputTelValue }}</p>
    <p>Blur: {{ inputTelBlurCounter }}</p>
    <p>Change: {{ inputTelChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputText
      v-model="inputTextValue"
      @input="onInputTextInput"
      @blur="onInputTextBlur"
      @change="onInputTextChange"
      name="text"
      label="Text Input"
      placeholder="Some placeholder"
    />
    <p>Value: {{ inputTextValue }}</p>
    <p>Blur: {{ inputTextBlurCounter }}</p>
    <p>Change: {{ inputTextChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputTime
      v-model="inputTimeValue"
      @input="onInputTimeInput"
      @blur="onInputTimeBlur"
      @change="onInputTimeChange"
      name="time"
      label="Time Input"
    />
    <p>Value: {{ inputTimeValue }}</p>
    <p>Blur: {{ inputTimeBlurCounter }}</p>
    <p>Change: {{ inputTimeChangeCounter }}</p>
  </div>

  <div class="playground">
    <PInputUrl
      v-model="inputUrlValue"
      @input="onInputUrlInput"
      @blur="onInputUrlBlur"
      @change="onInputUrlChange"
      name="url"
      label="URL Input"
      indicator
    />
    <p>Value: {{ inputUrlValue }}</p>
    <p>Blur: {{ inputUrlBlurCounter }}</p>
    <p>Change: {{ inputUrlChangeCounter }}</p>
  </div>

  <div class="playground">
    <PTextarea
      v-model="textareaValue"
      @input="onTextareaInput"
      @blur="onTextareaBlur"
      @change="onTextareaChange"
      name="textarea"
      label="Textarea"
    />
    <p>Value: {{ textareaValue }}</p>
    <p>Blur: {{ textareaBlurCounter }}</p>
    <p>Change: {{ textareaChangeCounter }}</p>
  </div>
</template>
