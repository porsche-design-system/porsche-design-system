import { JSX, Component, Prop, h, Element } from '@stencil/core';
import {
  BreakpointCustomizable,
  calcLineHeightForElement,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
  insertSlottedStyles
} from '../../../../utils';
import { TextSize, TextWeight, Theme } from '../../../../types';

@Component({
  tag: 'p-text',
  styleUrl: 'text.scss',
  shadow: true
})
export class Text {
  @Element() public host!: HTMLElement;

  /** Sets a custom HTML tag depending of the usage of the text component. */
  @Prop() public tag?:
  | 'p'
  | 'span'
  | 'div'
  | 'address'
  | 'blockquote'
  | 'figcaption'
  | 'cite'
  | 'time'
  | 'legend' = 'p';

  /** Size of the text. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text. */
  @Prop() public weight?: TextWeight = 'regular';

  /** Text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: 'brand' | 'default' | 'neutral-contrast-high' | 'neutral-contrast-medium' | 'neutral-contrast-low' | 'notification-success' | 'notification-warning' | 'notification-error' | 'notification-neutral' | 'inherit' = 'default';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  private textTag: HTMLElement;

  public componentWillLoad(): void {
    this.addSlottedStyles();
  }

  public componentDidLoad(): void {
    this.bindFontSizeListener();
  }

  public render(): JSX.Element {
    const TagType = this.hasSlottedTextTag ? 'div' : this.tag;

    const textClasses = {
      [prefix('text')]: true,
      [prefix(`text--weight-${this.weight}`)]: true,
      [prefix(`text--align-${this.align}`)]: true,
      [prefix(`text--color-${this.color}`)]: true,
      [prefix('text--ellipsis')]: this.ellipsis,
      [prefix(`text--theme-${this.theme}`)]: this.color !== 'inherit',
      ...mapBreakpointPropToPrefixedClasses('text--size', this.size)
    };

    return (
      <TagType class={textClasses} ref={(el) => (this.textTag = el as HTMLElement)}>
        <slot />
      </TagType>
    );
  }

  private get hasSlottedTextTag(): boolean {
    const el = this.host.querySelector(':first-child');
    return el?.matches('p, span, div, address, blockquote, figcaption, cite, time, legend');
  }

  private bindFontSizeListener(): void {
    transitionListener(this.textTag, 'font-size', () => {
      this.textTag.style.lineHeight = `${calcLineHeightForElement(this.textTag)}`;
    });
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
    }`;

    insertSlottedStyles(this.host, style);
  }
}
