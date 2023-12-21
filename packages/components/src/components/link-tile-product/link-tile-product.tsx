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
import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';
import { getComponentCss } from './link-tile-product-styles';
import {
  anchorSlot,
  headerSlot,
  LinkTileProductAspectRatio,
  LinkTileProductLikeEvent,
  LinkTileProductTarget,
  TILE_PRODUCT_ASPECT_RATIOS,
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
    attachComponentCss(this.host, getComponentCss, this.likeButton, !this.href, this.aspectRatio, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const headerId = 'header';
    const headingId = 'heading';
    const priceId = 'price';
    const descriptionId = 'description';

    return (
      <div class="root">
        {this.href ? (
          <a
            class="anchor"
            href={this.href}
            target={this.target}
            rel={this.rel}
            aria-labelledby={`${headingId} ${priceId}`}
            aria-describedby={`${headerId} ${descriptionId}`}
          />
        ) : (
          <slot name={anchorSlot}></slot>
        )}
        <div id={headerId} class="header">
          <slot name={headerSlot} />
          {this.likeButton && (
            <PrefixedTagNames.pButtonPure
              class="button"
              type="button"
              icon={this.liked ? 'heart-filled' : 'heart'}
              hideLabel={true}
              onClick={this.onLikeClick}
              theme={this.theme}
            >
              {this.liked ? 'Remove from wishlist' : 'Add to wishlist'}
            </PrefixedTagNames.pButtonPure>
          )}
        </div>
        <div class="image">
          <slot />
        </div>
        <div class="wrapper">
          <h3 id={headingId} class="heading">
            {this.heading}
          </h3>
          <p id={priceId} class="price">
            {this.price}
          </p>
          <p id={descriptionId} class="description">
            {this.description}
          </p>
        </div>
      </div>
    );
  }

  private onLikeClick = (): void => {
    this.like.emit({
      liked: this.liked,
    });
  };
}
