import type { PropTypes, SelectedAriaAttributes } from '../../types';
import type { MarqueAriaAttribute, MarqueVariant, MarqueTarget } from './marque-utils';
import { buildImgSrc, buildSrcSet, getInnerManifest, MARQUE_ARIA_ATTRIBUTES, MARQUE_VARIANTS } from './marque-utils';
import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  validateProps,
  warnIfDeprecatedComponentIsUsed,
} from '../../utils';
import { breakpoint } from '@porsche-design-system/utilities-v2';
import { getComponentCss } from './marque-styles';
import type { MarqueSize } from './marque-size';
import { MARQUE_SIZES } from './marque-size';

const propTypes: PropTypes<typeof Marque> = {
  trademark: AllowedTypes.boolean,
  variant: AllowedTypes.oneOf<MarqueVariant>(MARQUE_VARIANTS),
  size: AllowedTypes.oneOf<MarqueSize>(MARQUE_SIZES),
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  aria: AllowedTypes.aria<MarqueAriaAttribute>(MARQUE_ARIA_ATTRIBUTES),
};

/** @deprecated since v3.0.0, will be removed with next major release. Please use "p-wordmark" instead. */
@Component({
  tag: 'p-marque',
  shadow: { delegatesFocus: true },
})
export class Marque {
  @Element() public host!: HTMLElement;

  /** Show/hide trademark sign (only has effect when variant is set to default). */
  @Prop() public trademark?: boolean = true;

  /** Shows marque in special editions */
  @Prop() public variant?: MarqueVariant = 'default';

  /** Adapts sizing of marque. */
  @Prop() public size?: MarqueSize = 'responsive';

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: MarqueTarget = '_self';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<MarqueAriaAttribute>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, 'Please use new p-wordmark component instead.');
    attachComponentCss(this.host, getComponentCss, this.size);

    const innerManifest = getInnerManifest(this.variant, this.trademark);
    const mediumMedia = `(min-width: ${breakpoint.l}px)`;

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
        <img src={buildImgSrc(innerManifest)} alt="Porsche" />
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
