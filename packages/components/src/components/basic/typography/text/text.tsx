import { JSX, Component, Prop, h, Element, Host } from '@stencil/core';
import {
  calcLineHeightForElement,
  getHTMLElement,
  getThemeDarkAttribute,
  transitionListener,
  attachSlottedCss,
  attachComponentCss,
} from '../../../../utils';
import type { BreakpointCustomizable, TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { isSizeInherit } from './text-utils';
import { getComponentCss, getSlottedCss } from './text-styles';

@Component({
  tag: 'p-text',
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

  private textTag: HTMLElement;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentWillRender(): void {
    attachComponentCss(
      this.host,
      getComponentCss,
      this.size,
      this.weight,
      this.align,
      this.color,
      this.ellipsis,
      this.theme,
    );
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

    return (
      <Host {...getThemeDarkAttribute(this.theme)}>
        <TagType class="root" ref={(el) => (this.textTag = el)}>
          <slot />
        </TagType>
      </Host>
    );
  }
}
