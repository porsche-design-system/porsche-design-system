import { ChangeDetectionStrategy, Component } from '@angular/core';

const head = [
  { name: 'Slotted Styles', sort: { id: 'some-id', active: false, direction: 'asc' } },
  { name: 'Multiline text', sort: { id: 'some-id', active: true, direction: 'desc' } },
  { name: 'Min width cell', style: { minWidth: 250 } },
  { name: 'Multiline<br/>header<br/>cell', sort: { id: 'some-id', active: true, direction: 'asc' } },
  { name: 'Hide header cell', hideLabel: true },
];

@Component({
  selector: 'page-table',
  template: `
    <div class="playground light" title="should render table with hidden caption">
      <p-table caption="Some caption" hideCaption>
        <p-table-head>
          <p-table-head-row>
            <p-table-head-cell
              *ngFor="let item of head"
              [sort]="item.sort"
              [hideLabel]="item.hideLabel"
              [style]="item.style?.minWidth ? 'min-width: 250px;' : null"
              [innerHTML]="item.name"
            ></p-table-head-cell>
          </p-table-head-row>
        </p-table-head>
        <p-table-body>
          <p-table-row *ngFor="let item of [0, 1, 2, 3]">
            <p-table-cell>
              <img
                src="https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg"
                width="80"
                height="48"
                style="margin-right: .5rem;"
                alt=""
              />
              <a href="#">link</a>&nbsp;<b>bold</b>&nbsp;<i>italic</i>&nbsp;<strong>strong</strong>&nbsp;<em
                >emphasized</em
              >
            </p-table-cell>
            <p-table-cell style="white-space: normal"
              >Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p-table-cell
            >
            <p-table-cell>Some text</p-table-cell>
            <p-table-cell>Some text</p-table-cell>
            <p-table-cell>
              <p-button-pure icon="edit" style="padding: .5rem;">Edit</p-button-pure>
              <p-button-pure icon="delete" style="padding: .5rem;">Delete</p-button-pure>
            </p-table-cell>
          </p-table-row>
        </p-table-body>
      </p-table>
    </div>

    <div class="playground light" title="should render table with caption">
      <p-table caption="Some caption"></p-table>
    </div>

    <div class="playground light" title="should render table with slotted caption">
      <p-table>
        <span slot="caption">Some caption <a href="#">with a link</a></span>
      </p-table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  public head = head;
}
