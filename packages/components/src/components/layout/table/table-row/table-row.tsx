import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  tag: 'p-table-row',
  styleUrl: './table-row.scss',
  shadow: true,
})
export class TableRow {
  public render(): JSX.Element {
    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
