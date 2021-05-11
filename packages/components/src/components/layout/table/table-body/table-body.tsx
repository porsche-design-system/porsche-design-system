import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  tag: 'p-table-body',
  styleUrl: './table-body.scss',
  shadow: true,
})
export class TableBody {
  public render(): JSX.Element {
    return (
      <Host role="rowgroup">
        <slot />
      </Host>
    );
  }
}
