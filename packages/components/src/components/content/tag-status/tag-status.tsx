import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { TagStatusColor } from './tag-status-utils';
import { hasSlottedAnchorOrButton } from './tag-status-utils';
import { attachComponentCss, getPrefixedTagNames } from '../../../utils';
import { getComponentCss } from './tag-status-styles';
import type { IconName, Theme } from '../../../types';

@Component({
  tag: 'p-tag-status',
  shadow: true,
})
export class TagStatus {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Background color variations depending on theme property. */
  @Prop() public color?: TagStatusColor = 'background-surface';

  /** The icon shown. */
  @Prop() public icon?: IconName;

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.color, hasSlottedAnchorOrButton(this.host), this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <span class="root">
        {(this.icon || this.iconSource) && (
          <PrefixedTagNames.pIcon
            class="icon"
            name={this.icon}
            source={this.iconSource}
            color="inherit"
            aria-hidden="true"
          />
        )}
        <slot />
      </span>
    );
  }
}
