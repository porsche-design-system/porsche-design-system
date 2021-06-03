import { Component, h, JSX, Prop } from '@stencil/core';
import { isDark } from '../../../utils';
import type { Theme } from '../../../types';

@Component({
  tag: 'p-content-wrapper',
  styleUrl: 'content-wrapper.scss',
  shadow: true,
})
export class ContentWrapper {
  /** Defines the outer spacings between the content area and the left and right screen sides, as well as centering its content and setting a max-width. */
  @Prop() public width?: 'basic' | 'extended' | 'fluid' = 'basic';

  /** Defines the background color. */
  @Prop() public backgroundColor?: 'transparent' | 'default' = 'transparent';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      [`root--${this.width}`]: this.width !== 'fluid',
      ['root--background-default']: this.backgroundColor === 'default',
      ['root--theme-dark']: isDark(this.theme),
    };

    return (
      <div class={rootClasses}>
        <slot />
      </div>
    );
  }
}
