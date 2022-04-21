import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss } from '../../../../utils';
import { throwIfParentIsNotOfKind } from '../../../../utils/dom'; // required for lifecycle validation test
import { getComponentCss } from './table-body-styles';

@Component({
  tag: 'p-table-body',
  shadow: true,
})
export class TableBody {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTable');
    attachComponentCss(this.host, getComponentCss);
  }

  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
