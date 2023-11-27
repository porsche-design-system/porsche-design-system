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
import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';
import { LinkTileAriaAttribute, LinkTileTarget } from '../link-tile/link-tile-utils';
import { getComponentCss } from './link-tile-product-styles';
import { LinkTileProductLikeChangeEvent, tagsSlotName } from './link-tile-product-utils';

const propTypes: PropTypes<typeof LinkTileProduct> = {
  heading: AllowedTypes.string,
  price: AllowedTypes.string,
  info: AllowedTypes.string,
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

  /** A Boolean attribute indicating that a product is liked. */
  @Prop() public liked?: boolean = false;

  /** href of the `<a>`. */
  @Prop() public href: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTileTarget = '_self';

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkTileAriaAttribute>;

  /** Adapts the banner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the selection is changed. */
  @Event({ bubbles: false }) public likeChange: EventEmitter<LinkTileProductLikeChangeEvent>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <div class="header">
          <div class="tags">
            <slot name={tagsSlotName} />
          </div>
          <PrefixedTagNames.pButtonPure
            class="like-button"
            icon={this.liked ? 'heart-filled' : 'heart'}
            hide-label="true"
            onClick={this.onLikeClick}
          >
            {this.liked ? 'Heart Filled icon' : 'Heart icon'}
          </PrefixedTagNames.pButtonPure>
        </div>
        <a
          class="image-container"
          href={this.href}
          target={this.target}
          rel={this.rel}
          {...parseAndGetAriaAttributes(this.aria)}
        >
          <slot />
        </a>
        <p class="text text__heading">{this.heading}</p>
        <p class="text text__price">{this.price}</p>
        <p class="text text__info">{this.info}</p>
      </div>
    );
  }

  private onLikeClick = () => {
    this.likeChange.emit({
      liked: this.liked,
    });
  };
}
