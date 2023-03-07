import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import type { LinkTileModelAspectRatio, LinkTileModelLinkProps } from './link-tile-model-utils';
import type { BreakpointCustomizable } from '../../types';
import type { JssDirections } from '../../styles/jss-direction-styles';
import type { LinkButtonTileWeight } from '../../styles/link-button-tile-styles';
import { attachComponentCss, attachSlottedCss, getPrefixedTagNames, parseJSONAttribute } from '../../utils';
import { getComponentCss } from './link-tile-model-styles';
import { getSlottedCss } from '../../styles/link-button-tile-styles';

@Component({
  tag: 'p-link-tile-model',
  shadow: { delegatesFocus: true },
})
export class LinkTileModel {
  @Element() public host!: HTMLElement;

  /** Contains the label, href and anchor props for the primary link */
  @Prop() public primaryLinkProps: LinkTileModelLinkProps;

  /** Contains the label, href and anchor props for the secondary link */
  @Prop() public secondaryLinkProps: LinkTileModelLinkProps;

  /** Adapts the model of the component. */
  @Prop() public model?: ModelSignatureModel = '911';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<LinkButtonTileWeight> = 'semibold';

  /** Aspect ratio of the link-tile-model. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileModelAspectRatio> = '4:3';

  /** Description text. */
  @Prop() public description: string;

  // TODO: naming?
  /** Description text. */
  @Prop() public subDescription?: string;

  /** Defines the direction of the main and cross axis of the links. */
  @Prop() public direction?: BreakpointCustomizable<JssDirections> = 'row';

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public render(): JSX.Element {
    attachComponentCss(this.host, getComponentCss, this.aspectRatio, this.weight, this.direction);

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
