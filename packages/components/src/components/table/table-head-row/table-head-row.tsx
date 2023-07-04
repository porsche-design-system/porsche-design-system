import { Component, Element, h, Host, type JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../utils';
import { getComponentCss } from './table-head-row-styles';

@Component({
  tag: 'p-table-head-row',
  shadow: true,
})
export class TableHeadRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table-head');
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
