import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { attachComponentCss } from '../../../utils';
import type { Theme } from '../../../types';
import type { ContentWrapperWidth, ContentWrapperBackgroundColor } from './content-wrapper-utils';
import { getComponentCss } from './content-wrapper-styles';

@Component({
  tag: 'p-content-wrapper',
  shadow: true,
})
export class ContentWrapper {
  @Element() public host!: HTMLElement;

  /** Defines the outer spacings between the content area and the left and right screen sides, as well as centering its content and setting a max-width. */
  @Prop() public width?: ContentWrapperWidth = 'basic';

  /** Defines the background color. */
  @Prop() public backgroundColor?: ContentWrapperBackgroundColor = 'transparent';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.width, this.backgroundColor, this.theme);
  }

  public render(): JSX.Element {
    return (
      <div class="root">
        <slot />
      </div>
    );
  }
}
