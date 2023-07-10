import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type { DisplayAlign, DisplayColor, DisplaySize, DisplayTag } from './display-utils';
import { DISPLAY_COLORS, DISPLAY_SIZES, DISPLAY_TAGS, getDisplayTagType } from './display-utils';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, TEXT_ALIGNS, THEMES, validateProps } from '../../utils';
import { getComponentCss } from './display-styles';

const propTypes: PropTypes<typeof Display> = {
  tag: AllowedTypes.oneOf<DisplayTag>([undefined, ...DISPLAY_TAGS]),
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
  @Prop() public tag?: DisplayTag;

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

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.align, this.color, this.ellipsis, this.theme);

    const TagType = getDisplayTagType(this.host, this.size, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
