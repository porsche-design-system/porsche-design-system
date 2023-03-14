import type { BreakpointCustomizable, SelectedAriaAttributes, PropTypes } from '../../types';
import type {
  LinkTileSize,
  LinkTileWeight,
  LinkTileAspectRatio,
  LinkTileAlign,
  Tile,
  LinkTileWeightDeprecated,
} from '../../utils';
import type { LinkTileAriaAttribute, LinkTileTarget } from './link-tile-utils';
import { Component, Element, h, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  parseJSON,
  validateProps,
  throwIfAlignTopAndNotCompact,
  warnIfDeprecatedPropValueIsUsed,
  LINK_TILE_WEIGHTS,
} from '../../utils';
import { getComponentCss } from './link-tile-styles';
import { LINK_ARIA_ATTRIBUTES } from '../link/link-utils';
import { sharedTilePropTypes } from './link-tile-utils';

const propTypes: PropTypes<typeof LinkTile> = {
  ...sharedTilePropTypes,
  weight: AllowedTypes.breakpoint<LinkTileWeight>(LINK_TILE_WEIGHTS),
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  download: AllowedTypes.string,
  rel: AllowedTypes.string,
  aria: AllowedTypes.aria<LinkTileAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-link-tile',
  shadow: { delegatesFocus: true },
})
export class LinkTile implements Tile {
  @Element() public host!: HTMLElement;

  /** Font size of the description. */
  @Prop() public size?: BreakpointCustomizable<LinkTileSize> = 'default';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<LinkTileWeight> = 'semi-bold';

  /** Aspect ratio of the link-tile. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileAspectRatio> = '4:3';

  /** Label of the <a />. */
  @Prop() public label: string;

  /** Description text. */
  @Prop() public description: string;

  /** Alignment of link and description. */
  @Prop() public align?: LinkTileAlign = 'bottom';

  /** Show gradient. */
  @Prop() public gradient?: boolean = true;

  /** Displays the link-tile as compact version with description and link icon only. */
  @Prop({ mutable: true }) public compact?: BreakpointCustomizable<boolean> = false;

  /** href of the `<a>`. */
  @Prop() public href: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTileTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkTileAriaAttribute>;

  public componentWillLoad(): void {
    throwIfAlignTopAndNotCompact(this.host, this.align, this.compact);
  }

  public render(): JSX.Element {
    this.compact = parseJSON(this.compact) as any; // parsing the value just once per lifecycle
    validateProps(this, propTypes);
    warnIfDeprecatedPropValueIsUsed<typeof LinkTile, LinkTileWeightDeprecated, LinkTileWeight>(this, 'weight', {
      semibold: 'semi-bold',
    });
    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.size,
      this.weight, // potentially breakpoint customizable, so we can't easily access the deprecation map
      this.align,
      this.compact,
      this.gradient
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const linkProps = {
      theme: 'dark',
      variant: 'secondary',
      aria: this.aria,
    };

    const sharedLinkProps = {
      href: this.href,
      target: this.target,
      download: this.download,
      rel: this.rel,
    };

    const link: JSX.Element = (
      <PrefixedTagNames.pLink {...sharedLinkProps} {...linkProps} key="link-or-button" class="link-or-button">
        {this.label}
      </PrefixedTagNames.pLink>
    );

    const linkPure: JSX.Element = (
      <PrefixedTagNames.pLinkPure
        {...sharedLinkProps}
        {...linkProps}
        key="link-or-button-pure"
        class="link-or-button-pure"
        hideLabel={true}
        icon="arrow-right"
      >
        {this.label}
      </PrefixedTagNames.pLinkPure>
    );

    return (
      <div class="root">
        <div class="image-container">
          <slot />
        </div>
        <div class="content">
          <a {...sharedLinkProps} class="link-overlay" tabIndex={-1} aria-hidden="true"></a>
          <p>{this.description}</p>
          {typeof this.compact === 'boolean' ? (this.compact ? linkPure : link) : [linkPure, link]}
        </div>
      </div>
    );
  }
}
