import { JSX, Component, Prop, h, Element } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
  calcLineHeightForElement
} from '../../../../utils';
import { TextSize, TextWeight, Theme } from '../../../../types';
import { insertSlottedStyles } from '../../../../utils/slotted-styles';

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
  @Prop() public color?: 'brand' | 'default' | 'neutral-contrast-high' | 'neutral-contrast-medium' | 'neutral-contrast-low' | 'notification-success' | 'notification-warning' | 'notification-error' | 'inherit' = 'default';

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

    const textClasses = cx(
      prefix('text'),
      mapBreakpointPropToPrefixedClasses('text--size', this.size),
      prefix(`text--weight-${this.weight}`),
      prefix(`text--align-${this.align}`),
      prefix(`text--color-${this.color}`),
      this.ellipsis && prefix('text--ellipsis'),
      this.color !== 'inherit' && prefix(`text--theme-${this.theme}`)
    );

    return (
      <TagType class={textClasses} ref={el => this.textTag = el as HTMLElement}>
        <slot/>
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
    const tagName= this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease;
    }

    ${tagName} a:hover {
      color: #d5001c;
    }

    ${tagName} a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
