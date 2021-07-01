import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PageChangeEvent,
  SortingChangeEvent,
  SwitchChangeEvent,
  TabChangeEvent,
} from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-events',
  template: `
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
  pageChangeEventCounter: number = 0;
  tabsBarChangeEventCounter: number = 0;
  tabsChangeEventCounter: number = 0;
  switchChangeEventCounter: number = 0;
  modalCloseEventCounter: number = 0;
  isModalOpen = false;
  tableSortingChangeEventCounter: number = 0;

  onPageChange(e: CustomEvent<PageChangeEvent>) {
    this.pageChangeEventCounter++;
  }

  onTabsBarChange(e: CustomEvent<TabChangeEvent>) {
    this.tabsBarChangeEventCounter++;
  }

  onTabsChange(e: CustomEvent<TabChangeEvent>) {
    this.tabsChangeEventCounter++;
  }

  onSwitchChange(e: CustomEvent<SwitchChangeEvent>) {
    this.switchChangeEventCounter++;
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.modalCloseEventCounter++;
    this.isModalOpen = false;
  }

  onTableSortingChange(e: CustomEvent<SortingChangeEvent>) {
    this.tableSortingChangeEventCounter++;
  }
}
