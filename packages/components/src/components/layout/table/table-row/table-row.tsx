import { Component, Element, h, Host, JSX } from '@stencil/core';
import { throwIfParentIsNotOfKind } from '../../../../utils';
import { addComponentCss } from './table-row-styles';

@Component({
  tag: 'p-table-row',
  shadow: true,
})
export class TableRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableBody');
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
