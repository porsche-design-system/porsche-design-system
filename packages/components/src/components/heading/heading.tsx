import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, validateProps } from '../../utils';
import { getComponentCss } from './heading-styles';
import {
  getHeadingTagType,
  HEADING_ALIGNS,
  HEADING_COLORS,
  HEADING_SIZES,
  HEADING_TAGS,
  HEADING_WEIGHTS,
  type HeadingAlign,
  type HeadingColor,
  type HeadingSize,
  type HeadingTag,
  type HeadingWeight,
} from './heading-utils';

const propTypes: PropTypes<typeof Heading> = {
  tag: AllowedTypes.oneOf<HeadingTag>([undefined, ...HEADING_TAGS]),
  size: AllowedTypes.breakpoint<HeadingSize>(HEADING_SIZES),
  weight: AllowedTypes.oneOf<HeadingWeight>(HEADING_WEIGHTS),
  align: AllowedTypes.oneOf<HeadingAlign>(HEADING_ALIGNS),
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

  /** Sets the HTML heading tag (h1 - h6) to ensure the correct document outline and semantic hierarchy. If not set, the tag is automatically inferred from the `size` property. */
  @Prop() public tag?: HeadingTag;

  /** Size of the heading. Also defines the size for specific breakpoints, like {base: "md", l: "2xl"}. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = '2xl';

  /** The font weight of the heading. For `size` values of 'sm' or smaller, it's recommended to use 'semibold' for better readability. */
  @Prop() public weight?: HeadingWeight = 'normal';

  /** Text alignment of the heading. */
  @Prop() public align?: HeadingAlign = 'start';

  /** Text color of the heading. Use 'primary' for default, 'contrast-high' / 'contrast-medium' for alternative emphasis, or 'inherit' to adopt the parent's color. */
  @Prop() public color?: HeadingColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows the container width. */
  @Prop() public ellipsis?: boolean = false;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.weight, this.align, this.color, this.ellipsis);

    const TagType = getHeadingTagType(this.host, this.size, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
