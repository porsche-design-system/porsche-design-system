import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, TextSize } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  TEXT_SIZES,
  TYPOGRAPHY_ALIGNS,
  TYPOGRAPHY_TEXT_COLORS,
  TYPOGRAPHY_TEXT_WEIGHTS,
  validateProps,
} from '../../utils';
import { getComponentCss } from './text-styles';
import { getTextTagType, TEXT_TAGS, type TextAlign, type TextColor, type TextTag, type TextWeight } from './text-utils';

const propTypes: PropTypes<typeof Text> = {
  tag: AllowedTypes.oneOf<TextTag>(TEXT_TAGS),
  size: AllowedTypes.breakpoint<TextSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<TextWeight>(TYPOGRAPHY_TEXT_WEIGHTS),
  align: AllowedTypes.oneOf<TextAlign>(TYPOGRAPHY_ALIGNS),
  color: AllowedTypes.oneOf<TextColor>(TYPOGRAPHY_TEXT_COLORS),
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

  /** Sets a custom HTML tag depending on the usage of the text component. */
  @Prop() public tag?: TextTag = 'p';

  /** Size of the text. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text. */
  @Prop() public weight?: TextWeight = 'regular';

  /** Text alignment of the component. */
  @Prop() public align?: TextAlign = 'start';

  /** Basic text color variations. */
  @Prop() public color?: TextColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
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
