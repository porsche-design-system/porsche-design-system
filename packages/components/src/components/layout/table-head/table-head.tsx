import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames, parseJSON } from '../../../utils';
import type { HeadItem } from '../table-generics/table-utils';
import { getAriaSort, toggleDirection } from '../table-generics/table-utils';

@Component({
  tag: 'p-table-head',
  styleUrl: './table-head.scss',
  shadow: true,
})
export class TableHead {
  @Element() public host!: HTMLElement;

  @Prop() public head?: string | HeadItem[] = [];

  @Event({ bubbles: false }) public headClick: EventEmitter<HeadItem>;

  private headItems: HeadItem[] = [];

  public render(): JSX.Element {
    this.headItems = parseJSON(this.head as string) as any;
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <tr>
        {this.headItems.map(({ name, isSortable, direction, isSorting }, idx) => (
          <th
            class={{ ['sortable']: isSortable, [`sortable--${direction}`]: true, ['sortable--active']: isSorting }}
            scope="col"
            role="columnheader"
            aria-sort={getAriaSort(isSortable, direction)}
            onClick={() => this.onItemClick(idx)}
          >
            {name}
            {isSortable && (
              <span class="sorting">
                <PrefixedTagNames.pIcon color="inherit" name="arrow-up" />
                <PrefixedTagNames.pIcon color="inherit" name="arrow-down" />
              </span>
            )}
          </th>
        ))}
      </tr>
    );
  }

  public onItemClick = (idx: number): void => {
    const headItem = this.headItems[idx];

    if (headItem.isSortable) {
      this.headClick.emit({
        ...headItem,
        isSorting: true,
        direction: toggleDirection(headItem.direction),
      });
    }
  };
}
