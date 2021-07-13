import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { throwIfParentIsNotOfKind } from '../../../../utils';
import { addComponentCss } from './table-cell-styles';

@Component({
  tag: 'p-table-cell',
  shadow: true,
})
export class TableCell {
  @Element() public host!: HTMLElement;

  /** Displays slotted text multiline or forced into a single line. */
  @Prop() public multiline?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableRow');
  }

  public componentWillRender(): void {
    addComponentCss(this.host, this.multiline);
  }

  public render(): JSX.Element {
    return (
      <Host role="cell">
        <slot />
      </Host>
    );
  }
}
