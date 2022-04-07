import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { TagStatusColor } from './tag-status-utils';
import { attachComponentCss, getDirectChildHTMLElement, getPrefixedTagNames } from '../../../../utils';
import { getComponentCss } from './tag-status-styles';
import type { IconName, Theme } from '../../../../types';

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
      <span aria-live="polite">
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
