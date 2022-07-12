import type { LinkTarget, SelectedAriaAttributes } from '../../../types';
import type { MarqueAriaAttributes, MarqueSize } from './marque-utils';
import { buildSrcSet, cdnBaseUrl, getInnerManifest, MARQUE_ARIA_ATTRIBUTES, MARQUE_SIZES } from './marque-utils';
import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, parseAndGetAriaAttributes, validateProps } from '../../../utils';
import type { PropTypes } from '../../../utils';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import { getComponentCss } from './marque-styles';
import { LINK_TARGETS } from '../../../types';

const propTypes: PropTypes<typeof Marque> = {
  trademark: AllowedTypes.boolean,
  size: AllowedTypes.oneOf<MarqueSize>(MARQUE_SIZES),
  href: AllowedTypes.string,
  target: AllowedTypes.oneOf<LinkTarget>(LINK_TARGETS),
  aria: AllowedTypes.aria<MarqueAriaAttributes>(MARQUE_ARIA_ATTRIBUTES),
};

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
    validateProps(this, propTypes, 'p-marque');
    attachComponentCss(this.host, getComponentCss, this.size);
  }

  public render(): JSX.Element {
    const innerManifest = getInnerManifest(this.trademark);
    const mediumMedia = `(min-width: ${breakpoint.l})`;

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
