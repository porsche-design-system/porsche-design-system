import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachConstructedCss, throwIfParentIsNotOfKind } from '../../../../utils';
import { getComponentCss } from './table-body-styles';

@Component({
  tag: 'p-table-body',
  shadow: true,
})
export class TableBody {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTable');
    attachConstructedCss(this.host, getComponentCss);
  }

  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
