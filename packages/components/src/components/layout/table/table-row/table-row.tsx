import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  tag: 'p-table-row',
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
