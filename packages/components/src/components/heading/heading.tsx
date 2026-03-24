import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, validateProps } from '../../utils';
import { getComponentCss } from './heading-styles';
import {
  getHeadingTagType,
  HEADING_ALIGNS,
  HEADING_COLORS,
  HEADING_HYPHENS,
  HEADING_SIZES,
  HEADING_TAGS,
  HEADING_WEIGHTS,
  type HeadingAlign,
  type HeadingColor,
  type HeadingHyphens,
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
  hyphens: AllowedTypes.oneOf<HeadingHyphens>(HEADING_HYPHENS),
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

  /** Sets the HTML heading tag (h1 - h6) to ensure the correct document outline and semantic hierarchy. If not set, the tag is automatically inferred from the `size` property (e.g. '2xl' maps to 'h2', 'md' to 'h5', 'sm' to 'h6'). */
  @Prop() public tag?: HeadingTag;

  /** Size of the heading. Also defines the size for specific breakpoints, like {base: "md", l: "2xl"}. You always need to provide a base value when doing this. Use 'inherit' to adopt the parent's font size. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = '2xl';

  /** The font weight of the heading. Use 'normal' for regular weight, 'semibold' for slightly emphasized text, or 'bold' for strong emphasis. For `size` values of 'sm' or smaller, it's recommended to use 'semibold' for better readability. */
  @Prop() public weight?: HeadingWeight = 'normal';

  /** Text alignment of the heading. Use 'start' for left-aligned text (in LTR), 'center' for centered, 'end' for right-aligned (in LTR), or 'inherit' to adopt the parent's alignment. */
  @Prop() public align?: HeadingAlign = 'start';

  /** Text color of the heading. Use 'primary' for default, 'contrast-higher' / 'contrast-high' / 'contrast-medium' for alternative emphasis levels, or 'inherit' to adopt the parent's color. */
  @Prop() public color?: HeadingColor = 'primary';

  /** Controls the hyphenation behavior of the heading. Use 'auto' to let the browser automatically hyphenate words at appropriate points, 'manual' to only hyphenate at manually inserted hyphenation points (e.g. `&shy;`), 'none' to disable hyphenation entirely, or 'inherit' to adopt the parent's hyphenation setting. */
  @Prop() public hyphens?: HeadingHyphens = 'none';

  /** Adds an ellipsis to a single line of text if it overflows the container width. When enabled, the text is truncated to a single line with `text-overflow: ellipsis`. Cannot be combined with multi-line content. */
  @Prop() public ellipsis?: boolean = false;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.size,
      this.weight,
      this.align,
      this.color,
      this.hyphens,
      this.ellipsis
    );

    const TagType = getHeadingTagType(this.host, this.size, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
