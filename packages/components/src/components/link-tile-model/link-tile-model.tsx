import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils';
import type { LinkTileModelAspectRatio, LinkTileModelLinkProps } from './link-tile-model-utils';
import { LINK_TILE_MODEL_ASPECT_RATIO } from './link-tile-model-utils';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import type { JssDirections } from '../../styles/jss-direction-styles';
import { JSS_DIRECTIONS } from '../../styles/jss-direction-styles';
import type { LinkButtonTileWeight } from '../../styles/link-button-tile-styles';
import { getSlottedCss, LINK_BUTTON_TILE_WEIGHTS } from '../../styles/link-button-tile-styles';
import type { LinkAriaAttribute } from '../link/link-utils';
import { LINK_ARIA_ATTRIBUTES } from '../link/link-utils';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getPrefixedTagNames,
  parseJSON,
  validateProps,
} from '../../utils';
import { getComponentCss } from './link-tile-model-styles';

const propTypes: PropTypes<typeof LinkTileModel> = {
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
  weight: AllowedTypes.breakpoint<LinkButtonTileWeight>(LINK_BUTTON_TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<LinkTileModelAspectRatio>(LINK_TILE_MODEL_ASPECT_RATIO),
  description: AllowedTypes.string,
  subDescription: AllowedTypes.string,
  direction: AllowedTypes.breakpoint<JssDirections>(JSS_DIRECTIONS),
};

@Component({
  tag: 'p-link-tile-model',
  shadow: { delegatesFocus: true },
})
export class LinkTileModel {
  @Element() public host!: HTMLElement;

  /** Contains the label, href and anchor props for the primary link */
  @Prop() public primaryLinkProps!: LinkTileModelLinkProps;

  /** Contains the label, href and anchor props for the secondary link */
  @Prop() public secondaryLinkProps!: LinkTileModelLinkProps;

  /** Adapts the model of the component. */
  @Prop() public model?: ModelSignatureModel = '911';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<LinkButtonTileWeight> = 'semibold';

  /** Aspect ratio of the link-tile-model. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileModelAspectRatio> = '4:3';

  /** Description text. */
  @Prop() public description!: string;

  // TODO: naming?
  /** Description text. */
  @Prop() public subDescription?: string;

  /** Defines the direction of the main and cross axis of the links. */
  @Prop() public direction?: BreakpointCustomizable<JssDirections> = 'row';

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

    const { label: primaryLabel, ...restPrimaryLinkProps } = parseJSON(this.primaryLinkProps as any) as any;
    const { label: secondaryLabel, ...restSecondaryLinkProps } = parseJSON(this.secondaryLinkProps as any) as any;

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
