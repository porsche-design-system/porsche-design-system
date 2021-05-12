import { Component, Element, h, Host, JSX } from '@stencil/core';
import { addCss } from '../table-utils';

@Component({
  tag: 'p-table-head',
  // styleUrl: './table-head.scss',
  shadow: true,
})
export class TableHead {
  @Element() public host!: HTMLElement;

  public componentWillRender(): void {
    addCss(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
