import { Component, Element, Event, EventEmitter, h, Host, JSX } from '@stencil/core';
import { insertSlottedStyles } from '../../../../utils';
import { addCss, getSlottedCss, SORT_EVENT_NAME } from '../table-utils';
import type { TableHeadItem } from '../table-utils';

@Component({
  tag: 'p-table',
  shadow: true,
})
export class Table {
  @Element() public host!: HTMLElement;

  @Event({ bubbles: false }) public sortingChange: EventEmitter<TableHeadItem>;

  public connectedCallback(): void {
    this.addSlottedStyles();
  }

  public componentWillLoad(): void {
    this.host.shadowRoot.addEventListener(SORT_EVENT_NAME, (e: CustomEvent<TableHeadItem>) => {
      e.stopPropagation();
      this.sortingChange.emit(e.detail);
    });
  }

  public componentWillRender(): void {
    addCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host role="table">
        <slot />
      </Host>
    );
  }

  private addSlottedStyles(): void {
    insertSlottedStyles(this.host, getSlottedCss(this.host));
  }
}
