import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type { HeadingTag } from './heading-tag';
import type { HeadingAlign, HeadingAlignDeprecated, HeadingColor, HeadingSize } from './heading-utils';
import { getHeadingTagType, HEADING_ALIGNS, HEADING_COLORS, HEADING_SIZES } from './heading-utils';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { HEADING_TAGS } from './heading-tag';
import { getComponentCss } from './heading-styles';

const propTypes: PropTypes<typeof Heading> = {
  tag: AllowedTypes.oneOf<HeadingTag>([undefined, ...HEADING_TAGS]),
  size: AllowedTypes.breakpoint<HeadingSize>(HEADING_SIZES),
  align: AllowedTypes.oneOf<HeadingAlign>(HEADING_ALIGNS),
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
  @Prop() public tag?: HeadingTag;

  /** Size of the component. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = 'xx-large';

  /** Text alignment of the component. */
  @Prop() public align?: HeadingAlign = 'start';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: HeadingColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    const alignDeprecationMap: Record<HeadingAlignDeprecated, Exclude<HeadingAlign, HeadingAlignDeprecated>> = {
      left: 'start',
      right: 'end',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Heading, HeadingAlignDeprecated, HeadingAlign>(
      this,
      'align',
      alignDeprecationMap
    );

    attachComponentCss(
      this.host,
      getComponentCss,
      this.size,
      (alignDeprecationMap[this.align] || this.align) as Exclude<HeadingAlign, HeadingAlignDeprecated>,
      this.color,
      this.ellipsis,
      this.theme
    );

    const TagType = getHeadingTagType(this.host, this.size, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
