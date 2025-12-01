import { Component, Element, Host, h, type JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../utils';
import { getComponentCss } from './table-row-styles';

/**
 * @slot {"name": "", "description": "Default slot for the table row content." }
 */
@Component({
  tag: 'p-table-row',
  shadow: true,
})
export class TableRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-table-body', 'p-table-head']);
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
