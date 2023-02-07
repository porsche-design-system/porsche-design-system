import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import type { PropTypes, Theme } from '../../types';
import type { BannerState, BannerWidth } from './banner-utils';
import { BANNER_STATES, BANNER_WIDTHS } from './banner-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasNamedSlot,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './banner-styles';

const propTypes: PropTypes<typeof Banner> = {
  state: AllowedTypes.oneOf<BannerState>(BANNER_STATES),
  persistent: AllowedTypes.boolean,
  width: AllowedTypes.oneOf<BannerWidth>(BANNER_WIDTHS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-banner',
  shadow: true,
})
export class Banner {
  @Element() public host!: HTMLElement;

  /** State of the banner. */
  @Prop() public state?: BannerState = 'info';

  /** Defines if the banner can be closed/removed by the user. */
  @Prop() public persistent?: boolean = false;

  /** Defines the width of the banner corresponding to the `content-wrapper` dimensions */
  @Prop() public width?: BannerWidth = 'extended';

  /** Adapts the banner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private inlineNotificationElement: HTMLPInlineNotificationElement;

  public connectedCallback(): void {
    if (!this.persistent) {
      document.addEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public componentDidLoad(): void {
    if (!this.persistent) {
      // messy… optional chaining is needed in case child component is unmounted too early
      getShadowRootHTMLElement<HTMLElement>(this.inlineNotificationElement, '.close')?.focus();
    }
  }

  public disconnectedCallback(): void {
    if (!this.persistent) {
      document.removeEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const deprecatedStateMap: Partial<Record<BannerState, BannerState>> = {
      neutral: 'info',
    };
    warnIfDeprecatedPropValueIsUsed(this.host, 'state', deprecatedStateMap);
    const deprecatedWidthMap: Partial<Record<BannerWidth, BannerWidth>> = {
      fluid: 'extended',
    };
    warnIfDeprecatedPropValueIsUsed(this.host, 'width', deprecatedWidthMap);
    attachComponentCss(this.host, getComponentCss, this.width);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pInlineNotification
        ref={(el) => (this.inlineNotificationElement = el)}
        class="root"
        state={this.state}
        persistent={this.persistent}
        theme={this.theme}
        onDismiss={this.removeBanner}
      >
        {hasNamedSlot(this.host, 'title') && <slot name="title" slot="heading" />}
        {hasNamedSlot(this.host, 'description') && <slot name="description" />}
      </PrefixedTagNames.pInlineNotification>
    );
  }

  private onKeyboardEvent = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.removeBanner();
    }
  };

  private removeBanner = (e?: CustomEvent): void => {
    e?.stopPropagation(); // prevent double event emission because of identical name
    this.dismiss.emit();
    this.host.classList.add('banner--close');
    setTimeout(() => {
      this.host.remove();
    }, 600); // duration of animation
  };
}
