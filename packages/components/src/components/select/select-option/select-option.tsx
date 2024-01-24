import type { PropTypes } from '../../../types';
import type { SelectOptionInternalHTMLProps } from './select-option-utils';

import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../utils';
import { getComponentCss } from './select-option-styles';

const propTypes: PropTypes<typeof SelectOption> = {
  value: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
};

@Component({
  tag: 'p-select-option',
  shadow: true,
})
export class SelectOption {
  @Element() public host!: HTMLElement & SelectOptionInternalHTMLProps;

  /** The option value. */
  @Prop() public value: string;

  /** Disables the option. */
  @Prop() public disabled?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-select');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { theme = 'light', highlighted, hidden } = this.host;
    attachComponentCss(this.host, getComponentCss, theme);

    return <div class="root"></div>;
  }
}
