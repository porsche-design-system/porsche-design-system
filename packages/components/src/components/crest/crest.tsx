import type { PropTypes, SelectedAriaAttributes } from '../../types';
import {
  type CrestAriaAttribute,
  type CrestTarget,
  buildCrestImgSrc,
  buildCrestSrcSet,
  crestSize,
} from './crest-utils';
import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  LINK_ARIA_ATTRIBUTES,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss } from './crest-styles';

const propTypes: PropTypes<typeof Crest> = {
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  aria: AllowedTypes.aria<CrestAriaAttribute>(LINK_ARIA_ATTRIBUTES),
};

const { width, height } = crestSize;

@Component({
  tag: 'p-crest',
  shadow: { delegatesFocus: true },
})
export class Crest {
  @Element() public host!: HTMLElement;

  /** When `href` is provided, the component renders as an `<a>` element. */
  @Prop() public href?: string;

  /** Specifies where to open the linked document. */
  @Prop() public target?: CrestTarget = '_self';

  /** Sets ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<CrestAriaAttribute>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    const picture = (
      <picture>
        <source key="webp" srcSet={buildCrestSrcSet('webp')} type="image/webp" />
        <source key="png" srcSet={buildCrestSrcSet('png')} type="image/png" />
        <img src={buildCrestImgSrc()} width={width} height={height} alt="Porsche" />
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
