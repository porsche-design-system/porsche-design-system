import { JSX, Component, Prop, h, Element } from '@stencil/core';
import { IconName, Theme } from '../../../types';
import { hasSlottedAnchorOrButton, TagColor } from './tag-status-utils';
import { attachComponentCss, attachSlottedCss } from '../../../utils';
import { getComponentCss, getSlottedCss } from './tag-status-styles';

@Component({
  tag: 'p-tag-status',
  shadow: true,
})
export class TagStatus {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Background color variations depending on theme property. */
  @Prop() public color?: TagColor = 'background-surface';

  /** The icon shown. */
  @Prop() public icon?: IconName = undefined;

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentWillRender(): void {
    attachComponentCss(
      this.host,
      getComponentCss,
      this.theme,
      this.color,
      this.icon,
      hasSlottedAnchorOrButton(this.host)
    );
  }

  public render(): JSX.Element {
    return (
      <span class="root">
        {this.icon && (
          <p-icon class="icon" name={this.icon} source={this.iconSource} color="inherit" aria-hidden="true" />
        )}
        <slot />
      </span>
    );
  }
}
