import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import type { WordmarkSize, WordmarkTarget, WordmarkAriaAttribute } from './wordmark-utils';
import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, parseAndGetAriaAttributes, validateProps, THEMES } from '../../utils';
import { WORDMARK_ARIA_ATTRIBUTES, WORDMARK_SIZES } from './wordmark-utils';
import { getComponentCss } from './wordmark-styles';

const propTypes: PropTypes<typeof Wordmark> = {
  size: AllowedTypes.oneOf<WordmarkSize>(WORDMARK_SIZES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  aria: AllowedTypes.aria<WordmarkAriaAttribute>(WORDMARK_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-wordmark',
  shadow: { delegatesFocus: true },
})
export class Wordmark {
  @Element() public host!: HTMLElement;

  /** Adapts sizing of wordmark. */
  @Prop() public size?: WordmarkSize = 'small';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: WordmarkTarget = '_self';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<WordmarkAriaAttribute>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.theme);

    const svg = (
      <svg viewBox="0 0 4383 300" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M492,221c48.1,0,74-25.9,74-74V74c0-48.1-25.9-74-74-74H0v300h68v-79H492z M498,78v65c0,7.8-4.2,12-12,12H68V66h418
	C493.8,66,498,70.2,498,78z M718,300c-48.1,0-74-25.9-74-74V74c0-48.1,25.9-74,74-74h407c48.1,0,74,25.9,74,74v152
	c0,48.1-25.9,74-74,74H718z M1119,234c7.8,0,12-4.2,12-12V78c0-7.8-4.2-12-12-12H724c-7.8,0-12,4.2-12,12v144c0,7.8,4.2,12,12,12
	H1119z M1776,198c39.8444,16.7574,67.8527,56.1,68,102h-68c0-54-25-79-79-79h-351v79h-68V0h492c48.1,0,74,25.9,74,74v50.14
	C1844,170.2,1820.25,195.9,1776,198z M1764,155c7.8,0,12-4.2,12-12V78c0-7.8-4.2-12-12-12h-418v89H1764z M1919,74
	c0-48.1,25.9-74,74-74h482v56h-476c-7.8,0-12,4.2-12,12v42c0,7.8,4.2,12,12,12h412c48.1,0,74,25.9,74,74v30
	c0,48.1-25.9,74-74,74h-482v-56h476c7.8,0,12-4.2,12-12v-42c0-7.8-4.2-12-12-12h-412c-48.1,0-74-25.9-74-74V74z M2562,74
	c0-48.1,25.9-74,74-74h470v66h-464c-7.8,0-12,4.2-12,12v144c0,7.8,4.2,12,12,12h464v66h-470c-48.1,0-74-25.9-74-74V74z
	 M3718,0v300h-68V183h-397v117h-68V0h68v117h397V0H3718z M3866,56v66h517v56h-517v66h517v56h-585V0h585v56H3866z"
        />
      </svg>
    );

    return (
      <Host>
        {this.href === undefined ? (
          svg
        ) : (
          <a href={this.href} target={this.target} {...parseAndGetAriaAttributes(this.aria)}>
            {svg}
          </a>
        )}
      </Host>
    );
  }
}
