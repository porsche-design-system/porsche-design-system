import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  tag: 'p-table-head',
  styleUrl: './table-head.scss',
  shadow: true,
})
export class TableHead {
  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
