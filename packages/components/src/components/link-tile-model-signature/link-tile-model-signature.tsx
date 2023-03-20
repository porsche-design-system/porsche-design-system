import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { LINK_BUTTON_GROUP_DIRECTIONS } from '../../styles/link-button-group-direction-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  TILE_ASPECT_RATIOS,
  TILE_WEIGHTS,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-model-signature-styles';
import type {
  LinkTileModelSignatureAspectRatio,
  LinkTileModelSignatureLinkDirection,
  LinkTileModelSignatureModel,
  LinkTileModelSignatureWeight,
  LinkTileModelSignatureHeadingTag,
} from './link-tile-model-signature-utils';
import {
  getSlottedPLinksOrThrow,
  LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS,
  setRequiredPropsOfSlottedLinks,
} from './link-tile-model-signature-utils';

const propTypes: PropTypes<typeof LinkTileModelSignature> = {
  model: AllowedTypes.oneOf<LinkTileModelSignatureModel>(MODEL_SIGNATURE_MODELS),
  weight: AllowedTypes.breakpoint<LinkTileModelSignatureWeight>(TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<LinkTileModelSignatureAspectRatio>(TILE_ASPECT_RATIOS),
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  linkDirection: AllowedTypes.breakpoint<LinkTileModelSignatureLinkDirection>(LINK_BUTTON_GROUP_DIRECTIONS),
  headingTag: AllowedTypes.oneOf<LinkTileModelSignatureHeadingTag>(LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS),
};

@Component({
  tag: 'p-link-tile-model-signature',
  shadow: true,
})
export class LinkTileModelSignature {
  @Element() public host!: HTMLElement;

  /** Adapts the model of the component. */
  @Prop() public model?: LinkTileModelSignatureModel = '911';

  /** Adapts the font weight of the heading. */
  @Prop() public weight?: BreakpointCustomizable<LinkTileModelSignatureWeight> = 'semi-bold';

  /** Aspect ratio of the link-tile-model-signature. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileModelSignatureAspectRatio> = '4:3';

  /** Heading text. */
  @Prop() public heading: string;

  /** Description text. */
  @Prop() public description?: string;

  /** Defines the direction of the main and cross axis of the links. The default is '{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint 'xs'. */
  // prettier-ignore
  @Prop() public linkDirection?: BreakpointCustomizable<LinkTileModelSignatureLinkDirection> = { base: 'column', xs: 'row' };

  /** Sets a custom headline tag which wraps the heading to enhance semantics. */
  @Prop() public headingTag?: LinkTileModelSignatureHeadingTag = 'h2';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    // If we do this earlier than render, there are cases where primaryLink.href is undefined
    const [primaryLink, secondaryLink] = getSlottedPLinksOrThrow(this.host);
    setRequiredPropsOfSlottedLinks([primaryLink, secondaryLink]);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.weight,
      this.linkDirection,
      !!this.description
    );

    const primaryLinkProps = {
      href: primaryLink.href,
      target: primaryLink.target,
      download: primaryLink.download,
      rel: primaryLink.rel,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <div class="image-container">
          <slot />
        </div>
        <PrefixedTagNames.pModelSignature class="model" theme="dark" model={this.model} />
        <div class="content">
          <a {...primaryLinkProps} class="link-overlay" tabIndex={-1} aria-hidden="true"></a>
          <this.headingTag class="heading">{this.heading}</this.headingTag>
          {this.description && <p class="description">{this.description}</p>}
          <div class="link-group" role="group">
            <slot name="primary" />
            <slot name="secondary" />
          </div>
        </div>
      </div>
    );
  }
}
