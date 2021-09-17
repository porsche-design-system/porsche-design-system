import { JSX, Component, Prop, h, Element, Event, EventEmitter, Host } from '@stencil/core';
import {
  getPrefixedTagNames,
  hasNamedSlot,
  isDark,
  getThemeDarkAttribute,
  attachConstructedCss,
  attachSlottedCss,
} from '../../../utils';
import type { BannerState, Theme } from '../../../types';
import { getComponentCss, getSlottedCss } from './banner-styles';

@Component({
  tag: 'p-banner',
  styleUrl: 'banner.scss',
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

  private closeButton: HTMLButtonElement;

  public connectedCallback(): void {
    if (!this.persistent) {
      document.addEventListener('keydown', this.onKeyboardEvent);
    }
    attachConstructedCss(this.host, getComponentCss);
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentDidLoad(): void {
    if (!this.persistent) {
      this.closeButton.focus();
    }
  }

  public disconnectedCallback(): void {
    if (!this.persistent) {
      document.removeEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      [`root--${this.state}`]: this.state !== 'neutral',
      ['root--theme-dark']: isDark(this.theme),
    };

    const bannerLabelId = 'banner-label';
    const bannerDescriptionId = 'banner-description';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host {...getThemeDarkAttribute(this.theme)}>
        <PrefixedTagNames.pContentWrapper
          width={this.width}
          role="alertdialog"
          aria-labelledby={bannerLabelId}
          aria-describedby={bannerDescriptionId}
        >
          <div class={rootClasses}>
            {this.state !== 'neutral' && (
              <PrefixedTagNames.pIcon name={this.state === 'error' ? 'exclamation' : 'warning'} class="icon" />
            )}
            <div class="content">
              {hasNamedSlot(this.host, 'title') && (
                <PrefixedTagNames.pHeadline variant="headline-5" id={bannerLabelId}>
                  <slot name="title" />
                </PrefixedTagNames.pHeadline>
              )}
              {hasNamedSlot(this.host, 'description') && (
                <PrefixedTagNames.pText id={bannerDescriptionId}>
                  <slot name="description" />
                </PrefixedTagNames.pText>
              )}
              {!this.persistent && (
                <div class="close">
                  <PrefixedTagNames.pButtonPure
                    type="button"
                    icon="close"
                    hideLabel={true}
                    onClick={this.removeBanner}
                    ref={(el) => (this.closeButton = el)}
                  >
                    Close notification
                  </PrefixedTagNames.pButtonPure>
                </div>
              )}
            </div>
          </div>
        </PrefixedTagNames.pContentWrapper>
      </Host>
    );
  }

  private onKeyboardEvent = ({ key }: KeyboardEvent): void => {
    if (key === 'Esc' || key === 'Escape') {
      this.removeBanner();
    }
  };

  private removeBanner = (): void => {
    this.dismiss.emit();
    this.host.classList.add('banner--close');
    setTimeout(() => {
      this.host.remove();
    }, 600); // duration of animation
  };
}
