import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, TEXT_SIZES, validateProps } from '../../utils';
import { getComponentCss } from './text-styles';
import {
  getTextTagType,
  TEXT_ALIGNS,
  TEXT_COLORS,
  TEXT_TAGS,
  TEXT_WEIGHTS,
  type TextAlign,
  type TextColor,
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

  /** Sets the HTML tag of the rendered element to ensure correct semantic meaning (e.g. 'p' for paragraphs, 'blockquote' for quotes). */
  @Prop() public tag?: TextTag = 'p';

  /** Size of the text. Also defines the size for specific breakpoints, like {base: "sm", l: "md"}. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'sm';

  /** The font weight of the text. */
  @Prop() public weight?: TextWeight = 'normal';

  /** Text alignment of the text. */
  @Prop() public align?: TextAlign = 'start';

  /** Text color of the text. Use 'primary' for default, 'contrast-high' / 'contrast-medium' for alternative emphasis, 'success' / 'warning' / 'error' / 'info' for status messages, or 'inherit' to adopt the parent's color. */
  @Prop() public color?: TextColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows the container width. */
  @Prop() public ellipsis?: boolean = false;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.weight, this.align, this.color, this.ellipsis);

    const TagType = getTextTagType(this.host, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
