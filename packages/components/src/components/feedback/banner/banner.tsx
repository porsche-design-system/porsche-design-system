import { JSX, Component, Prop, h, Element, Event, EventEmitter, Host } from '@stencil/core';
import { getPrefixedTagNames, hasNamedSlot, attachComponentCss, getShadowRootHTMLElement } from '../../../utils';
import type { BannerState, Theme } from '../../../types';
import { getComponentCss } from './banner-styles';

@Component({
  tag: 'p-banner',
  shadow: true,
})
export class Banner {
  @Element() public host!: HTMLElement;

  /** State of the banner. */
  @Prop() public state?: BannerState = 'neutral';

  /** Defines if the banner can be closed/removed by the user. */
  @Prop() public persistent?: boolean = false;

  /** Defines the width of the banner corresponding to the `content-wrapper` dimensions */
  @Prop() public width?: 'basic' | 'extended' | 'fluid' = 'basic';

  /** Adapts the banner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private bannerInlineElement: HTMLPBannerInlineElement;

  public connectedCallback(): void {
    attachComponentCss(this.host, getComponentCss);
    if (!this.persistent) {
      document.addEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public componentDidLoad(): void {
    if (!this.persistent) {
      getShadowRootHTMLElement<HTMLElement>(this.bannerInlineElement, '.close *')?.focus();
    }
  }

  public disconnectedCallback(): void {
    if (!this.persistent) {
      document.removeEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public render(): JSX.Element {
    const bannerLabelId = 'banner-label';
    const bannerDescriptionId = 'banner-description';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pContentWrapper
          width={this.width}
          role="alertdialog"
          aria-labelledby={bannerLabelId}
          aria-describedby={bannerDescriptionId}
        >
          <PrefixedTagNames.pBannerInline
            ref={(el) => (this.bannerInlineElement = el)}
            class="root"
            state={this.state}
            persistent={this.persistent}
            theme={this.theme}
            onDismiss={this.removeBanner}
          >
            {hasNamedSlot(this.host, 'title') && (
              // <span id={bannerLabelId} slot="heading">
              <slot name="title" slot="heading" />
              // </span>
            )}
            {hasNamedSlot(this.host, 'description') && (
              // <span id={bannerDescriptionId}>
              <slot name="description" />
              // </span>
            )}
          </PrefixedTagNames.pBannerInline>
        </PrefixedTagNames.pContentWrapper>
      </Host>
    );
  }

  private onKeyboardEvent = ({ key }: KeyboardEvent): void => {
    if (key === 'Esc' || key === 'Escape') {
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
