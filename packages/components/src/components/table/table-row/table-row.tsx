import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, throwIfParentIsNotOfKind, validateProps } from '../../../utils';
import { getComponentCss } from './table-row-styles';
import type { PropTypes, Theme } from '../../../types';

const propTypes: PropTypes<typeof TableRow> = {
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-table-row',
  shadow: true,
})
export class TableRow {
  @Element() public host!: HTMLElement;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table-body');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
