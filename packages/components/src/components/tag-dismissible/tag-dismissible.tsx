import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './tag-dismissible-styles';
import {
  TAG_DISMISSIBLE_ARIA_ATTRIBUTES,
  TAG_DISMISSIBLE_COLORS,
  type TagDismissibleAriaAttribute,
  type TagDismissibleColor,
} from './tag-dismissible-utils';

const propTypes: PropTypes<typeof TagDismissible> = {
  color: AllowedTypes.oneOf<TagDismissibleColor>(TAG_DISMISSIBLE_COLORS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  label: AllowedTypes.string,
  aria: AllowedTypes.aria<TagDismissibleAriaAttribute>(TAG_DISMISSIBLE_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot for the tag content." }
 */
@Component({
  tag: 'p-tag-dismissible',
  shadow: { delegatesFocus: true },
})
export class TagDismissible {
  @Element() public host!: HTMLElement;

  /** Background color variations */
  @Prop() public color?: TagDismissibleColor = 'background-surface';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** The label text. */
  @Prop() public label?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<TagDismissibleAriaAttribute>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.color, !!this.label, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <button type="button" {...parseAndGetAriaAttributes(this.aria)}>
        <span class="sr-only">Remove:</span>
        <span>
          {this.label && <span class="label">{this.label}</span>}
          <slot />
        </span>
        <PrefixedTagNames.pIcon class="icon" name="close" theme={this.theme} aria-hidden="true" />
      </button>
    );
  }
}
