import { Component, h, JSX, Prop } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-content-wrapper',
  styleUrl: 'content-wrapper.scss',
  shadow: true
})
export class ContentWrapper {

  /** Defines the outer spacings between the content area and the left and right screen sides, as well as centering its content and setting a max-width. */
  @Prop() public width?: 'basic' | 'extended' | 'fluid' = 'basic';

  public render(): JSX.Element {
    const contentWrapperClasses = cx(
      prefix('content-wrapper'),
      prefix(`content-wrapper--${this.width}`)
    );

    return (
      <div class={contentWrapperClasses}>
        <slot/>
      </div>
    );
  }
}
