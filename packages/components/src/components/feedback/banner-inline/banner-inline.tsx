import { JSX, Component, Prop, h, Element, Event, EventEmitter, Host } from '@stencil/core';
import {
  getPrefixedTagNames,
  isDark,
  getThemeDarkAttribute,
  attachComponentCss,
  attachSlottedCss,
  hasHeading,
} from '../../../utils';
import type { BannerState, Theme } from '../../../types';
import { getComponentCss, getSlottedCss } from './banner-inline-styles';

@Component({
  tag: 'p-banner-inline',
  shadow: true,
})
export class BannerInline {
  @Element() public host!: HTMLElement;

  /** Heading of the banner. */
  @Prop() public heading?: string = '';

  /** Description of the banner. */
  @Prop() public description?: string = '';

  /** State of the banner. */
  @Prop() public state?: BannerState = 'neutral';

  /** Defines the width of the banner corresponding to the `content-wrapper` dimensions */
  @Prop() public width?: 'basic' | 'extended' | 'fluid' = 'basic';

  /** Adapts the banner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  public connectedCallback(): void {
    attachComponentCss(this.host, getComponentCss, this.state, this.theme);
    attachSlottedCss(this.host, getSlottedCss);
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
              {hasHeading(this.host, this.heading) && (
                <PrefixedTagNames.pHeadline variant="headline-5" id={bannerLabelId}>
                  {this.heading || <slot name="heading" />}
                </PrefixedTagNames.pHeadline>
              )}
              {/* {hasNamedSlot(this.host, 'description') && (*/}
              <PrefixedTagNames.pText id={bannerDescriptionId}>
                <slot />
              </PrefixedTagNames.pText>
              {/* )}*/}
              <div class="close">
                <PrefixedTagNames.pButtonPure type="button" icon="close" hideLabel={true} onClick={this.dismiss.emit}>
                  Close notification
                </PrefixedTagNames.pButtonPure>
              </div>
            </div>
          </div>
        </PrefixedTagNames.pContentWrapper>
      </Host>
    );
  }
}
