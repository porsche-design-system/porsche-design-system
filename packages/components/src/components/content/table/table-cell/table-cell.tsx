import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../utils';
import { getComponentCss } from './table-cell-styles';

const propTypes: PropTypes<typeof TableCell> = {
  multiline: AllowedTypes.boolean,
};

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
    validateProps(this, propTypes, 'p-table-cell');
    attachComponentCss(this.host, getComponentCss, this.multiline);
  }

  public render(): JSX.Element {
    return (
      <Host role="cell">
        <slot />
      </Host>
    );
  }
}
