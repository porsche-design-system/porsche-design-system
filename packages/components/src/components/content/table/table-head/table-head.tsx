import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachConstructedCss, throwIfParentIsNotOfKind } from '../../../../utils';
import { getComponentCss } from './table-head-styles';

@Component({
  tag: 'p-table-head',
  shadow: true,
})
export class TableHead {
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
