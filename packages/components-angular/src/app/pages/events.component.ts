import { ChangeDetectionStrategy, Component } from '@angular/core';
import type {
  AccordionChangeEvent,
  PageChangeEvent,
  SortingChangeEvent,
  SwitchChangeEvent,
  TabChangeEvent,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-events',
  template: `
    <div class="playground light">
      <p-accordion [heading]="'Some heading'" (accordionChange)="onAccordionChange($event)">
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
        (pageChange)="onPageChange($event)"
      ></p-pagination>
      <p>{{ pageChangeEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-tabs-bar [activeTabIndex]="0" (tabChange)="onTabsBarChange($event)">
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </p-tabs-bar>
      <p>{{ tabsBarChangeEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-tabs [activeTabIndex]="0" (tabChange)="onTabsChange($event)">
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
      <p-switch (switchChange)="onSwitchChange($event)">Switch</p-switch>
      <p>{{ switchChangeEventCounter }}</p>
    </div>

    <div class="playground light">
      <p-modal [open]="isModalOpen" (close)="onModalClose()">Modal</p-modal>
      <p>{{ modalCloseEventCounter }} <button (click)="openModal()">Open Modal</button></p>
    </div>

    <div class="playground light">
      <p-table (sortingChange)="onTableSortingChange($event)">
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell [sort]="{ id: 'col1', active: true, direction: 'asc' }">Col 1</p-table-head-cell>
          </p-table-head-row>
        </p-table-head>
      </p-table>
      <p>{{ tableSortingChangeEventCounter }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  public accordionChangeEventCounter = 0;
  public pageChangeEventCounter = 0;
  public tabsBarChangeEventCounter = 0;
  public tabsChangeEventCounter = 0;
  public textFieldSearchValue = '';
  public switchChangeEventCounter = 0;
  public modalCloseEventCounter = 0;
  public isModalOpen = false;
  public tableSortingChangeEventCounter = 0;

  // unused event parameters are used to verify that types can be imported package root
  public onAccordionChange(e: CustomEvent<AccordionChangeEvent>) {
    this.accordionChangeEventCounter++;
  }

  public onPageChange(e: CustomEvent<PageChangeEvent>) {
    this.pageChangeEventCounter++;
  }

  public onTabsBarChange(e: CustomEvent<TabChangeEvent>) {
    this.tabsBarChangeEventCounter++;
  }

  public onTabsChange(e: CustomEvent<TabChangeEvent>) {
    this.tabsChangeEventCounter++;
  }

  public onTextFieldSearchInput(e: Event) {
    this.textFieldSearchValue = (e.target as HTMLInputElement).value;
  }

  public onSwitchChange(e: CustomEvent<SwitchChangeEvent>) {
    this.switchChangeEventCounter++;
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public onModalClose() {
    this.modalCloseEventCounter++;
    this.isModalOpen = false;
  }

  public onTableSortingChange(e: CustomEvent<SortingChangeEvent>) {
    this.tableSortingChangeEventCounter++;
  }
}
