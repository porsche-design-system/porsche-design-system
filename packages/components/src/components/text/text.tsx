import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, validateProps } from '../../utils';
import { getComponentCss } from './text-styles';
import {
  getTextTagType,
  TEXT_ALIGNS,
  TEXT_COLORS,
  TEXT_HYPHENS,
  TEXT_SIZES,
  TEXT_TAGS,
  TEXT_WEIGHTS,
  type TextAlign,
  type TextColor,
  type TextHyphens,
  type TextSize,
  type TextTag,
  type TextWeight,
} from './text-utils';

const propTypes: PropTypes<typeof Text> = {
  tag: AllowedTypes.oneOf<TextTag>(TEXT_TAGS),
  size: AllowedTypes.breakpoint<TextSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<TextWeight>(TEXT_WEIGHTS),
  align: AllowedTypes.oneOf<TextAlign>(TEXT_ALIGNS),
  color: AllowedTypes.oneOf<TextColor>(TEXT_COLORS),
  hyphens: AllowedTypes.oneOf<TextHyphens>(TEXT_HYPHENS),
  ellipsis: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the text to render." }
 */
@Component({
  tag: 'p-text',
  shadow: true,
})
export class Text {
  @Element() public host!: HTMLElement;

  /** Sets the HTML tag of the rendered element to ensure correct semantic meaning (e.g. 'p' for paragraphs, 'blockquote' for quotes, 'time' for dates). */
  @Prop() public tag?: TextTag = 'p';

  /** Size of the text. Also defines the size for specific breakpoints, like {base: "sm", l: "md"}. You always need to provide a base value when doing this. Use 'inherit' to adopt the parent's font size. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'sm';

  /** The font weight of the text. Use 'normal' for regular body text, 'semibold' for slightly emphasized text, or 'bold' for strong emphasis. */
  @Prop() public weight?: TextWeight = 'normal';

  /** Text alignment of the text. Use 'start' for left-aligned text (in LTR), 'center' for centered, 'end' for right-aligned (in LTR), or 'inherit' to adopt the parent's alignment. */
  @Prop() public align?: TextAlign = 'start';

  /** Text color of the text. Use 'primary' for default, 'contrast-higher' / 'contrast-high' / 'contrast-medium' for alternative emphasis levels, 'success' / 'warning' / 'error' / 'info' for status messages, or 'inherit' to adopt the parent's color. */
  @Prop() public color?: TextColor = 'primary';

  /** Controls the hyphenation behavior of the text. Use 'auto' to let the browser automatically hyphenate words at appropriate points, 'manual' to only hyphenate at manually inserted hyphenation points (e.g. `&shy;`), 'none' to disable hyphenation entirely, or 'inherit' to adopt the parent's hyphenation setting. */
  @Prop() public hyphens?: TextHyphens = 'inherit';

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

    const TagType = getTextTagType(this.host, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
