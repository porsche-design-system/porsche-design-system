import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import type { JssDirections } from '../../styles/jss-direction-styles';
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
import type { LinkTileAspectRatio, LinkTileWeight } from '../link-tile/link-tile-utils';
import { LINK_TILE_ASPECT_RATIOS, LINK_TILE_WEIGHTS } from '../link-tile/link-tile-utils';
import type { HeadingTag } from '../heading/heading-tag';
import { getSlottedPLinksOrThrow } from './link-tile-model-signature-utils';

const propTypes: PropTypes<typeof LinkTileModelSignature> = {
  model: AllowedTypes.oneOf<ModelSignatureModel>(MODEL_SIGNATURE_MODELS),
  weight: AllowedTypes.breakpoint<LinkTileWeight>(LINK_TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<LinkTileAspectRatio>(LINK_TILE_ASPECT_RATIOS),
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  linkDirection: AllowedTypes.breakpoint<JssDirections>(JSS_DIRECTIONS),
  headingTag: AllowedTypes.oneOf<HeadingTag>([...HEADING_TAGS, undefined]),
};

@Component({
  tag: 'p-link-tile-model-signature',
  shadow: { delegatesFocus: true },
})
export class LinkTileModelSignature {
  @Element() public host!: HTMLElement;

  /** Adapts the displayed model-signature of the component. */
  @Prop() public model?: ModelSignatureModel = '911';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<LinkTileWeight> = 'semibold';

  /** Aspect ratio of the link-tile-model-signature. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileAspectRatio> = '4:3';

  /** Heading text. */
  @Prop() public heading: string;

  /** Description text. */
  @Prop() public description?: string;

  /** Defines the direction of the main and cross axis of the links. The default is '{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint 'xs'. */
  @Prop() public linkDirection?: BreakpointCustomizable<JssDirections> = { base: 'column', xs: 'row' };

  /** Sets a custom HTML tag depending on the usage of the link tile model signature component. */
  @Prop() public headingTag?: Exclude<HeadingTag, 'h1'> = 'h2';

  private primaryLink: HTMLPLinkElement;

  public componentWillLoad(): void {
    throwIfChildCountIsExceeded(this.host, 3);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const [primaryLink] = getSlottedPLinksOrThrow(this.host);
    this.primaryLink = primaryLink;

    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.weight,
      this.linkDirection,
      !!this.description
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const heading = (
      <this.headingTag>
        <p class="description">{this.heading}</p>
      </this.headingTag>
    );

    const primaryLinkProps = {
      href: this.primaryLink.href,
      target: this.primaryLink.target,
      download: this.primaryLink.download,
      rel: this.primaryLink.rel,
    };

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
            { heading }
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
