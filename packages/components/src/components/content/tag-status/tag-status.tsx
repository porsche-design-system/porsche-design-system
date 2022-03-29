import { JSX, Component, Prop, h, Element } from '@stencil/core';
import { IconName, Theme } from '../../../types';
import { TagColor } from './tag-status-utils';
import { attachComponentCss, attachSlottedCss } from '../../../utils';
import { getComponentCss } from './tag-status-styles';
import { getSlottedCss } from '../../basic/typography/text/text-styles';

@Component({
  tag: 'p-tag-status',
  shadow: true,
})
export class TagStatus {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Background color variations depending on theme property. */
  @Prop() public color?: TagColor = 'surface';

  /** The icon shown. */
  @Prop() public icon?: IconName = undefined;

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.theme, this.color, this.icon);
  }

  public render(): JSX.Element {
    return (
      <span class="root">
        {this.icon && <p-icon class="icon" name={this.icon} source={this.iconSource} color="inherit" />}
        <slot />
      </span>
    );
  }
}
