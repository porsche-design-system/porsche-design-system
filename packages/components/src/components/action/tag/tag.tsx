import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { TagColor } from './tag-utils';
import { TAG_COLORS } from './tag-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getDirectChildHTMLElement,
  getPrefixedTagNames,
  throwIfValueIsInvalid,
  validateProps,
} from '../../../utils';
import type { PropTypes } from '../../../utils';
import { getComponentCss } from './tag-styles';
import type { IconName, Theme } from '../../../types';
import { THEMES } from '../../../types';

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

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-tag');
    throwIfValueIsInvalid(this.color, TAG_COLORS, 'color');
    attachComponentCss(
      this.host,
      getComponentCss,
      this.color,
      !!getDirectChildHTMLElement(this.host, 'a,button'),
      this.theme
    );
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <span>
        {(this.icon || this.iconSource) && (
          <PrefixedTagNames.pIcon
            class="icon"
            name={this.icon}
            source={this.iconSource}
            color="inherit"
            aria-hidden="true"
          />
        )}
        {/* to trick leading inline-block / inline-flex space character */}
        <div>
          <slot />
        </div>
      </span>
    );
  }
}
