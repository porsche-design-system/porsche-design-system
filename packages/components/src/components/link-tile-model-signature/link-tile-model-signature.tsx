import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { AriaAttributes, BreakpointCustomizable, PropTypes } from '../../types';
import { GROUP_DIRECTIONS } from '../../styles/group-direction-styles';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getNamedSlotOrThrow,
  getPrefixedTagNames,
  hasPropValueChanged,
  throwIfElementIsNotOfKind,
  TILE_ASPECT_RATIOS,
  TILE_WEIGHTS,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-model-signature-styles';
import {
  type LinkTileModelSignatureAspectRatio,
  type LinkTileModelSignatureHeadingTag,
  type LinkTileModelSignatureLinkDirection,
  type LinkTileModelSignatureModel,
  type LinkTileModelSignatureWeight,
  getLinkOrSlottedAnchorElement,
  LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS,
  LINK_TILE_MODEL_SIGNATURE_MODELS,
  setRequiredPropsOfSlottedLinks,
} from './link-tile-model-signature-utils';
import { type JSXBase } from '@stencil/core/internal';
import { getSlottedPictureImageStyles } from '../../styles';

const propTypes: PropTypes<typeof LinkTileModelSignature> = {
  model: AllowedTypes.oneOf<LinkTileModelSignatureModel>(LINK_TILE_MODEL_SIGNATURE_MODELS),
  weight: AllowedTypes.breakpoint<LinkTileModelSignatureWeight>(TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<LinkTileModelSignatureAspectRatio>(TILE_ASPECT_RATIOS),
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  linkDirection: AllowedTypes.breakpoint<LinkTileModelSignatureLinkDirection>(GROUP_DIRECTIONS),
  headingTag: AllowedTypes.oneOf<LinkTileModelSignatureHeadingTag>(LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS),
};

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 * @slot {"name": "primary", "description": "Renders the primary link. Has to be a p-link tag.", "isRequired": true, "allowedTagNames": ["p-link"] }
 * @slot {"name": "secondary", "description": "Renders the secondary link. Has to be a p-link tag.", "isRequired": true, "allowedTagNames": ["p-link"] }
 */
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
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileModelSignatureAspectRatio> = '3/4';

  /** Heading text. */
  @Prop() public heading: string;

  /** Description text. */
  @Prop() public description?: string;

  /** Defines the direction of the main and cross axis of the links. The default is '{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint 'xs'. */
  // prettier-ignore
  @Prop() public linkDirection?: BreakpointCustomizable<LinkTileModelSignatureLinkDirection> = { base: 'column', xs: 'row' };

  /** Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public headingTag?: LinkTileModelSignatureHeadingTag = 'h2';

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedPictureImageStyles);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    // If we do this earlier than render, there are cases where primaryLink.href is undefined
    // TODO: Here and in other components, validation happens only on initial render. We could extend this to watch props of the required slots.
    const primaryLink = getNamedSlotOrThrow(this.host, 'primary') as HTMLPLinkElement;
    const secondaryLink = getNamedSlotOrThrow(this.host, 'secondary') as HTMLPLinkElement;
    throwIfElementIsNotOfKind(this.host, primaryLink, 'p-link');
    throwIfElementIsNotOfKind(this.host, secondaryLink, 'p-link');
    setRequiredPropsOfSlottedLinks([primaryLink, secondaryLink]);
    const linkEl = getLinkOrSlottedAnchorElement(primaryLink); // support for slotted a tag within p-link

    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.weight,
      this.linkDirection,
      !!this.description
    );

    const overlayLinkProps: JSXBase.AnchorHTMLAttributes<HTMLAnchorElement> & AriaAttributes = {
      href: linkEl.href,
      target: linkEl.target || '_self',
      download: linkEl.download || null,
      rel: linkEl.rel || null,
      tabIndex: -1,
      'aria-hidden': 'true',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <a {...overlayLinkProps} />
        <div class="header">
          <PrefixedTagNames.pModelSignature theme="dark" model={this.model} />
          <slot name="header" />
        </div>
        <div class="media">
          <slot />
        </div>
        <div class="footer">
          <this.headingTag>{this.heading}</this.headingTag>
          {this.description && <p>{this.description}</p>}
          <div class="link-group" role="group">
            <slot name="primary" />
            <slot name="secondary" />
          </div>
        </div>
      </div>
    );
  }
}
