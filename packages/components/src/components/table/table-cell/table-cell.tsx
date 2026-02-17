import { Component, Element, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../utils';
import { getComponentCss } from './table-cell-styles';

const propTypes: PropTypes<typeof TableCell> = {
  multiline: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the table cell content." }
 */
@Component({
  tag: 'p-table-cell',
  shadow: true,
})
export class TableCell {
  @Element() public host!: HTMLElement;

  /** Displays slotted text multiline or forced into a single line. */
  @Prop() public multiline?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table-row');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.multiline);

    return (
      <Host role="cell">
        <slot />
      </Host>
    );
  }
}
