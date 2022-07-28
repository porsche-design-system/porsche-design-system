import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../../utils';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getDataThemeDarkAttribute,
  getHTMLElement,
  setLineHeightOnSizeInherit,
  THEMES,
  validateProps,
} from '../../../../utils';
import type { TextAlign, TextColor, TextSize, TextWeight } from '../../../../types';
import { TEXT_ALIGNS, TEXT_COLORS, TEXT_WEIGHTS } from '../../../../types';
import { getComponentCss, getSlottedCss } from './text-styles';
import type { TextTag } from './text-utils';
import { TEXT_SIZES, TEXT_TAGS } from './text-utils';

const propTypes: PropTypes<typeof Text> = {
  tag: AllowedTypes.oneOf<TextTag>(TEXT_TAGS),
  size: AllowedTypes.breakpoint<TextSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<TextWeight>(TEXT_WEIGHTS),
  align: AllowedTypes.oneOf<TextAlign>(TEXT_ALIGNS),
  color: AllowedTypes.oneOf<TextColor>(TEXT_COLORS),
  ellipsis: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-text',
  shadow: true,
})
export class Text {
  @Element() public host!: HTMLElement;

  /** Sets a custom HTML tag depending of the usage of the text component. */
  @Prop() public tag?: TextTag = 'p';

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
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.size,
      this.weight,
      this.align,
      this.color,
      this.ellipsis,
      this.theme
    );
  }

  public componentDidLoad(): void {
    setLineHeightOnSizeInherit(this.size, this.textTag);
  }

  public render(): JSX.Element {
    const firstChild = getHTMLElement(this.host, ':first-child');
    const hasSlottedTextTag = firstChild?.matches('p,span,div,address,blockquote,figcaption,cite,time,legend');
    const TagType = hasSlottedTextTag ? 'div' : this.tag;

    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <TagType class="root" ref={(el) => (this.textTag = el)}>
          <slot />
        </TagType>
      </Host>
    );
  }
}
