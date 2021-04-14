import { Component, Element, Host, JSX, h, Prop } from '@stencil/core';
import { breakpoint, improveFocusHandlingForCustomElement } from '../../../utils';
import type { LinkTarget } from '../../../types';
import { addCss, buildSrcSet, cdnBaseUrl, getManifestPath } from './marque-utils';
import type { MarqueSize } from './marque-utils';

@Component({
  tag: 'p-marque',
  shadow: true,
})
export class Marque {
  @Element() public host!: HTMLElement;

  /** Show/hide trademark sign. */
  @Prop() public trademark?: boolean = true;

  /** Adapts sizing of marque. */
  @Prop() public size?: MarqueSize = 'responsive';

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string = undefined;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  public connectedCallback(): void {
    improveFocusHandlingForCustomElement(this.host);
  }

  public componentWillRender(): void {
    addCss(this.host, this.size);
  }

  public render(): JSX.Element {
    const getResponsiveMarque = (): JSX.Element[] => {
      const manifestPath = getManifestPath(this.trademark);
      return [
        this.size === 'responsive' ? (
          [
            <source srcSet={buildSrcSet(manifestPath, 'medium')} media={`(min-width: ${breakpoint.l}px)`} />,
            <source srcSet={buildSrcSet(manifestPath, 'small')} />,
          ]
        ) : (
          <source srcSet={buildSrcSet(manifestPath, this.size)} />
        ),
        <img src={`${cdnBaseUrl}/${manifestPath.medium['2x']}`} alt="Porsche" />,
      ];
    };

    const picture = <picture>{getResponsiveMarque()}</picture>;

    return (
      <Host>
        {this.href === undefined ? (
          picture
        ) : (
          <a href={this.href} target={this.target}>
            {picture}
          </a>
        )}
      </Host>
    );
  }
}
