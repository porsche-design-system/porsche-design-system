import { Component, Element, h, Host, JSX } from '@stencil/core';
import { throwIfParentIsNotOfKind } from '../../../../utils';
import { addComponentCss } from './table-body-styles';

@Component({
  tag: 'p-table-body',
  shadow: true,
})
export class TableBody {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTable');
    addComponentCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
