import type { LinkTarget, SelectedAriaAttributes } from '../../../types';
import type { MarqueSize } from './marque-utils';
import type { MarqueAriaAttributes } from './marque-utils';
import { Component, Element, Host, JSX, h, Prop } from '@stencil/core';
import { attachComponentCss, parseAndGetAriaAttributes } from '../../../utils';
import { breakpoint } from '../../../styles';
import { buildSrcSet, cdnBaseUrl, getInnerManifest } from './marque-utils';
import { getComponentCss } from './marque-styles';
import { MARQUE_ARIA_ATTRIBUTES } from './marque-utils';

@Component({
  tag: 'p-marque',
  shadow: { delegatesFocus: true },
})
export class Marque {
  @Element() public host!: HTMLElement;

  /** Show/hide trademark sign. */
  @Prop() public trademark?: boolean = true;

  /** Adapts sizing of marque. */
  @Prop() public size?: MarqueSize = 'responsive';

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<MarqueAriaAttributes>;

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.size);
  }

  public render(): JSX.Element {
    const innerManifest = getInnerManifest(this.trademark);
    const mediumMedia = `(min-width: ${breakpoint.l}px)`;

    const picture = (
      <picture>
        {this.size === 'responsive'
          ? [
              <source srcSet={buildSrcSet(innerManifest, 'medium', 'webp')} media={mediumMedia} type="image/webp" />,
              <source srcSet={buildSrcSet(innerManifest, 'medium', 'png')} media={mediumMedia} type="image/png" />,
              <source srcSet={buildSrcSet(innerManifest, 'small', 'webp')} type="image/webp" />,
              <source srcSet={buildSrcSet(innerManifest, 'small', 'png')} type="image/png" />,
            ]
          : [
              <source srcSet={buildSrcSet(innerManifest, this.size, 'webp')} type="image/webp" />,
              <source srcSet={buildSrcSet(innerManifest, this.size, 'png')} type="image/png" />,
            ]}
        <img src={`${cdnBaseUrl}/${innerManifest.medium['2x'].png}`} alt="Porsche" />
      </picture>
    );

    return (
      <Host>
        {this.href === undefined ? (
          picture
        ) : (
          <a href={this.href} target={this.target} {...parseAndGetAriaAttributes(this.aria, MARQUE_ARIA_ATTRIBUTES)}>
            {picture}
          </a>
        )}
      </Host>
    );
  }
}
