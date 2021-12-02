import { JSX, Component, Prop, h, Element, Host } from '@stencil/core';
import {
  calcLineHeightForElement,
  getHTMLElement,
  isDark,
  mapBreakpointPropToClasses,
  getThemeDarkAttribute,
  transitionListener,
  attachSlottedCss,
} from '../../../../utils';
import type { BreakpointCustomizable, TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { isSizeInherit } from './text-utils';
import { getSlottedCss } from './text-styles';

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
  @Prop() public theme?: Exclude<Theme, 'light-electric'> = 'light';

  private textTag: HTMLElement;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentDidLoad(): void {
    if (isSizeInherit(this.size)) {
      transitionListener(this.textTag, 'font-size', () => {
        this.textTag.style.lineHeight = `${calcLineHeightForElement(this.textTag)}`;
      });
    }
  }

  public render(): JSX.Element {
    const firstChild = getHTMLElement(this.host, ':first-child');
    const hasSlottedTextTag = firstChild?.matches('p,span,div,address,blockquote,figcaption,cite,time,legend');
    const TagType = hasSlottedTextTag ? 'div' : this.tag;

    const rootClasses = {
      ['root']: true,
      [`root--weight-${this.weight}`]: this.weight !== 'regular',
      [`root--align-${this.align}`]: this.align !== 'left',
      [`root--color-${this.color}`]: this.color !== 'default',
      ['root--ellipsis']: this.ellipsis,
      ['root--theme-dark']: isDark(this.theme) && this.color !== 'inherit',
      ...mapBreakpointPropToClasses('root--size', this.size),
    };

    return (
      <Host {...getThemeDarkAttribute(this.theme)}>
        <TagType class={rootClasses} ref={(el) => (this.textTag = el)}>
          <slot />
        </TagType>
      </Host>
    );
  }
}
