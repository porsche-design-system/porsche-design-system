import type { LinkTarget, PropTypes, SelectedAriaAttributes } from '../../types';
import type { MarqueAriaAttribute, MarqueSize } from './marque-utils';
import { buildSrcSet, cdnBaseUrl, getInnerManifest, MARQUE_ARIA_ATTRIBUTES, MARQUE_SIZES } from './marque-utils';
import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, parseAndGetAriaAttributes, validateProps } from '../../utils';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import { getComponentCss } from './marque-styles';

const propTypes: PropTypes<typeof Marque> = {
  trademark: AllowedTypes.boolean,
  size: AllowedTypes.oneOf<MarqueSize>(MARQUE_SIZES),
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  aria: AllowedTypes.aria<MarqueAriaAttribute>(MARQUE_ARIA_ATTRIBUTES),
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
  @Prop() public aria?: SelectedAriaAttributes<MarqueAriaAttribute>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size);

    const innerManifest = getInnerManifest(this.trademark);
    const mediumMedia = `(min-width: ${breakpoint.l})`;

    const picture = (
      <picture>
        {this.size === 'responsive'
          ? [
              <source
                key="medium-webp"
                srcSet={buildSrcSet(innerManifest, 'medium', 'webp')}
                media={mediumMedia}
                type="image/webp"
              />,
              <source
                key="medium-png"
                srcSet={buildSrcSet(innerManifest, 'medium', 'png')}
                media={mediumMedia}
                type="image/png"
              />,
              <source key="small-webp" srcSet={buildSrcSet(innerManifest, 'small', 'webp')} type="image/webp" />,
              <source key="small-png" srcSet={buildSrcSet(innerManifest, 'small', 'png')} type="image/png" />,
            ]
          : [
              <source key="webp" srcSet={buildSrcSet(innerManifest, this.size, 'webp')} type="image/webp" />,
              <source key="png" srcSet={buildSrcSet(innerManifest, this.size, 'png')} type="image/png" />,
            ]}
        <img src={`${cdnBaseUrl}/${innerManifest.medium['2x'].png}`} alt="Porsche" />
      </picture>
    );

    return (
      <Host>
        {this.href === undefined ? (
          picture
        ) : (
          <a href={this.href} target={this.target} {...parseAndGetAriaAttributes(this.aria)}>
            {picture}
          </a>
        )}
      </Host>
    );
  }
}
