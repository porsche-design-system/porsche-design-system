import { Component, Element, h, Host, JSX } from '@stencil/core';
import { addCss } from '../table-utils';

@Component({
  tag: 'p-table-cell',
  shadow: true,
})
export class TableCell {
  @Element() public host!: HTMLElement;

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
