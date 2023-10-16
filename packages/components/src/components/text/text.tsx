import type { BreakpointCustomizable, PropTypes, TextColor, TextSize, TextWeight, Theme } from '../../types';
import type { TextTag, TextAlign, TextAlignDeprecated } from './text-utils';
import type { TextColorDeprecated } from './text-color';
import type { TextWeightDeprecated } from './text-weight';
import { getTextTagType, TEXT_TAGS } from './text-utils';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  TEXT_COLORS,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { TEXT_ALIGNS } from './text-utils';
import { getComponentCss } from './text-styles';

const propTypes: PropTypes<typeof Text> = {
  tag: AllowedTypes.oneOf<TextTag>(TEXT_TAGS),
  size: AllowedTypes.breakpoint<TextSize>(TEXT_SIZES),
  weight: AllowedTypes.oneOf<TextWeight>(TEXT_WEIGHTS),
  align: AllowedTypes.oneOf<TextAlign>(TEXT_ALIGNS),
  color: AllowedTypes.oneOf<TextColor>(TEXT_COLORS),
  ellipsis: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

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

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: TextColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const colorDeprecationMap: Record<TextColorDeprecated, Exclude<TextColor, TextColorDeprecated>> = {
      brand: 'primary',
      default: 'primary',
      'neutral-contrast-low': 'contrast-low',
      'neutral-contrast-medium': 'contrast-medium',
      'neutral-contrast-high': 'contrast-high',
      'notification-neutral': 'notification-info',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Text, TextColorDeprecated, TextColor>(this, 'color', colorDeprecationMap);
    const weightDeprecationMap: Record<TextWeightDeprecated, Exclude<TextWeight, TextWeightDeprecated>> = {
      thin: 'regular',
      semibold: 'semi-bold',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Text, TextWeightDeprecated, TextWeight>(
      this,
      'weight',
      weightDeprecationMap
    );
    const alignDeprecationMap: Record<TextAlignDeprecated, Exclude<TextAlign, TextAlignDeprecated>> = {
      left: 'start',
      right: 'end',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Text, TextAlignDeprecated, TextAlign>(this, 'align', alignDeprecationMap);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.size,
      (weightDeprecationMap[this.weight] || this.weight) as Exclude<TextWeight, TextWeightDeprecated>,
      (alignDeprecationMap[this.align] || this.align) as Exclude<TextAlign, TextAlignDeprecated>,
      (colorDeprecationMap[this.color] || this.color) as Exclude<TextColor, TextColorDeprecated>,
      this.ellipsis,
      this.theme
    );

    const TagType = getTextTagType(this.host, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
