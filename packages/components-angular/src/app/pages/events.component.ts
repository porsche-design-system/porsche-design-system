import { ChangeDetectionStrategy, Component } from '@angular/core';
import type {
  AccordionChangeEvent,
  CarouselChangeEvent,
  PaginationChangeEvent,
  TableChangeEvent,
  SwitchChangeEvent,
  TabsBarChangeEvent,
  TabsChangeEvent,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-events',
  template: `
    <div class="playground light">
      <p-accordion [heading]="'Some heading'" (change)="onAccordionChange($event)">
        Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua.
      </p-accordion>
      <p>{{ accordionChangeEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-pagination
        [totalItemsCount]="500"
        [itemsPerPage]="25"
        [activePage]="1"
        (change)="onPaginationChange($event)"
      ></p-pagination>
      <p>{{ paginationChangeEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-tabs-bar [activeTabIndex]="0" (change)="onTabsBarChange($event)">
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </p-tabs-bar>
      <p>{{ tabsBarChangeEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-tabs [activeTabIndex]="0" (change)="onTabsChange($event)">
        <p-tabs-item label="Tab 1">Content 1</p-tabs-item>
        <p-tabs-item label="Tab 2">Content 2</p-tabs-item>
        <p-tabs-item label="Tab 3">Content 3</p-tabs-item>
      </p-tabs>
      <p>{{ tabsChangeEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-text-field-wrapper>
        <input type="search" [value]="textFieldSearchValue" (input)="onTextFieldSearchInput($event)" />
      </p-text-field-wrapper>
      <p>Value: {{ textFieldSearchValue }}</p>
    </div>

    <div class="playground light">
      <p-switch (change)="onSwitchChange($event)">Switch</p-switch>
      <p>{{ switchChangeEventCounter }}</p>
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
      <p-table (change)="onTableChange($event)">
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell [sort]="{ id: 'col1', active: true, direction: 'asc' }">Col 1</p-table-head-cell>
          </p-table-head-row>
        </p-table-head>
      </p-table>
      <p>{{ tableChangeEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-carousel (change)="onCarouselChange($event)">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
      <p>{{ carouselChangeEventCounter }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  public accordionChangeEventCounter = 0;
  public paginationChangeEventCounter = 0;
  public tabsBarChangeEventCounter = 0;
  public tabsChangeEventCounter = 0;
  public textFieldSearchValue = '';
  public switchChangeEventCounter = 0;
  public bannerDismissEventCounter = 0;
  public isBannerOpen = false;
  public modalDismissEventCounter = 0;
  public isModalOpen = false;
  public tableChangeEventCounter = 0;
  public carouselChangeEventCounter = 0;

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported package root
  public onAccordionChange(e: CustomEvent<AccordionChangeEvent>) {
    this.accordionChangeEventCounter++;
  }

  public onPaginationChange(e: CustomEvent<PaginationChangeEvent>) {
    this.paginationChangeEventCounter++;
  }

  public onTabsBarChange(e: CustomEvent<TabsBarChangeEvent>) {
    this.tabsBarChangeEventCounter++;
  }

  public onTabsChange(e: CustomEvent<TabsChangeEvent>) {
    this.tabsChangeEventCounter++;
  }

  public onTextFieldSearchInput(e: Event) {
    this.textFieldSearchValue = (e.target as HTMLInputElement).value;
  }

  public onSwitchChange(e: CustomEvent<SwitchChangeEvent>) {
    this.switchChangeEventCounter++;
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

  public onTableChange(e: CustomEvent<TableChangeEvent>) {
    this.tableChangeEventCounter++;
  }

  public onCarouselChange(e: CustomEvent<CarouselChangeEvent>) {
    this.carouselChangeEventCounter++;
  }
}
