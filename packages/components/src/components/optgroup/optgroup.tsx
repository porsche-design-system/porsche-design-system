import { Component, Element, Host, h, type JSX, Prop, Watch } from '@stencil/core';
import type { PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getShadowRootHTMLElement,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../utils';
import { getComponentCss } from './optgroup-styles';
import { updateOptionsDisabled } from './optgroup-utils';

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
  @Element() public host!: HTMLElement;

  /** Sets the visible group heading displayed above the grouped options. */
  @Prop() public label?: string;

  /** Disables all options in the group, preventing any of them from being selected. */
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

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.dispatchInternalOptgroupUpdate);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { hidden } = this.host;
    attachComponentCss(this.host, getComponentCss, this.disabled);

    const labelId = 'label';

    return (
      <Host>
        <div
          role="group"
          aria-disabled={this.disabled ? 'true' : null}
          aria-hidden={hidden ? 'true' : null}
          aria-labelledby={labelId}
        >
          <span id={labelId} role="presentation">
            {this.label}
          </span>
          <slot />
        </div>
      </Host>
    );
  }

  private dispatchInternalOptgroupUpdate = (): void => {
    this.host.dispatchEvent(
      new CustomEvent('internalOptgroupUpdate', {
        bubbles: true,
      })
    );
  };
}
