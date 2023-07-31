import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import type { WordmarkSize, WordmarkTarget, WordmarkAriaAttribute } from './wordmark-utils';
import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  LINK_ARIA_ATTRIBUTES,
  parseAndGetAriaAttributes,
  validateProps,
  THEMES,
  hasPropValueChanged,
} from '../../utils';
import { WORDMARK_SIZES } from './wordmark-utils';
import { getComponentCss } from './wordmark-styles';

const propTypes: PropTypes<typeof Wordmark> = {
  size: AllowedTypes.oneOf<WordmarkSize>(WORDMARK_SIZES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  href: AllowedTypes.string,
  target: AllowedTypes.string,
  aria: AllowedTypes.aria<WordmarkAriaAttribute>(LINK_ARIA_ATTRIBUTES),
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

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.theme);

    // optimized with SVGO, see docs in assets folder
    const svg = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4500 300">
        <title>Porsche</title>
        <path d="M502 221c48.1 0 74-25.9 74-74V74c0-48.1-25.9-74-74-74H0v300h68v-79h434zm6-143v65c0 7.8-4.2 12-12 12H68V66h428c7.8 0 12 4.2 12 12zm228 222c-48.1 0-74-25.9-74-74V74c0-48.1 25.9-74 74-74h417c48.1 0 74 25.9 74 74v152c0 48.1-25.9 74-74 74H736zm411-66c7.8 0 12-4.2 12-12V78c0-7.8-4.2-12-12-12H742c-7.8 0-12 4.2-12 12v144c0 7.8 4.2 12 12 12h405zm675-36c39.844 16.757 67.853 56.1 68 102h-68c0-54-25-79-79-79h-361v79h-68V0h502c48.1 0 74 25.9 74 74v50.14c0 46.06-23.75 71.76-68 73.86zm-12-43c7.8 0 12-4.2 12-12V78c0-7.8-4.2-12-12-12h-428v89h428zm162-81c0-48.1 25.9-74 74-74h492v56h-486c-7.8 0-12 4.2-12 12v42c0 7.8 4.2 12 12 12h422c48.1 0 74 25.9 74 74v30c0 48.1-25.9 74-74 74h-492v-56h486c7.8 0 12-4.2 12-12v-42c0-7.8-4.2-12-12-12h-422c-48.1 0-74-25.9-74-74V74zm661 0c0-48.1 25.9-74 74-74h480v66h-474c-7.8 0-12 4.2-12 12v144c0 7.8 4.2 12 12 12h474v66h-480c-48.1 0-74-25.9-74-74V74zM3817 0v300h-68V183h-407v117h-68V0h68v117h407V0h68zm156 56v66h527v56h-527v66h527v56h-595V0h595v56h-527z" />
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
