import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  getPrefixedTagNames, hasPropValueChanged,
  parseAndGetAriaAttributes,
  THEMES,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './drilldown-button-styles';
import type { DrilldownButtonAriaAttribute } from './drilldown-button-utils';

const propTypes: PropTypes<typeof DrilldownButton> = {
  active: AllowedTypes.boolean,
  aria: AllowedTypes.aria<DrilldownButtonAriaAttribute>(BUTTON_ARIA_ATTRIBUTES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "", "description": "Default slot to render the button label." }
 *
 * @experimental
 */
@Component({
  tag: 'p-drilldown-button',
  shadow: { delegatesFocus: true },
})
export class DrilldownButton {
  @Element() public host!: HTMLElement;

  /** Display button in active state. */
  @Prop() public active?: boolean = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<DrilldownButtonAriaAttribute>;

  /** Adapts the button color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-drilldown', 'p-drilldown-item']);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.active, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <button type="button" aria-expanded={this.active ? 'true' : 'false'} {...parseAndGetAriaAttributes(this.aria)}>
        <slot />
        <PrefixedTagNames.pIcon
          name="arrow-head-right"
          color="primary"
          size="medium"
          theme={this.theme}
          aria-hidden="true"
        />
      </button>
    );
  }
}
