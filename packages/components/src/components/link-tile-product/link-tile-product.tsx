import { Component, Element, Event, type EventEmitter, Fragment, h, type JSX, Prop } from '@stencil/core';
import { getSlottedPictureImageStyles } from '../../styles';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  throwIfInvalidLinkTileProductUsage,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-product-styles';
import {
  anchorSlot,
  headerSlot,
  type LinkTileProductAspectRatio,
  type LinkTileProductLikeEventDetail,
  type LinkTileProductTarget,
  TILE_PRODUCT_ASPECT_RATIOS,
} from './link-tile-product-utils';

const propTypes: PropTypes<typeof LinkTileProduct> = {
  heading: AllowedTypes.string,
  price: AllowedTypes.string,
  priceOriginal: AllowedTypes.string,
  description: AllowedTypes.string,
  likeButton: AllowedTypes.boolean,
  liked: AllowedTypes.boolean,
  href: AllowedTypes.string,
  aspectRatio: AllowedTypes.breakpoint<LinkTileProductAspectRatio>(TILE_PRODUCT_ASPECT_RATIOS),
  target: AllowedTypes.string,
  rel: AllowedTypes.string,
};

/**
 * @slot {"name": "anchor", "description": "Slotted anchor link which can be used instead of the `href` prop. Ensure the named slot is directly on the anchor element, without nesting." }
 * @slot {"name": "header", "description": "Shows special features about the product like novelty or exclusivity. Although you can pass in anything, it is recommended to use the `p-tag` component." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 *
 * @controlled {"props": ["liked"], "event": "like"}
 *
 * @experimental
 */
@Component({
  tag: 'p-link-tile-product',
  shadow: { delegatesFocus: true },
})
export class LinkTileProduct {
  @Element() public host!: HTMLElement;

  /** Product heading. */
  @Prop() public heading: string;

  /** Product retail price (with or without discount). */
  @Prop() public price: string;

  /** Shows original price (recommended retail price) with line-through. Needs prop "price" to be defined, otherwise this prop has no effect. */
  @Prop() public priceOriginal?: string;

  /** Additional product description. */
  @Prop() public description?: string;

  /** A Boolean attribute indicating that a like button should be shown. */
  @Prop() public likeButton?: boolean = true;

  /** A Boolean attribute indicating that a product is liked. */
  @Prop() public liked?: boolean = false;

  /** href of the `<a>`. */
  @Prop() public href?: string;

  /** Aspect ratio of the link-tile-product. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileProductAspectRatio> = '3/4';

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTileProductTarget = '_self';

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Emitted when the like button is clicked. */
  @Event({ bubbles: false }) public like: EventEmitter<LinkTileProductLikeEventDetail>;

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedPictureImageStyles);
  }

  public componentWillLoad(): void {
    throwIfInvalidLinkTileProductUsage(this.host, this.href);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.likeButton,
      !this.href,
      !!this.priceOriginal,
      !!this.description,
      this.aspectRatio
    );

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
          <slot name={anchorSlot} />
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
            >
              {this.liked ? 'Remove from wishlist' : 'Add to wishlist'}
            </PrefixedTagNames.pButtonPure>
          )}
        </div>
        <div class="image">
          <slot />
        </div>
        <div class="wrapper">
          {this.heading && (
            <h3 id={headingId} class="heading">
              {this.heading}
            </h3>
          )}
          {this.price && (
            <p id={priceId} class="price">
              {this.priceOriginal ? (
                <Fragment>
                  <span class="sr-only">sale price</span>
                  {this.price}
                  <span class="sr-only">original price</span>
                  <s>{this.priceOriginal}</s>
                </Fragment>
              ) : (
                this.price
              )}
            </p>
          )}
          {this.description && (
            <p id={descriptionId} class="description">
              {this.description}
            </p>
          )}
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
