import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, HeadingSize, HeadingTag, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  HEADING_SIZES,
  HEADING_TAGS,
  hasPropValueChanged,
  TYPOGRAPHY_ALIGNS,
  validateProps,
} from '../../utils';
import { getComponentCss } from './heading-styles';
import { getHeadingTagType, HEADING_COLORS, type HeadingAlign, type HeadingColor } from './heading-utils';

const propTypes: PropTypes<typeof Heading> = {
  tag: AllowedTypes.oneOf<HeadingTag>([undefined, ...HEADING_TAGS]),
  size: AllowedTypes.breakpoint<HeadingSize>(HEADING_SIZES),
  align: AllowedTypes.oneOf<HeadingAlign>(TYPOGRAPHY_ALIGNS),
  color: AllowedTypes.oneOf<HeadingColor>(HEADING_COLORS),
  ellipsis: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot to render the heading." }
 */
@Component({
  tag: 'p-heading',
  shadow: true,
})
export class Heading {
  @Element() public host!: HTMLElement;

  /** Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public tag?: HeadingTag;

  /** Size of the component. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = 'xx-large';

  /** Text alignment of the component. */
  @Prop() public align?: HeadingAlign = 'start';

  /** Basic text color variations. */
  @Prop() public color?: HeadingColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.align, this.color, this.ellipsis);

    const TagType = getHeadingTagType(this.host, this.size, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
