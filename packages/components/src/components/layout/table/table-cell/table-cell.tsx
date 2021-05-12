import { Component, Element, h, Host, JSX } from '@stencil/core';
import { addCss } from '../table-utils';
import { throwIfParentIsNotOfKind } from '../../../../utils';

@Component({
  tag: 'p-table-cell',
  shadow: true,
})
export class TableCell {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableRow');
  }

  public componentWillRender(): void {
    addCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host role="cell">
        <slot />
      </Host>
    );
  }
}
