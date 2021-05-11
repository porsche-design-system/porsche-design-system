import { Component, Element, Event, EventEmitter, h, Host, JSX } from '@stencil/core';
import { insertSlottedStyles } from '../../../../utils';
import { getSlottedCss, TableHeadItem } from '../table-utils';

@Component({
  tag: 'p-table',
  styleUrl: '../../simple-table/table.scss',
  shadow: true,
})
export class Table {
  @Element() public host!: HTMLElement;

  @Event({ bubbles: false }) public headClick: EventEmitter<TableHeadItem>;

  public connectedCallback(): void {
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    return (
      <Host role="table">
        <slot />
      </Host>
    );
  }

  // private handleHeadClick = (headItem: HeadItem): void => {
  //   if (headItem.isSortable) {
  //     this.headClick.emit({
  //       ...headItem,
  //       isSorting: true,
  //       direction: toggleDirection(headItem.direction),
  //     });
  //   }
  // };

  private addSlottedStyles(): void {
    insertSlottedStyles(this.host, getSlottedCss(this.host));
  }
}
