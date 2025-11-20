import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './tag-dismissible-styles';
import {
  type TagDismissibleAriaAttribute,
  type TagDismissibleColor,
  type TagDismissibleColorDeprecated,
  TAG_DISMISSIBLE_ARIA_ATTRIBUTES,
  TAG_DISMISSIBLE_COLORS,
} from './tag-dismissible-utils';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';

type DeprecationMapType = Record<
  TagDismissibleColorDeprecated,
  Exclude<TagDismissibleColor, TagDismissibleColorDeprecated>
>;

const propTypes: PropTypes<typeof TagDismissible> = {
  color: AllowedTypes.oneOf<TagDismissibleColor>(TAG_DISMISSIBLE_COLORS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  label: AllowedTypes.string,
  compact: AllowedTypes.boolean,
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

  /** A boolean value that, if present, renders the tag dismissible as a compact version. */
  @Prop() public compact?: boolean = false;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const deprecationMap: DeprecationMapType = {
      'background-default': 'background-base',
    };
    warnIfDeprecatedPropValueIsUsed<typeof TagDismissible, TagDismissibleColorDeprecated, TagDismissibleColor>(
      this,
      'color',
      deprecationMap
    );
    attachComponentCss(
      this.host,
      getComponentCss,
      (deprecationMap[this.color as keyof DeprecationMapType] || this.color) as Exclude<
        TagDismissibleColor,
        TagDismissibleColorDeprecated
      >,
      !!this.label,
      this.compact,
      this.theme
    );

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
