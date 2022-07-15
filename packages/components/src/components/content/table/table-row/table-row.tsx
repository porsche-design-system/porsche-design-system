import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../utils';
import { getComponentCss } from './table-row-styles';

const propTypes: PropTypes<typeof TableRow> = {};

@Component({
  tag: 'p-table-row',
  shadow: true,
})
export class TableRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableBody');
    attachComponentCss(this.host, getComponentCss);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
  }

  public render(): JSX.Element {
    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
