import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  tag: 'p-table-cell',
  shadow: true,
})
export class TableCell {
  public render(): JSX.Element {
    return (
      <Host role="cell">
        <slot />
      </Host>
    );
  }
}
