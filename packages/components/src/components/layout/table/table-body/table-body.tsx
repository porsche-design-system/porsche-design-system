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
    throwIfParentIsNotOfKind(this.host, 'pTable');
  }

  public componentWillRender(): void {
    addCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
