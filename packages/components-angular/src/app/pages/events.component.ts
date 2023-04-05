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
  public modalDismissEventCounter = 0;
  public isModalOpen = false;
  public tableUpdateEventCounter = 0;
  public carouselUpdateEventCounter = 0;

  // TODO: inline-notification, segmented-control and stepper-horizontal are missing

  // unused event parameters are used to verify that types can be imported package root
  public onAccordionUpdate(e: CustomEvent<AccordionChangeEvent>) {
    this.accordionUpdateEventCounter++;
  }

  public onPaginationUpdate(e: CustomEvent<PaginationChangeEvent>) {
    this.paginationUpdateEventCounter++;
  }

  public onTabsBarUpdate(e: CustomEvent<TabsBarChangeEvent>) {
    this.tabsBarUpdateEventCounter++;
  }

  public onTabsUpdate(e: CustomEvent<TabsChangeEvent>) {
    this.tabsUpdateEventCounter++;
  }

  public onTextFieldSearchInput(e: Event) {
    this.textFieldSearchValue = (e.target as HTMLInputElement).value;
  }

  public onSwitchUpdate(e: CustomEvent<SwitchChangeEvent>) {
    this.switchUpdateEventCounter++;
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public onModalDismiss() {
    this.modalDismissEventCounter++;
    this.isModalOpen = false;
  }

  public onTableUpdate(e: CustomEvent<TableChangeEvent>) {
    this.tableUpdateEventCounter++;
  }

  public onCarouselUpdate(e: CustomEvent<CarouselChangeEvent>) {
    this.carouselUpdateEventCounter++;
  }
}
