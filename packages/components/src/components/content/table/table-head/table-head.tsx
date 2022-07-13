import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../utils';
import { getComponentCss } from './table-head-styles';

const propTypes: PropTypes<typeof TableHead> = {};

@Component({
  tag: 'p-table-head',
  shadow: true,
})
export class TableHead {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTable');
    attachComponentCss(this.host, getComponentCss);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-table-head');
  }

  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
