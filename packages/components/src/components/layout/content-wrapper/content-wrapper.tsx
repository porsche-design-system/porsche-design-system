import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, validateProps } from '../../../utils';
import type { PropTypes } from '../../../utils';
import type { Theme } from '../../../types';
import type { ContentWrapperWidth, ContentWrapperBackgroundColor } from './content-wrapper-utils';
import { getComponentCss } from './content-wrapper-styles';
import { THEMES } from '../../../types';
import { CONTENT_WRAPPER_BACKGROUND_COLORS, CONTENT_WRAPPER_WIDTHS } from './content-wrapper-utils';

const propTypes: PropTypes<typeof ContentWrapper> = {
  width: AllowedTypes.oneOf<ContentWrapperWidth>(CONTENT_WRAPPER_WIDTHS),
  backgroundColor: AllowedTypes.oneOf<ContentWrapperBackgroundColor>(CONTENT_WRAPPER_BACKGROUND_COLORS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

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
    validateProps(this, propTypes);
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
