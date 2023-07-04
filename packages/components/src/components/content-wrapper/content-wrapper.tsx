import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, validateProps, warnIfDeprecatedComponentIsUsed } from '../../utils';
import type { PropTypes, Theme } from '../../types';
import type { ContentWrapperBackgroundColor, ContentWrapperWidth } from './content-wrapper-utils';
import {
  CONTENT_WRAPPER_BACKGROUND_COLORS,
  CONTENT_WRAPPER_WIDTHS,
  deprecatedContentWrapperComponentMessage,
} from './content-wrapper-utils';
import { getComponentCss } from './content-wrapper-styles';

const propTypes: PropTypes<typeof ContentWrapper> = {
  width: AllowedTypes.oneOf<ContentWrapperWidth>(CONTENT_WRAPPER_WIDTHS),
  backgroundColor: AllowedTypes.oneOf<ContentWrapperBackgroundColor>(CONTENT_WRAPPER_BACKGROUND_COLORS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/** @deprecated since v3.0.0, will be removed with next major release. Use native CSS Grid instead. */
@Component({
  tag: 'p-content-wrapper',
  shadow: true,
})
export class ContentWrapper {
  @Element() public host!: HTMLElement;

  /** Defines the outer spacings between the content area and the left and right screen sides, as well as centering its content and setting a max-width. */
  @Prop() public width?: ContentWrapperWidth = 'extended';

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public backgroundColor?: ContentWrapperBackgroundColor = 'transparent';

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, deprecatedContentWrapperComponentMessage);
    attachComponentCss(this.host, getComponentCss, this.width);

    return (
      <div class="root">
        <slot />
      </div>
    );
  }
}
