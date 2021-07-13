import { Component, Element, h, Host, JSX } from '@stencil/core';
import { throwIfParentIsNotOfKind } from '../../../../utils';
import { addComponentCss } from './table-head-row-styles';

@Component({
  tag: 'p-table-head-row',
  shadow: true,
})
export class TableHeadRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableHead');
    addComponentCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
