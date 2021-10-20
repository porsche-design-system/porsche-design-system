import { JSX, Component, Prop, h, Element, Event, EventEmitter, Host } from '@stencil/core';
import {
  getPrefixedTagNames,
  getThemeDarkAttribute,
  attachComponentCss,
  attachSlottedCss,
  hasHeading,
  throwIfValueIsInvalid,
} from '../../../utils';
import type { IconName, Theme } from '../../../types';
import { getComponentCss, getSlottedCss } from './banner-inline-styles';
import { BANNER_INLINE_STATES, getIconName } from './banner-inline-utils';
import type { BannerInlineState } from './banner-inline-utils';

@Component({
  tag: 'p-banner-inline',
  shadow: true,
})
export class BannerInline {
  @Element() public host!: HTMLElement;

  /** Heading of the banner-inline. */
  @Prop() public heading?: string = '';

  /** Description of the banner-inline. */
  @Prop() public description?: string = '';

  /** State of the banner-inline. */
  @Prop() public state?: BannerInlineState = 'neutral';

  /** Defines if the banner-inline can be closed/removed by the user. */
  @Prop() public persistent?: boolean = false;

  /** Action label of the banner-inline. */
  @Prop() public actionLabel?: string;

  /** Action icon of the banner-inline. */
  @Prop() public actionIcon?: IconName = 'refresh';

  /** Adapts the banner-inline color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentWillRender(): void {
    throwIfValueIsInvalid(this.state, BANNER_INLINE_STATES, 'state');
    attachComponentCss(this.host, getComponentCss, this.state, this.theme);
  }

  public render(): JSX.Element {
    const bannerLabelId = 'banner-label';
    const bannerDescriptionId = 'banner-description';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host {...getThemeDarkAttribute(this.theme)}>
        <PrefixedTagNames.pIcon class="icon" name={getIconName(this.state)} color="inherit" />
        <div class="content">
          {hasHeading(this.host, this.heading) && (
            <PrefixedTagNames.pHeadline variant="headline-5" id={bannerLabelId}>
              {this.heading || <slot name="heading" />}
            </PrefixedTagNames.pHeadline>
          )}
          {/* {hasNamedSlot(this.host, 'description') && (*/}
          <PrefixedTagNames.pText id={bannerDescriptionId}>{this.description || <slot />}</PrefixedTagNames.pText>
          {/* )}*/}
        </div>
        {this.actionLabel && (
          <PrefixedTagNames.pButtonPure class="action" icon={this.actionIcon} onClick={this.action.emit}>
            {this.actionLabel}
          </PrefixedTagNames.pButtonPure>
        )}
        {!this.persistent && (
          <PrefixedTagNames.pButtonPure
            class="close"
            type="button"
            icon="close"
            hideLabel={true}
            onClick={this.dismiss.emit}
          >
            Close notification
          </PrefixedTagNames.pButtonPure>
        )}
      </Host>
    );
  }
}
