import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { JSS_DIRECTIONS } from '../../styles/jss-direction-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  HEADING_TAGS,
  throwIfChildCountIsExceeded,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-model-signature-styles';
import { LINK_TILE_ASPECT_RATIOS, LINK_TILE_WEIGHTS } from '../link-tile/link-tile-utils';
import type { HeadingTag } from '../heading/heading-tag';
import type {
  LinkTileModelSignatureAspectRatio,
  LinkTileModelSignatureLinkDirection,
  LinkTileModelSignatureModel,
  LinkTileModelSignatureWeight,
} from './link-tile-model-signature-utils';
import { getSlottedPLinkOrThrow } from './link-tile-model-signature-utils';

const propTypes: PropTypes<typeof LinkTileModelSignature> = {
  model: AllowedTypes.oneOf<LinkTileModelSignatureModel>(MODEL_SIGNATURE_MODELS),
  weight: AllowedTypes.breakpoint<LinkTileModelSignatureWeight>(LINK_TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<LinkTileModelSignatureAspectRatio>(LINK_TILE_ASPECT_RATIOS),
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  linkDirection: AllowedTypes.breakpoint<LinkTileModelSignatureLinkDirection>(JSS_DIRECTIONS),
  headingTag: AllowedTypes.oneOf<HeadingTag>([...HEADING_TAGS, undefined]),
};

@Component({
  tag: 'p-link-tile-model-signature',
  shadow: true,
})
export class LinkTileModelSignature {
  @Element() public host!: HTMLElement;

  /** Adapts the displayed model-signature of the component. */
  @Prop() public model?: LinkTileModelSignatureModel = '911';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<LinkTileModelSignatureWeight> = 'semibold';

  /** Aspect ratio of the link-tile-model-signature. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileModelSignatureAspectRatio> = '4:3';

  /** Heading text. */
  @Prop() public heading: string;

  /** Description text. */
  @Prop() public description?: string;

  /** Defines the direction of the main and cross axis of the links. The default is '{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint 'xs'. */
  @Prop() public linkDirection?: BreakpointCustomizable<LinkTileModelSignatureLinkDirection> = {
    base: 'column',
    xs: 'row',
  };

  /** Sets a custom HTML tag depending on the usage of the link tile model signature component. */
  @Prop() public headingTag?: Exclude<HeadingTag, 'h1'> = 'h2';

  private primaryLink: HTMLPLinkElement;

  public componentWillLoad(): void {
    throwIfChildCountIsExceeded(this.host, 3);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    this.primaryLink = getSlottedPLinkOrThrow(this.host);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.weight,
      this.linkDirection,
      !!this.description
    );

    const primaryLinkProps = {
      href: this.primaryLink.href,
      target: this.primaryLink.target,
      download: this.primaryLink.download,
      rel: this.primaryLink.rel,
    };

    const heading: JSX.Element = (
      <this.headingTag>
        <p class="description">{this.heading}</p>
      </this.headingTag>
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <div class="image-container">
          <slot />
        </div>
        <PrefixedTagNames.pModelSignature class="model" theme="dark" model={this.model} />
        <div class="content">
          <a {...primaryLinkProps} class="link-overlay" tabIndex={-1} aria-hidden="true"></a>
          {this.description ? (
            <div class="description-group">
              {heading}
              <p class="sub-description">{this.description}</p>
            </div>
          ) : (
            heading
          )}
          <div class="link-group" role="group">
            <slot name="primary" />
            <slot name="secondary" />
          </div>
        </div>
      </div>
    );
  }
}
