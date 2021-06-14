import { Component, Element, h, Host, JSX } from '@stencil/core';
import { addCss } from '../table-utils';
import { throwIfParentIsNotOfKind } from '../../../../utils';

@Component({
  tag: 'p-table-body',
  shadow: true,
})
export class TableBody {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    addCss(this.host);
    throwIfParentIsNotOfKind(this.host, 'pTable');
  }

  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
