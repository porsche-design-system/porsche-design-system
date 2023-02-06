import type { DisplayTag, DisplaySize, DisplayAlign, DisplayColor } from './display-utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import { DISPLAY_TAGS, DISPLAY_SIZES, DISPLAY_COLORS } from './display-utils';
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
import { getComponentCss } from './display-styles';

const propTypes: PropTypes<typeof Display> = {
  tag: AllowedTypes.oneOf<DisplayTag>(DISPLAY_TAGS),
  size: AllowedTypes.breakpoint<DisplaySize>(DISPLAY_SIZES),
  align: AllowedTypes.oneOf<DisplayAlign>(TEXT_ALIGNS),
  color: AllowedTypes.oneOf<DisplayColor>(DISPLAY_COLORS),
  ellipsis: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-display',
  shadow: true,
})
export class Display {
  @Element() public host!: HTMLElement;

  /** Sets a custom HTML tag depending on the usage of the display component. */
  @Prop() public tag?: DisplayTag = 'h1';

  /** Size of the component. Also defines the size for specific breakpoints, like {base: "medium", l: "large"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<DisplaySize> = 'large';

  /** Text alignment of the component. */
  @Prop() public align?: DisplayAlign = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: DisplayColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.align, this.color, this.ellipsis, this.theme);

    const firstChild = getHTMLElement(this.host, ':first-child');
    const hasSlottedTextTag = firstChild?.matches(DISPLAY_TAGS.join());
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
