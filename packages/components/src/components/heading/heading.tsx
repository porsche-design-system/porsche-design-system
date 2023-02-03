import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getDataThemeDarkAttribute,
  THEMES,
  TEXT_ALIGNS,
  validateProps,
} from '../../utils';
import type { HeadingSize, PropTypes, TextAlign, TextColor, Theme, BreakpointCustomizable } from '../../types';
import type { HeadingTag } from './heading-utils';
import { getHeadingTagName, HEADING_SIZES, HEADING_TAGS } from './heading-utils';
import { getComponentCss } from './heading-styles';

const propTypes: PropTypes<typeof Heading> = {
  size: AllowedTypes.breakpoint<HeadingSize>(HEADING_SIZES),
  tag: AllowedTypes.oneOf<HeadingTag>([...HEADING_TAGS, undefined]),
  align: AllowedTypes.oneOf<TextAlign>(TEXT_ALIGNS),
  color: AllowedTypes.oneOf<Extract<TextColor, 'primary' | 'default' | 'inherit'>>(['primary', 'default', 'inherit']),
  ellipsis: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-heading',
  shadow: true,
})
export class Heading {
  @Element() public host!: HTMLElement;

  /** Size of the heading. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = 'xx-large';

  /** Sets a custom HTML tag depending on the usage of the heading component. */
  @Prop() public tag?: HeadingTag;

  /** Text alignment of the component. */
  @Prop() public align?: TextAlign = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: Extract<TextColor, 'primary' | 'default' | 'inherit'> = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.align, this.color, this.ellipsis, this.theme);

    const TagName = getHeadingTagName(this.host, this.size, this.tag);

    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <TagName class="root">
          <slot />
        </TagName>
      </Host>
    );
  }
}
