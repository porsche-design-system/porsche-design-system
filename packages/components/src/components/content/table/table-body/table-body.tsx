import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../utils';
import { getComponentCss } from './table-body-styles';

const propTypes: PropTypes<typeof TableBody> = {};

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

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-table-body');
  }

  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
