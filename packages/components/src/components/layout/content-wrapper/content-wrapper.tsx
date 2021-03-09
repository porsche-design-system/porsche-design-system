import { Component, h, JSX, Prop } from '@stencil/core';
import { isDark, prefix } from '../../../utils';
import { Theme } from '../../../types';

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
    const contentWrapperClasses = {
      [prefix('content-wrapper')]: true,
      [prefix('content-wrapper--basic')]: this.width === 'basic',
      [prefix('content-wrapper--extended')]: this.width === 'extended',
      [prefix('content-wrapper--background-default')]: this.backgroundColor === 'default',
      [prefix('content-wrapper--theme-dark')]: isDark(this.theme),
    };

    return (
      <div class={contentWrapperClasses}>
        <slot />
      </div>
    );
  }
}
