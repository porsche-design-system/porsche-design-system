import type { PropTypes } from '../../types';
import { type OptgroupInternalHTMLProps, updateOptionsDisabled } from './optgroup-utils';

import { Component, Element, h, Host, type JSX, Prop, Watch } from '@stencil/core';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../utils';
import { getComponentCss } from './optgroup-styles';

const propTypes: PropTypes<typeof Optgroup> = {
  label: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the optgroup content." }
 */
@Component({
  tag: 'p-optgroup',
  shadow: true,
})
export class Optgroup {
  @Element() public host!: HTMLElement & OptgroupInternalHTMLProps;

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
          role="group"
          class={{
            optgroup: true,
            'optgroup--disabled': this.disabled,
          }}
          aria-disabled={this.disabled ? 'true' : null}
          aria-hidden={hidden ? 'true' : null}
          aria-labelledby="label"
        >
          <span class="label" role="presentation" id="label">
            {this.label}
          </span>
          <slot />
        </div>
      </Host>
    );
  }
}
