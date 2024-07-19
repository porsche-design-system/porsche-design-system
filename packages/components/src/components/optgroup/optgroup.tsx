import type { PropTypes } from '../../types';
import { SelectOptgroupInternalHTMLProps, updateOptionsDisabled } from './optgroup-utils';

import { Component, Element, h, Host, type JSX, Prop, Watch } from '@stencil/core';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../utils';
import { getComponentCss } from './optgroup-styles';

const propTypes: PropTypes<typeof Optgroup> = {
  label: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
};

@Component({
  tag: 'p-optgroup',
  shadow: true,
})
export class Optgroup {
  @Element() public host!: HTMLElement & SelectOptgroupInternalHTMLProps;

  /** The optgroup label. */
  @Prop() public label?: string;

  /** Disables the optgroup. */
  @Prop() public disabled?: boolean = false;

  @Watch('disabled')
  public handleDisabledChange(): void {
    updateOptionsDisabled(this.host, this.disabled);
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-select', 'p-multi-select']);
  }

  public componentWillLoad(): void {
    updateOptionsDisabled(this.host, this.disabled);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { theme = 'light', hidden } = this.host;
    attachComponentCss(this.host, getComponentCss, this.disabled, theme);

    return (
      <Host>
        <div
          /* todo role="group" ? */
          role="presentation"
          class={{
            optgroup: true,
            'optgroup--disabled': this.disabled,
          }}
          aria-disabled={this.disabled ? 'true' : null}
          aria-hidden={hidden ? 'true' : null}
          aria-label={!!this.label ? null : 'Empty value'}
        >
          <span class={{ label: true }}>{this.label}</span>
          <slot />
        </div>
      </Host>
    );
  }
}
