import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../utils';
import { getComponentCss } from './table-head-row-styles';

const propTypes: PropTypes<typeof TableHeadRow> = {};

@Component({
  tag: 'p-table-head-row',
  shadow: true,
})
export class TableHeadRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableHead');
    attachComponentCss(this.host, getComponentCss);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-table-head-row');
  }

  public render(): JSX.Element {
    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
