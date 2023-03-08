import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils';
import type { LinkTileModelLinkProps } from './link-tile-model-signature-utils';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import type { JssDirections } from '../../styles/jss-direction-styles';
import { JSS_DIRECTIONS } from '../../styles/jss-direction-styles';
import { getSlottedCss } from '../../styles/link-button-tile-styles';
import type { LinkAriaAttribute } from '../link/link-utils';
import { LINK_ARIA_ATTRIBUTES } from '../link/link-utils';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getPrefixedTagNames,
  parseJSONAttribute,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-model-signature-styles';
import type { LinkTileAspectRatio, LinkTileWeight } from '../link-tile/link-tile-utils';
import { LINK_TILE_ASPECT_RATIOS, LINK_TILE_WEIGHTS } from '../link-tile/link-tile-utils';

const propTypes: PropTypes<typeof LinkTileModelSignature> = {
  primaryLinkProps: AllowedTypes.shape({
    label: AllowedTypes.string,
    href: AllowedTypes.string,
    target: AllowedTypes.string,
    download: AllowedTypes.string,
    rel: AllowedTypes.string,
    aria: AllowedTypes.aria<LinkAriaAttribute>(LINK_ARIA_ATTRIBUTES),
  }),
  secondaryLinkProps: AllowedTypes.shape({
    label: AllowedTypes.string,
    href: AllowedTypes.string,
    target: AllowedTypes.string,
    download: AllowedTypes.string,
    rel: AllowedTypes.string,
    aria: AllowedTypes.aria<LinkAriaAttribute>(LINK_ARIA_ATTRIBUTES),
  }),
  model: AllowedTypes.oneOf<ModelSignatureModel>(MODEL_SIGNATURE_MODELS),
  weight: AllowedTypes.breakpoint<LinkTileWeight>(LINK_TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<LinkTileAspectRatio>(LINK_TILE_ASPECT_RATIOS),
  description: AllowedTypes.string,
  subDescription: AllowedTypes.string,
  direction: AllowedTypes.breakpoint<JssDirections>(JSS_DIRECTIONS),
};

@Component({
  tag: 'p-link-tile-model-signature',
  shadow: { delegatesFocus: true },
})
export class LinkTileModelSignature {
  @Element() public host!: HTMLElement;

  /** Contains the label, href and anchor props for the primary link */
  @Prop() public primaryLinkProps!: LinkTileModelLinkProps;

  /** Contains the label, href and anchor props for the secondary link */
  @Prop() public secondaryLinkProps!: LinkTileModelLinkProps;

  /** Adapts the model of the component. */
  @Prop() public model?: ModelSignatureModel = '911';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<LinkTileWeight> = 'semibold';

  /** Aspect ratio of the link-tile-model. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileAspectRatio> = '4:3';

  /** Description text. */
  @Prop() public description!: string;

  /** Sub description text. */
  @Prop() public subDescription?: string;

  /** Defines the direction of the main and cross axis of the links. The default is '{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint 'xs'. */
  @Prop() public direction?: BreakpointCustomizable<JssDirections> = { base: 'column', xs: 'row' };

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.weight,
      this.direction,
      !!this.subDescription
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const { label: primaryLabel, ...restPrimaryLinkProps } = parseJSONAttribute(this.primaryLinkProps);
    const { label: secondaryLabel, ...restSecondaryLinkProps } = parseJSONAttribute(this.secondaryLinkProps);

    const sharedLinkProps = {
      class: 'link',
      theme: 'dark',
    };

    return (
      <div class="root">
        <div class="image-container">
          <slot />
        </div>
        <PrefixedTagNames.pModelSignature class="signature" theme="dark" model={this.model} />
        <div class="content">
          <a {...restPrimaryLinkProps} class="link-overlay" tabIndex={-1} aria-hidden="true"></a>
          {this.subDescription ? (
            <div class="description-group" role="group">
              <p class="description">{this.description}</p>
              <p class="sub-description">{this.subDescription}</p>
            </div>
          ) : (
            <p class="description">{this.description}</p>
          )}
          <div class="link-group" role="group">
            <PrefixedTagNames.pLink {...sharedLinkProps} {...restPrimaryLinkProps} key="primary-link" variant="primary">
              {primaryLabel}
            </PrefixedTagNames.pLink>
            <PrefixedTagNames.pLink
              {...sharedLinkProps}
              {...restSecondaryLinkProps}
              key="secondary-link"
              variant="secondary"
            >
              {secondaryLabel}
            </PrefixedTagNames.pLink>
          </div>
        </div>
      </div>
    );
  }
}
