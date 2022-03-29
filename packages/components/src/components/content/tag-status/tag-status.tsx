import { JSX, Component, Prop, h, Element } from '@stencil/core';
import { IconName, Theme } from '../../../types';
import { getTheme, TagColors } from './tag-status-utils';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './tag-status-styles';

@Component({
  tag: 'p-tag-status',
  shadow: true,
})
export class TagStatus {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Background color variations depending on theme property. */
  @Prop() public color?: TagColors = 'background-surface'; // map naming?

  /** The icon shown. */
  @Prop() public icon?: IconName = undefined;

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.theme, this.color);
  }

  public render(): JSX.Element {
    const theme = getTheme(this.theme, this.color);

    return (
      <p-text theme={theme} class="root">
        {this.icon && <p-icon name={this.icon} theme={theme} class="icon" />}
        <slot />
      </p-text>
    );
  }
}
