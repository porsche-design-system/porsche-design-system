/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-pagination',
  template: `
    <div class="playground light" title="should show default pagination on light background">
      <p-pagination [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="1"></p-pagination>
    </div>

    <div class="playground dark" title="should show pagination on dark background">
      <p-pagination [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="1" [theme]="'dark'"></p-pagination>
    </div>

    <div class="playground light" title="should show pagination with ellipsis on both sides on light background">
      <p-pagination [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="10"></p-pagination>
    </div>

    <div class="playground light" title="should show pagination with last page selected on light background">
      <p-pagination [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="20"></p-pagination>
    </div>

    <div class="playground light" title="should show pagination with less than maximum pages on light background">
      <p-pagination [totalItemsCount]="75" [itemsPerPage]="25" [activePage]="2"></p-pagination>
    </div>

    <div class="playground light" title="should show pagination with 3rd item set as active on light background">
      <p-pagination [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="3"></p-pagination>
    </div>

    <div class="playground light" title="should show pagination with 7 items (including ellipsis) on light background">
      <p-pagination [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="1" [maxNumberOfPageLinks]="7"></p-pagination>
    </div>

    <div class="playground light" title="should show pagination with 5 items (including ellipsis) on light background">
      <p-pagination [totalItemsCount]="500" [itemsPerPage]="25" [activePage]="1" [maxNumberOfPageLinks]="5"></p-pagination>
    </div>

    <div
      class="playground light"
      title="should show pagination with 5 or 7 items depending on window size (including ellipsis) on light background"
    >
      <p-pagination
        [totalItemsCount]="500"
        [itemsPerPage]="25"
        [activePage]="1"
        [maxNumberOfPageLinks]="{ base: 5, s: 7, l: 5 }"
      ></p-pagination>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {}
