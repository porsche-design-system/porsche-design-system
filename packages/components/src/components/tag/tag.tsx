import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { TagColor } from './tag-utils';
import { TAG_COLORS } from './tag-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getDirectChildHTMLElement,
  getPrefixedTagNames,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './tag-styles';
import type { IconName, PropTypes, Theme } from '../../types';

const propTypes: PropTypes<typeof Tag> = {
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  color: AllowedTypes.oneOf<TagColor>(TAG_COLORS),
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
};

@Component({
  tag: 'p-tag',
  shadow: true,
})
export class Tag {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Background color variations depending on theme property. */
  @Prop() public color?: TagColor = 'background-surface';

  /** The icon shown. */
  @Prop() public icon?: IconName;

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const deprecatedColorMap: Partial<Record<TagColor, TagColor>> = {
      'notification-neutral': 'notification-info',
      'neutral-contrast-high': 'primary',
      'background-default': 'background-base',
    };
    warnIfDeprecatedPropValueIsUsed(this.host, 'color', deprecatedColorMap);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.color,
      !!getDirectChildHTMLElement(this.host, 'a,button'),
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <span>
        {(this.icon || this.iconSource) && (
          <PrefixedTagNames.pIcon
            class="icon"
            name={this.icon}
            source={this.iconSource}
            color="primary"
            theme={this.theme}
            aria-hidden="true"
          />
        )}
        {/* to trick leading inline-block / inline-flex space character */}
        <div class="label">
          <slot />
        </div>
      </span>
    );
  }
}
