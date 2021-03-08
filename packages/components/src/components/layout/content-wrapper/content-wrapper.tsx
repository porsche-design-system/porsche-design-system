import { Component, h, JSX, Prop } from '@stencil/core';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-content-wrapper',
  styleUrl: 'content-wrapper.scss',
  shadow: true,
})
export class ContentWrapper {
  /** Defines the outer spacings between the content area and the left and right screen sides, as well as centering its content and setting a max-width. */
  @Prop() public width?: 'basic' | 'extended' | 'fluid' = 'basic';

  /** Defines the background color. */
  @Prop() public background?: 'transparent' | 'white' = 'transparent';

  public render(): JSX.Element {
    const contentWrapperClasses = {
      [prefix('content-wrapper')]: true,
      [prefix('content-wrapper--basic')]: this.width === 'basic',
      [prefix('content-wrapper--extended')]: this.width === 'extended',
      [prefix('content-wrapper--white')]: this.background === 'white',
    };

    return (
      <div class={contentWrapperClasses}>
        <slot />
      </div>
    );
  }
}
