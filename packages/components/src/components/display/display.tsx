import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  validateProps,
  warnIfDeprecatedComponentIsUsed,
} from '../../utils';
import { getComponentCss } from './display-styles';
import {
  DISPLAY_ALIGNS,
  DISPLAY_COLORS,
  DISPLAY_SIZES,
  DISPLAY_TAGS,
  type DisplayAlign,
  type DisplayColor,
  type DisplaySize,
  type DisplayTag,
  getDisplayTagType,
} from './display-utils';

const propTypes: PropTypes<typeof Display> = {
  tag: AllowedTypes.oneOf<DisplayTag>([undefined, ...DISPLAY_TAGS]),
  size: AllowedTypes.breakpoint<DisplaySize>(DISPLAY_SIZES),
  align: AllowedTypes.oneOf<DisplayAlign>(DISPLAY_ALIGNS),
  color: AllowedTypes.oneOf<DisplayColor>(DISPLAY_COLORS),
  ellipsis: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the display text." }
 *
 * @deprecated since v4.0.0, will be removed with next major release. Please use `p-heading` instead.
 */
@Component({
  tag: 'p-display',
  shadow: true,
})
export class Display {
  @Element() public host!: HTMLElement;

  /** Sets the HTML heading tag (h1–h6) for correct document outline placement. When omitted, the tag is inferred from `size`. */
  @Prop() public tag?: DisplayTag;

  /** Sets the visual text size. Supports responsive breakpoint values. */
  @Prop() public size?: BreakpointCustomizable<DisplaySize> = 'large';

  /** Sets the horizontal text alignment (`start`, `center`, `end`, or `inherit`). */
  @Prop() public align?: DisplayAlign = 'start';

  /** Sets the text color using PDS color tokens. */
  @Prop() public color?: DisplayColor = 'primary';

  /** Truncates the text with an ellipsis when it overflows the container on a single line. */
  @Prop() public ellipsis?: boolean = false;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, 'Please use p-heading component instead.');
    attachComponentCss(this.host, getComponentCss, this.size, this.align, this.color, this.ellipsis);

    const TagType = getDisplayTagType(this.host, this.size, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
