import type { PropTypes, SelectedAriaAttributes } from '../../types';
import type { CrestAriaAttribute, CrestTarget } from './crest-utils';
import { buildCrestSrcSet, CREST_ARIA_ATTRIBUTES, crestCdnBaseUrl, crestInnerManifest } from './crest-utils';
import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, parseAndGetAriaAttributes, validateProps } from '../../utils';
import { getComponentCss } from './crest-styles';

const propTypes: PropTypes<typeof Crest> = {
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  aria: AllowedTypes.aria<CrestAriaAttribute>(CREST_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-crest',
  shadow: { delegatesFocus: true },
})
export class Crest {
  @Element() public host!: HTMLElement;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: CrestTarget = '_self';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<CrestAriaAttribute>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    const picture = (
      <picture>
        <source key="webp" srcSet={buildCrestSrcSet('webp')} type="image/webp" />
        <source key="png" srcSet={buildCrestSrcSet('png')} type="image/png" />
        <img src={`${crestCdnBaseUrl}/${crestInnerManifest['2x'].png}`} alt="Porsche" />
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
