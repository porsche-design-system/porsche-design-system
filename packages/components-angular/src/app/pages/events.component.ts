import { ChangeDetectionStrategy, Component } from '@angular/core';
import type {
  AccordionUpdateEventDetail,
  CarouselUpdateEventDetail,
  PaginationUpdateEventDetail,
  SwitchUpdateEventDetail,
  TableUpdateEventDetail,
  TabsBarUpdateEventDetail,
  TabsUpdateEventDetail,
  InputDateInputEventDetail,
  InputDateBlurEventDetail,
  InputDateChangeEventDetail,
  InputMonthInputEventDetail,
  InputMonthBlurEventDetail,
  InputMonthChangeEventDetail,
  InputWeekInputEventDetail,
  InputWeekBlurEventDetail,
  InputWeekChangeEventDetail,
  InputEmailInputEventDetail,
  InputEmailBlurEventDetail,
  InputEmailChangeEventDetail,
  InputNumberInputEventDetail,
  InputNumberBlurEventDetail,
  InputNumberChangeEventDetail,
  InputPasswordInputEventDetail,
  InputPasswordBlurEventDetail,
  InputPasswordChangeEventDetail,
  InputSearchInputEventDetail,
  InputSearchBlurEventDetail,
  InputSearchChangeEventDetail,
  InputTelInputEventDetail,
  InputTelBlurEventDetail,
  InputTelChangeEventDetail,
  InputTextInputEventDetail,
  InputTextBlurEventDetail,
  InputTextChangeEventDetail,
  InputTimeInputEventDetail,
  InputTimeBlurEventDetail,
  InputTimeChangeEventDetail,
  InputUrlInputEventDetail,
  InputUrlBlurEventDetail,
  InputUrlChangeEventDetail,
  TextareaInputEventDetail,
  TextareaBlurEventDetail,
  TextareaChangeEventDetail,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-events',
  template: `
    <div class="playground light">
      <p-accordion [heading]="'Some heading'" (update)="onAccordionUpdate($event)">
        Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua.
      </p-accordion>
      <p>{{ accordionUpdateEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-pagination
        [totalItemsCount]="500"
        [itemsPerPage]="25"
        [activePage]="1"
        (update)="onPaginationUpdate($event)"
      ></p-pagination>
      <p>{{ paginationUpdateEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-tabs-bar [activeTabIndex]="0" (update)="onTabsBarUpdate($event)">
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </p-tabs-bar>
      <p>{{ tabsBarUpdateEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-tabs [activeTabIndex]="0" (update)="onTabsUpdate($event)">
        <p-tabs-item label="Tab 1">Content 1</p-tabs-item>
        <p-tabs-item label="Tab 2">Content 2</p-tabs-item>
        <p-tabs-item label="Tab 3">Content 3</p-tabs-item>
      </p-tabs>
      <p>{{ tabsUpdateEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-text-field-wrapper>
        <input type="search" [value]="textFieldSearchValue" (input)="onTextFieldSearchInput($event)" />
      </p-text-field-wrapper>
      <p>Value: {{ textFieldSearchValue }}</p>
    </div>

    <div class="playground light">
      <p-switch (update)="onSwitchUpdate($event)">Switch</p-switch>
      <p>{{ switchUpdateEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-banner [open]="isBannerOpen" (dismiss)="onBannerDismiss()" [heading]="'Banner'"></p-banner>
      <p>{{ bannerDismissEventCounter }}</p>
      <button (click)="openBanner()">Open Banner</button>
    </div>

    <div class="playground light">
      <p-modal [open]="isModalOpen" (dismiss)="onModalDismiss()">Modal</p-modal>
      <p>{{ modalDismissEventCounter }}</p>
      <button (click)="openModal()">Open Modal</button>
    </div>

    <div class="playground light">
      <p-table (update)="onTableUpdate($event)">
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell [sort]="{ id: 'col1', active: true, direction: 'asc' }">Col 1</p-table-head-cell>
          </p-table-head-row>
        </p-table-head>
      </p-table>
      <p>{{ tableUpdateEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-carousel (update)="onCarouselUpdate($event)">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
      <p>{{ carouselUpdateEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-date
        [value]="inputDateValue"
        (input)="onInputDateInput($event)"
        (blur)="onInputDateBlur($event)"
        (change)="onInputDateChange($event)"
        name="date"
        label="Date Input"
      ></p-input-date>
      <p>Value: {{ inputDateValue }}</p>
      <p>Blur: {{ inputDateBlurCounter }}</p>
      <p>Change: {{ inputDateChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-month
        [value]="inputMonthValue"
        (input)="onInputMonthInput($event)"
        (blur)="onInputMonthBlur($event)"
        (change)="onInputMonthChange($event)"
        name="month"
        label="Month Input"
      ></p-input-month>
      <p>Value: {{ inputMonthValue }}</p>
      <p>Blur: {{ inputMonthBlurCounter }}</p>
      <p>Change: {{ inputMonthChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-week
        [value]="inputWeekValue"
        (input)="onInputWeekInput($event)"
        (blur)="onInputWeekBlur($event)"
        (change)="onInputWeekChange($event)"
        name="week"
        label="Week Input"
      ></p-input-week>
      <p>Value: {{ inputWeekValue }}</p>
      <p>Blur: {{ inputWeekBlurCounter }}</p>
      <p>Change: {{ inputWeekChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-email
        [value]="inputEmailValue"
        (input)="onInputEmailInput($event)"
        (blur)="onInputEmailBlur($event)"
        (change)="onInputEmailChange($event)"
        name="email"
        label="Email Input"
      ></p-input-email>
      <p>Value: {{ inputEmailValue }}</p>
      <p>Blur: {{ inputEmailBlurCounter }}</p>
      <p>Change: {{ inputEmailChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-number
        [value]="inputNumberValue"
        (input)="onInputNumberInput($event)"
        (blur)="onInputNumberBlur($event)"
        (change)="onInputNumberChange($event)"
        name="number"
        label="Number Input"
        [controls]="true"
      ></p-input-number>
      <p>Value: {{ inputNumberValue }}</p>
      <p>Blur: {{ inputNumberBlurCounter }}</p>
      <p>Change: {{ inputNumberChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-password
        [value]="inputPasswordValue"
        (input)="onInputPasswordInput($event)"
        (blur)="onInputPasswordBlur($event)"
        (change)="onInputPasswordChange($event)"
        name="password"
        label="Password Input"
        [toggle]="true"
      ></p-input-password>
      <p>Value: {{ inputPasswordValue }}</p>
      <p>Blur: {{ inputPasswordBlurCounter }}</p>
      <p>Change: {{ inputPasswordChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-search
        [value]="inputSearchValue"
        (input)="onInputSearchInput($event)"
        (blur)="onInputSearchBlur($event)"
        (change)="onInputSearchChange($event)"
        name="search"
        label="Search Input"
        [indicator]="true"
      ></p-input-search>
      <p>Value: {{ inputSearchValue }}</p>
      <p>Blur: {{ inputSearchBlurCounter }}</p>
      <p>Change: {{ inputSearchChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-tel
        [value]="inputTelValue"
        (input)="onInputTelInput($event)"
        (blur)="onInputTelBlur($event)"
        (change)="onInputTelChange($event)"
        name="tel"
        label="Tel Input"
      ></p-input-tel>
      <p>Value: {{ inputTelValue }}</p>
      <p>Blur: {{ inputTelBlurCounter }}</p>
      <p>Change: {{ inputTelChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-text
        [value]="inputTextValue"
        (input)="onInputTextInput($event)"
        (blur)="onInputTextBlur($event)"
        (change)="onInputTextChange($event)"
        name="text"
        label="Text Input"
        placeholder="Some placeholder"
      ></p-input-text>
      <p>Value: {{ inputTextValue }}</p>
      <p>Blur: {{ inputTextBlurCounter }}</p>
      <p>Change: {{ inputTextChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-time
        [value]="inputTimeValue"
        (input)="onInputTimeInput($event)"
        (blur)="onInputTimeBlur($event)"
        (change)="onInputTimeChange($event)"
        name="time"
        label="Time Input"
      ></p-input-time>
      <p>Value: {{ inputTimeValue }}</p>
      <p>Blur: {{ inputTimeBlurCounter }}</p>
      <p>Change: {{ inputTimeChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-input-url
        [value]="inputUrlValue"
        (input)="onInputUrlInput($event)"
        (blur)="onInputUrlBlur($event)"
        (change)="onInputUrlChange($event)"
        name="url"
        label="URL Input"
        [indicator]="true"
      ></p-input-url>
      <p>Value: {{ inputUrlValue }}</p>
      <p>Blur: {{ inputUrlBlurCounter }}</p>
      <p>Change: {{ inputUrlChangeCounter }}</p>
    </div>

    <div class="playground light">
      <p-textarea
        [value]="textareaValue"
        (input)="onTextareaInput($event)"
        (blur)="onTextareaBlur($event)"
        (change)="onTextareaChange($event)"
        name="textarea"
        label="Textarea"
      ></p-textarea>
      <p>Value: {{ textareaValue }}</p>
      <p>Blur: {{ textareaBlurCounter }}</p>
      <p>Change: {{ textareaChangeCounter }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EventsComponent {
  public accordionUpdateEventCounter = 0;
  public paginationUpdateEventCounter = 0;
  public tabsBarUpdateEventCounter = 0;
  public tabsUpdateEventCounter = 0;
  public textFieldSearchValue = '';
  public switchUpdateEventCounter = 0;
  public bannerDismissEventCounter = 0;
  public isBannerOpen = false;
  public modalDismissEventCounter = 0;
  public isModalOpen = false;
  public tableUpdateEventCounter = 0;
  public carouselUpdateEventCounter = 0;

  public inputDateValue = '';
  public inputDateBlurCounter = 0;
  public inputDateChangeCounter = 0;

  public inputMonthValue = '';
  public inputMonthBlurCounter = 0;
  public inputMonthChangeCounter = 0;

  public inputWeekValue = '';
  public inputWeekBlurCounter = 0;
  public inputWeekChangeCounter = 0;

  public inputEmailValue = '';
  public inputEmailBlurCounter = 0;
  public inputEmailChangeCounter = 0;

  public inputNumberValue = '';
  public inputNumberBlurCounter = 0;
  public inputNumberChangeCounter = 0;

  public inputPasswordValue = '';
  public inputPasswordBlurCounter = 0;
  public inputPasswordChangeCounter = 0;

  public inputSearchValue = '';
  public inputSearchBlurCounter = 0;
  public inputSearchChangeCounter = 0;

  public inputTelValue = '';
  public inputTelBlurCounter = 0;
  public inputTelChangeCounter = 0;

  public inputTextValue = '';
  public inputTextBlurCounter = 0;
  public inputTextChangeCounter = 0;

  public inputTimeValue = '';
  public inputTimeBlurCounter = 0;
  public inputTimeChangeCounter = 0;

  public inputUrlValue = '';
  public inputUrlBlurCounter = 0;
  public inputUrlChangeCounter = 0;

  public textareaValue = '';
  public textareaBlurCounter = 0;
  public textareaChangeCounter = 0;

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported package root
  public onAccordionUpdate(e: CustomEvent<AccordionUpdateEventDetail>) {
    this.accordionUpdateEventCounter++;
  }

  public onPaginationUpdate(e: CustomEvent<PaginationUpdateEventDetail>) {
    this.paginationUpdateEventCounter++;
  }

  public onTabsBarUpdate(e: CustomEvent<TabsBarUpdateEventDetail>) {
    this.tabsBarUpdateEventCounter++;
  }

  public onTabsUpdate(e: CustomEvent<TabsUpdateEventDetail>) {
    this.tabsUpdateEventCounter++;
  }

  public onTextFieldSearchInput(e: Event) {
    this.textFieldSearchValue = (e.target as HTMLInputElement).value;
  }

  public onSwitchUpdate(e: CustomEvent<SwitchUpdateEventDetail>) {
    this.switchUpdateEventCounter++;
  }

  public openBanner() {
    this.isBannerOpen = true;
  }

  public onBannerDismiss() {
    this.bannerDismissEventCounter++;
    this.isBannerOpen = false;
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public onModalDismiss() {
    this.modalDismissEventCounter++;
    this.isModalOpen = false;
  }

  public onTableUpdate(e: CustomEvent<TableUpdateEventDetail>) {
    this.tableUpdateEventCounter++;
  }

  public onCarouselUpdate(e: CustomEvent<CarouselUpdateEventDetail>) {
    this.carouselUpdateEventCounter++;
  }

  // PInputDate
  public onInputDateInput(e: CustomEvent<InputDateInputEventDetail>) {
    this.inputDateValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputDateBlur(e: CustomEvent<InputDateBlurEventDetail>) {
    this.inputDateBlurCounter++;
  }
  public onInputDateChange(e: CustomEvent<InputDateChangeEventDetail>) {
    this.inputDateChangeCounter++;
  }

  // PInputMonth
  public onInputMonthInput(e: CustomEvent<InputMonthInputEventDetail>) {
    this.inputMonthValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputMonthBlur(e: CustomEvent<InputMonthBlurEventDetail>) {
    this.inputMonthBlurCounter++;
  }
  public onInputMonthChange(e: CustomEvent<InputMonthChangeEventDetail>) {
    this.inputMonthChangeCounter++;
  }

  // PInputWeek
  public onInputWeekInput(e: CustomEvent<InputWeekInputEventDetail>) {
    this.inputWeekValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputWeekBlur(e: CustomEvent<InputWeekBlurEventDetail>) {
    this.inputWeekBlurCounter++;
  }
  public onInputWeekChange(e: CustomEvent<InputWeekChangeEventDetail>) {
    this.inputWeekChangeCounter++;
  }

  // PInputEmail
  public onInputEmailInput(e: CustomEvent<InputEmailInputEventDetail>) {
    this.inputEmailValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputEmailBlur(e: CustomEvent<InputEmailBlurEventDetail>) {
    this.inputEmailBlurCounter++;
  }
  public onInputEmailChange(e: CustomEvent<InputEmailChangeEventDetail>) {
    this.inputEmailChangeCounter++;
  }

  // PInputNumber
  public onInputNumberInput(e: CustomEvent<InputNumberInputEventDetail>) {
    this.inputNumberValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputNumberBlur(e: CustomEvent<InputNumberBlurEventDetail>) {
    this.inputNumberBlurCounter++;
  }
  public onInputNumberChange(e: CustomEvent<InputNumberChangeEventDetail>) {
    this.inputNumberChangeCounter++;
  }

  // PInputPassword
  public onInputPasswordInput(e: CustomEvent<InputPasswordInputEventDetail>) {
    this.inputPasswordValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputPasswordBlur(e: CustomEvent<InputPasswordBlurEventDetail>) {
    this.inputPasswordBlurCounter++;
  }
  public onInputPasswordChange(e: CustomEvent<InputPasswordChangeEventDetail>) {
    this.inputPasswordChangeCounter++;
  }

  // PInputSearch
  public onInputSearchInput(e: CustomEvent<InputSearchInputEventDetail>) {
    this.inputSearchValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputSearchBlur(e: CustomEvent<InputSearchBlurEventDetail>) {
    this.inputSearchBlurCounter++;
  }
  public onInputSearchChange(e: CustomEvent<InputSearchChangeEventDetail>) {
    this.inputSearchChangeCounter++;
  }

  // PInputTel
  public onInputTelInput(e: CustomEvent<InputTelInputEventDetail>) {
    this.inputTelValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputTelBlur(e: CustomEvent<InputTelBlurEventDetail>) {
    this.inputTelBlurCounter++;
  }
  public onInputTelChange(e: CustomEvent<InputTelChangeEventDetail>) {
    this.inputTelChangeCounter++;
  }

  // PInputText
  public onInputTextInput(e: CustomEvent<InputTextInputEventDetail>) {
    this.inputTextValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputTextBlur(e: CustomEvent<InputTextBlurEventDetail>) {
    this.inputTextBlurCounter++;
  }
  public onInputTextChange(e: CustomEvent<InputTextChangeEventDetail>) {
    this.inputTextChangeCounter++;
  }

  // PInputTime
  public onInputTimeInput(e: CustomEvent<InputTimeInputEventDetail>) {
    this.inputTimeValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputTimeBlur(e: CustomEvent<InputTimeBlurEventDetail>) {
    this.inputTimeBlurCounter++;
  }
  public onInputTimeChange(e: CustomEvent<InputTimeChangeEventDetail>) {
    this.inputTimeChangeCounter++;
  }

  // PInputUrl
  public onInputUrlInput(e: CustomEvent<InputUrlInputEventDetail>) {
    this.inputUrlValue = (e.detail.target as HTMLInputElement).value;
  }
  public onInputUrlBlur(e: CustomEvent<InputUrlBlurEventDetail>) {
    this.inputUrlBlurCounter++;
  }
  public onInputUrlChange(e: CustomEvent<InputUrlChangeEventDetail>) {
    this.inputUrlChangeCounter++;
  }

  // PTextarea
  public onTextareaInput(e: CustomEvent<TextareaInputEventDetail>) {
    this.textareaValue = (e.detail.target as HTMLTextAreaElement).value;
  }
  public onTextareaBlur(e: CustomEvent<TextareaBlurEventDetail>) {
    this.textareaBlurCounter++;
  }
  public onTextareaChange(e: CustomEvent<TextareaChangeEventDetail>) {
    this.textareaChangeCounter++;
  }
}
