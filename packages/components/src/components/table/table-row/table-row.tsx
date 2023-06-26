import { Component, Element, h, Host, type JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../utils';
import { getComponentCss } from './table-row-styles';

@Component({
  tag: 'p-table-row',
  shadow: true,
})
export class TableRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table-body');
  }

  public render(): JSX.Element {
    attachComponentCss(this.host, getComponentCss);

    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
