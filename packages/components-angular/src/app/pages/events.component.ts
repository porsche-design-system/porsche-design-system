import { ChangeDetectionStrategy, Component } from '@angular/core';
import type {
  AccordionUpdateEvent, // using deprecated to verify it is still available
  CarouselUpdateEvent, // using deprecated to verify it is still available
  PaginationUpdateEvent, // using deprecated to verify it is still available
  TableUpdateEvent, // using deprecated to verify it is still available
  SwitchUpdateEvent, // using deprecated to verify it is still available
  TabsBarUpdateEvent, // using deprecated to verify it is still available
  TabsUpdateEvent, // using deprecated to verify it is still available
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported package root
  public onAccordionUpdate(e: CustomEvent<AccordionUpdateEvent>) {
    this.accordionUpdateEventCounter++;
  }

  public onPaginationUpdate(e: CustomEvent<PaginationUpdateEvent>) {
    this.paginationUpdateEventCounter++;
  }

  public onTabsBarUpdate(e: CustomEvent<TabsBarUpdateEvent>) {
    this.tabsBarUpdateEventCounter++;
  }

  public onTabsUpdate(e: CustomEvent<TabsUpdateEvent>) {
    this.tabsUpdateEventCounter++;
  }

  public onTextFieldSearchInput(e: Event) {
    this.textFieldSearchValue = (e.target as HTMLInputElement).value;
  }

  public onSwitchUpdate(e: CustomEvent<SwitchUpdateEvent>) {
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

  public onTableUpdate(e: CustomEvent<TableUpdateEvent>) {
    this.tableUpdateEventCounter++;
  }

  public onCarouselUpdate(e: CustomEvent<CarouselUpdateEvent>) {
    this.carouselUpdateEventCounter++;
  }
}
