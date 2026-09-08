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

  /** Sets the HTML heading tag (h1–h6) for correct document outline placement. When omitted, the tag is inferred from `size`. */
  @Prop() public tag?: HeadingTag;

  /** Sets the visual size of the heading. Use `inherit` to derive size from the parent. Supports responsive breakpoint values. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = '2xl';

  /** Sets the font weight — `normal`, `semibold`, or `bold`. */
  @Prop() public weight?: HeadingWeight = 'normal';

  /** Sets the horizontal text alignment (`start`, `center`, `end`, or `inherit`). */
  @Prop() public align?: HeadingAlign = 'start';

  /** Sets the text color using PDS color tokens. */
  @Prop() public color?: HeadingColor = 'primary';

  /** Controls hyphenation behavior — `auto` lets the browser decide, `manual` only breaks at `&shy;`, `none` disables it entirely. */
  @Prop() public hyphens?: HeadingHyphens = 'none';

  /** Truncates the text with an ellipsis when it overflows the container on a single line. Cannot be combined with multi-line content. */
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
