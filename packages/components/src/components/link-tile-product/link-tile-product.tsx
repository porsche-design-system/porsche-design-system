import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  THEMES,
  throwIfInvalidLinkTileProductUsage,
  validateProps,
} from '../../utils';
import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { getComponentCss } from './link-tile-product-styles';
import {
  TILE_PRODUCT_ASPECT_RATIOS,
  LinkTileProductAspectRatio,
  LinkTileProductLikeEvent,
  LinkTileProductTarget,
} from './link-tile-product-utils';

const propTypes: PropTypes<typeof LinkTileProduct> = {
  heading: AllowedTypes.string,
  price: AllowedTypes.string,
  description: AllowedTypes.string,
  likeButton: AllowedTypes.boolean,
  liked: AllowedTypes.boolean,
  href: AllowedTypes.string,
  aspectRatio: AllowedTypes.breakpoint<LinkTileProductAspectRatio>(TILE_PRODUCT_ASPECT_RATIOS),
  target: AllowedTypes.string,
  rel: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/** __Experimental__ */
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

  /** Additional product description */
  @Prop() public description?: string;

  /** A Boolean attribute indicating that a like button should be shown. */
  @Prop() public likeButton?: boolean = true;

  /** A Boolean attribute indicating that a product is liked. */
  @Prop() public liked?: boolean = false;

  /** href of the `<a>`. */
  @Prop() public href?: string;

  /** Aspect ratio of the link-tile-product. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileProductAspectRatio> = '3:4';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTileProductTarget = '_self';

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Adapts the link-tile-product color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the like button is clicked. */
  @Event({ bubbles: false }) public like: EventEmitter<LinkTileProductLikeEvent>;

  public componentWillLoad(): void {
    throwIfInvalidLinkTileProductUsage(this.host, this.href);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.likeButton, this.aspectRatio, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const headerId = 'header';
    const headingId = 'heading';
    const priceId = 'price';
    const descriptionId = 'description';

    return (
      <Host>
        <div class="root">
          <div id={headerId} class="header">
            <slot name="header" />
            {this.likeButton && (
              <PrefixedTagNames.pButtonPure
                class="like-button"
                type="button"
                icon={this.liked ? 'heart-filled' : 'heart'}
                hide-label="true"
                onClick={this.onLikeClick}
                theme={this.theme}
              >
                {this.liked ? 'Heart Filled icon' : 'Heart icon'}
              </PrefixedTagNames.pButtonPure>
            )}
          </div>
          <div class="image-container">
            <slot />
          </div>
          <div class="text-container">
            <h3 id={headingId} class="text text__heading">
              {this.heading}
            </h3>
            <p id={priceId} class="text text__price">
              {this.price}
            </p>
            <p id={descriptionId} class="text text__info">
              {this.description}
            </p>
          </div>
          {this.href && (
            <a
              class="link-overlay"
              href={this.href}
              target={this.target}
              rel={this.rel}
              aria-labelledby={`${headingId} ${priceId}`}
              aria-describedby={`${headerId} ${descriptionId}`}
            />
          )}
        </div>
      </Host>
    );
  }

  private onLikeClick = () => {
    this.like.emit({
      liked: this.liked,
    });
  };
}
