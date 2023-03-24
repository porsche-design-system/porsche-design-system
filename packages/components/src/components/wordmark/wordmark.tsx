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

    // optimized with ImageOptim and svgo
    const svg = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4383 300" width="100%" height="100%">
        <path d="M492 221c48.1 0 74-25.9 74-74V74c0-48.1-25.9-74-74-74H0v300h68v-79zm6-143v65c0 7.8-4.2 12-12 12H68V66h418c7.8 0 12 4.2 12 12zm220 222c-48.1 0-74-25.9-74-74V74c0-48.1 25.9-74 74-74h407c48.1 0 74 25.9 74 74v152c0 48.1-25.9 74-74 74zm401-66c7.8 0 12-4.2 12-12V78c0-7.8-4.2-12-12-12H724c-7.8 0-12 4.2-12 12v144c0 7.8 4.2 12 12 12zm657-36c39.844 16.757 67.853 56.1 68 102h-68c0-54-25-79-79-79h-351v79h-68V0h492c48.1 0 74 25.9 74 74v50.14c0 46.06-23.75 71.76-68 73.86zm-12-43c7.8 0 12-4.2 12-12V78c0-7.8-4.2-12-12-12h-418v89zm155-81c0-48.1 25.9-74 74-74h482v56h-476c-7.8 0-12 4.2-12 12v42c0 7.8 4.2 12 12 12h412c48.1 0 74 25.9 74 74v30c0 48.1-25.9 74-74 74h-482v-56h476c7.8 0 12-4.2 12-12v-42c0-7.8-4.2-12-12-12h-412c-48.1 0-74-25.9-74-74zm643 0c0-48.1 25.9-74 74-74h470v66h-464c-7.8 0-12 4.2-12 12v144c0 7.8 4.2 12 12 12h464v66h-470c-48.1 0-74-25.9-74-74zM3718 0v300h-68V183h-397v117h-68V0h68v117h397V0zm148 56v66h517v56h-517v66h517v56h-585V0h585v56z" />
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
