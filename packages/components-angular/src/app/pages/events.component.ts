import { Component } from '@angular/core';

@Component({
  selector: 'events',
  template: `
    <div class="playground light">
      <p-pagination
        [totalItemsCount]="500"
        [itemsPerPage]="25"
        [activePage]="1"
        (pageChange)="onPageChange()"
      ></p-pagination>
      <p>{{ pageChangeEventCounter }}</p>
    </div>
    <div class="playground light">
      <p-tabs-bar [activeTabIndex]="0" (tabChange)="onTabChange()">
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
        <button>Tab 4</button>
        <button>Tab 5</button>
        <button>Tab 6</button>
        <button>Tab 7</button>
      </p-tabs-bar>
      <p>{{ tabChangeEventCounter }}</p>
    </div>
    <div class="playground light">
      <p-accordion [heading]="'Some heading'" (accordionChange)="onAccordionChange()">
        Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua.
      </p-accordion>
      <p>{{ accordionChangeEventCounter }}</p>
    </div>
  `,
})
export class EventsComponent {
  accordionChangeEventCounter: number = 0;
  pageChangeEventCounter: number = 0;
  tabChangeEventCounter: number = 0;

  onAccordionChange() {
    this.accordionChangeEventCounter++;
  }

  onPageChange() {
    this.pageChangeEventCounter++;
  }

  onTabChange() {
    this.tabChangeEventCounter++;
  }
}
