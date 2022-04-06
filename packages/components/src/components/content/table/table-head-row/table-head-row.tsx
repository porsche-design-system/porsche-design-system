import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss } from '../../../../utils';
import { throwIfParentIsNotOfKind } from '../../../../utils/dom'; // required for lifecycle validation test
import { getComponentCss } from './table-head-row-styles';

@Component({
  tag: 'p-table-head-row',
  shadow: true,
})
export class TableHeadRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableHead');
    attachComponentCss(this.host, getComponentCss);
  }

  public render(): JSX.Element {
    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
