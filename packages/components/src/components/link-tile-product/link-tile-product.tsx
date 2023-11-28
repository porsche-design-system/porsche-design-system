import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  LINK_ARIA_ATTRIBUTES,
  parseAndGetAriaAttributes,
  THEMES,
  validateProps,
} from '../../utils';
import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { LinkTileAriaAttribute } from '../link-tile/link-tile-utils';
import { getComponentCss } from './link-tile-product-styles';
import {
  LinkTileProductAriaAttribute,
  LinkTileProductTarget,
  LinkTileProductUpdateEvent,
  tagsSlotName,
} from './link-tile-product-utils';

const propTypes: PropTypes<typeof LinkTileProduct> = {
  heading: AllowedTypes.string,
  price: AllowedTypes.string,
  info: AllowedTypes.string,
  likeButton: AllowedTypes.boolean,
  liked: AllowedTypes.boolean,
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<LinkTileAriaAttribute>(LINK_ARIA_ATTRIBUTES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-link-tile-product',
  shadow: { delegatesFocus: true },
})
export class LinkTileProduct {
  @Element() public host!: HTMLElement;

  /** Product heading */
  @Prop() public heading: string;

  /** Product price */
  @Prop() public price: string;

  /** Additional product information */
  @Prop() public info?: string;

  /** A Boolean attribute indicating that a like button should be shown. */
  @Prop() public likeButton?: boolean = true;

  /** A Boolean attribute indicating that a product is liked. */
  @Prop() public liked?: boolean = false;

  /** href of the `<a>`. */
  @Prop() public href: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTileProductTarget = '_self';

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkTileProductAriaAttribute>;

  /** Adapts the banner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the like button is clicked. */
  @Event({ bubbles: false }) public likeChange: EventEmitter<LinkTileProductUpdateEvent>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.likeButton, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <a class="root" href={this.href} target={this.target} rel={this.rel} {...parseAndGetAriaAttributes(this.aria)}>
          <div class="header">
            <slot name={tagsSlotName} />
          </div>
          <div class="image-container">
            <slot />
          </div>
          <div class="text text__heading-container">
            <p class="text text__heading">{this.heading}</p>
          </div>
          <p class="text text__price">{this.price}</p>
          <p class="text text__info">{this.info}</p>
        </a>
        {this.likeButton && (
          <PrefixedTagNames.pButtonPure
            class="like-button"
            icon={this.liked ? 'heart-filled' : 'heart'}
            hide-label="true"
            onClick={this.onLikeClick}
          >
            {this.liked ? 'Heart Filled icon' : 'Heart icon'}
          </PrefixedTagNames.pButtonPure>
        )}
      </Host>
    );
  }

  private onLikeClick = () => {
    this.likeChange.emit({
      liked: this.liked,
    });
  };
}
