import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, throwIfParentIsNotOfKind, validateProps } from '../../../utils';
import type { PropTypes, Theme } from '../../../types';
import { getComponentCss } from './table-cell-styles';

const propTypes: PropTypes<typeof TableCell> = {
  multiline: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-table-cell',
  shadow: true,
})
export class TableCell {
  @Element() public host!: HTMLElement;

  /** Displays slotted text multiline or forced into a single line. */
  @Prop() public multiline?: boolean = false;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table-row');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.multiline, this.theme);

    return (
      <Host role="cell">
        <slot />
      </Host>
    );
  }
}
