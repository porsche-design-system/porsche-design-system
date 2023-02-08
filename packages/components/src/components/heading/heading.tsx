import type { HeadingAlign, HeadingTag } from './heading-utils';
import { HEADING_COLORS, HEADING_SIZES, HEADING_TAGS, HeadingColor } from './heading-utils';
import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getDataThemeDarkAttribute,
  getHTMLElement,
  TEXT_ALIGNS,
  THEMES,
  validateProps,
} from '../../utils';
import type { BreakpointCustomizable, HeadingSize, PropTypes, Theme } from '../../types';
import { getComponentCss } from './heading-styles';

const propTypes: PropTypes<typeof Heading> = {
  tag: AllowedTypes.oneOf<HeadingTag>(HEADING_TAGS),
  size: AllowedTypes.breakpoint<HeadingSize>(HEADING_SIZES),
  align: AllowedTypes.oneOf<HeadingAlign>(TEXT_ALIGNS),
  color: AllowedTypes.oneOf<HeadingColor>(HEADING_COLORS),
  ellipsis: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-heading',
  shadow: true,
})
export class Heading {
  @Element() public host!: HTMLElement;

  /** Sets a custom HTML tag depending on the usage of the heading component. */
  @Prop() public tag?: HeadingTag = 'h2';

  /** Size of the component. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = 'xx-large';

  /** Text alignment of the component. */
  @Prop() public align?: HeadingAlign = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: HeadingColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.align, this.color, this.ellipsis, this.theme);

    // const TagName = getHeadingTagName(this.host, this.size, this.tag);

    const firstChild = getHTMLElement(this.host, ':first-child');
    const hasSlottedTextTag = firstChild?.matches(HEADING_TAGS.join());
    const TagType = hasSlottedTextTag ? 'div' : this.tag;

    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <TagType class="root">
          <slot />
        </TagType>
      </Host>
    );
  }
}
