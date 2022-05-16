import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dataVrt, headVrt } from '@porsche-design-system/shared';

@Component({
  selector: 'page-table',
  template: `
    <div class="playground light" title="should render table">
      <p-table caption="Some caption">
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell
              *ngFor="let item of head"
              [sort]="item"
              [hideLabel]="item.hideLabel"
              [multiline]="item.multiline"
              [style]="item.style?.minWidth ? 'min-width: 250px;' : null"
              [innerHTML]="item.name"
            ></p-table-head-cell>
          </p-table-head-row>
        </p-table-head>
        <p-table-body>
          <p-table-row *ngFor="let item of data">
            <p-table-cell>
              <img
                [src]="item.imageUrl"
                [width]="item.imageWidth"
                [height]="item.imageHeight"
                style="margin-right: .5rem;"
                alt=""
              />
              <span [innerHTML]="item.html"></span>
            </p-table-cell>
            <p-table-cell [multiline]="true">{{ item.longText }}</p-table-cell>
            <p-table-cell>{{ item.shortText }}</p-table-cell>
            <p-table-cell>{{ item.shortText }}</p-table-cell>
            <p-table-cell>{{ item.shortText }}</p-table-cell>
            <p-table-cell>
              <p-button-pure icon="edit" style="padding: .5rem;">Edit</p-button-pure>
              <p-button-pure icon="delete" style="padding: .5rem;">Delete</p-button-pure>
            </p-table-cell>
          </p-table-row>
        </p-table-body>
      </p-table>
    </div>

    <div class="playground light" title="should render table with unstyled slotted caption">
      <p-table>
        <span slot="caption">Some unstyled caption <a href="#">with a link</a></span>
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell>Column 1</p-table-head-cell>
            <p-table-head-cell>Column 2</p-table-head-cell>
          </p-table-head-row>
        </p-table-head>
      </p-table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  public head = headVrt;
  public data = dataVrt;
}
