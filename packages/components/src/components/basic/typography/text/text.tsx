import { JSX, Component, Prop, h, Element } from '@stencil/core';
import {
  calcLineHeightForElement,
  getHTMLElement,
  getShadowRootHTMLElement,
  insertSlottedStyles,
  isDark,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
} from '../../../../utils';
import type { BreakpointCustomizable, TextAlign, TextColor, TextWeight, Theme, TextSize } from '../../../../types';

@Component({
  tag: 'p-text',
  styleUrl: 'text.scss',
  shadow: true,
})
export class Text {
  @Element() public host!: HTMLElement;

  /** Sets a custom HTML tag depending of the usage of the text component. */
  @Prop() public tag?: 'p' | 'span' | 'div' | 'address' | 'blockquote' | 'figcaption' | 'cite' | 'time' | 'legend' =
    'p';

  /** Size of the text. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text. */
  @Prop() public weight?: TextWeight = 'regular';

  /** Text alignment of the component. */
  @Prop() public align?: TextAlign = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: TextColor = 'default';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public connectedCallback(): void {
    this.addSlottedStyles();
  }

  public componentDidLoad(): void {
    const el: HTMLElement = getShadowRootHTMLElement(this.host, '*');
    transitionListener(el, 'font-size', () => {
      el.style.lineHeight = `${calcLineHeightForElement(el)}`;
    });
  }

  public render(): JSX.Element {
    const hasSlottedTextTag = getHTMLElement(this.host, ':first-child').matches(
      'p,span,div,address,blockquote,figcaption,cite,time,legend'
    );
    const TagType = hasSlottedTextTag ? 'div' : this.tag;

    const textClasses = {
      [prefix('text')]: true,
      [prefix(`text--weight-${this.weight}`)]: true,
      [prefix(`text--align-${this.align}`)]: true,
      [prefix(`text--color-${this.color}`)]: true,
      [prefix('text--ellipsis')]: this.ellipsis,
      [prefix('text--theme-dark')]: isDark(this.theme) && this.color !== 'inherit',
      ...mapBreakpointPropToPrefixedClasses('text--size', this.size),
    };

    return (
      <TagType class={textClasses}>
        <slot />
      </TagType>
    );
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent !important;
      color: inherit !important;
      text-decoration: underline !important;
      -webkit-transition: color .24s ease !important;
      transition: color .24s ease !important;
      outline: transparent solid 1px !important;
      outline-offset: 1px !important;
    }

    ${tagName} a:hover {
      color: #d5001c !important;
    }

    ${tagName} a:focus {
      outline-color: currentColor !important;
    }

    ${tagName} a:focus:not(:focus-visible) {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
