import { Component, Element, h, Host, JSX } from '@stencil/core';
import { addCss } from '../table-utils';
import { throwIfParentIsNotOneOfKind } from '../../../../utils';

@Component({
  tag: 'p-table-row',
  shadow: true,
})
export class TableRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOneOfKind(this.host, ['pTable', 'pTableHead', 'pTableBody']);
  }

  public componentWillRender(): void {
    addCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
