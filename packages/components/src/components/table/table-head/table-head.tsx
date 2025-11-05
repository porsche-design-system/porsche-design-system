import { Component, Element, Host, h, type JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../utils';
import { getComponentCss } from './table-head-styles';

/**
 * @slot {"name": "", "description": "Default slot for the table head content." }
 */
@Component({
  tag: 'p-table-head',
  shadow: true,
})
export class TableHead {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table');
  }

  public render(): JSX.Element {
    attachComponentCss(this.host, getComponentCss);
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
