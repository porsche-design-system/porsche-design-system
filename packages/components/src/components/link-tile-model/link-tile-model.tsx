import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { ModelSignatureModel } from '../model-signature/model-signature-utils';
import { attachComponentCss, getPrefixedTagNames } from '../../utils';
import type { LinkTileWeight } from '../link-tile/link-tile-utils';
import type { LinkTileModelAspectRatio } from './link-tile-model-utils';
import type { SelectedAriaAttributes, LinkTarget, BreakpointCustomizable } from '../../types';
import type { LinkAriaAttribute } from '../link/link-utils';
import type { ButtonLinkGroupDirection } from '../../styles/direction-jss-style';
import { getComponentCss } from './link-tile-model-styles';

@Component({
  tag: 'p-link-tile-model',
  shadow: { delegatesFocus: true },
})
export class LinkTileModel {
  @Element() public host!: HTMLElement;

  /** Adapts the model of the component. */
  @Prop() public model?: ModelSignatureModel = '911';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<LinkTileWeight> = 'semibold';

  /** Label of the primary <a />. */
  @Prop() public primaryLabel: string;

  /** Label of the secondary <a />. */
  @Prop() public secondaryLabel: string;

  /** Aspect ratio of the link-tile-model. */
  @Prop() public aspectRatio?: BreakpointCustomizable<LinkTileModelAspectRatio> = '4:3';

  /** Description text. */
  @Prop() public description: string;

  // TODO: naming?

  /** Description text. */
  @Prop() public subDescription?: string;

  // TODO: distinguish between primary and secondary href?

  /** Defines the direction of the main and cross axis of the links. */
  @Prop() public direction?: BreakpointCustomizable<ButtonLinkGroupDirection> = 'row';

  /** href of the `<a>`. */
  @Prop() public href: string;

  // TODO: are those needed? And if so how to comfortable set them onto primary and secondary?

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Special download attribute to open native browser download dialog if target url points to a downloadable file. */
  @Prop() public download?: string;

  /** Specifies the relationship of the target object to the link object. */
  @Prop() public rel?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<LinkAriaAttribute>;

  public render(): JSX.Element {
    attachComponentCss(this.host, getComponentCss, this.aspectRatio, this.weight, this.direction);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const sharedLinkProps = {
      href: this.href,
      target: this.target,
      download: this.download,
      rel: this.rel,
    };

    // TODO: set aria onto links

    return (
      <div class="root">
        <div class="image-container">
          <slot />
        </div>
        <PrefixedTagNames.pModelSignature class="signature" theme="dark" model={this.model} />
        <div class="content">
          <a {...sharedLinkProps} class="link-overlay" tabIndex={-1} aria-hidden="true"></a>
          {this.subDescription ? (
            <div class="description-group" role="group">
              <p class="description">{this.description}</p>
              <p class="sub-description">{this.subDescription}</p>
            </div>
          ) : (
            <p class="description">{this.description}</p>
          )}
          <div class="link-group" role="group">
            <PrefixedTagNames.pLink {...sharedLinkProps} theme="dark" key="link" class="link" variant="primary">
              {this.primaryLabel}
            </PrefixedTagNames.pLink>
            <PrefixedTagNames.pLink class="link" theme="dark" href="#2" key="link" variant="secondary">
              {this.secondaryLabel}
            </PrefixedTagNames.pLink>
          </div>
        </div>
      </div>
    );
  }
}
