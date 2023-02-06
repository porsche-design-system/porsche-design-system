import type { TextTag } from './text-utils';
import type { BreakpointCustomizable, PropTypes, TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../types';
import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getDataThemeDarkAttribute,
  getHTMLElement,
  TEXT_ALIGNS,
  TEXT_COLORS,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './text-styles';
import { TEXT_TAGS } from './text-utils';

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
  @Prop() public align?: TextAlign = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: TextColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const deprecatedColorMap: Partial<Record<TextColor, TextColor>> = {
      brand: 'primary',
      default: 'primary',
      'neutral-contrast-low': 'contrast-low',
      'neutral-contrast-medium': 'contrast-medium',
      'neutral-contrast-high': 'contrast-high',
      'notification-neutral': 'notification-info',
    };
    warnIfDeprecatedPropValueIsUsed(this.host, 'color', deprecatedColorMap);
    const deprecatedTextWeightMap: Partial<Record<TextWeight, TextWeight>> = {
      thin: 'regular',
      semibold: 'semi-bold',
    };
    warnIfDeprecatedPropValueIsUsed(this.host, 'weight', deprecatedTextWeightMap);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.size,
      this.weight,
      this.align,
      this.color,
      this.ellipsis,
      this.theme
    );

    const firstChild = getHTMLElement(this.host, ':first-child');
    const hasSlottedTextTag = firstChild?.matches(TEXT_TAGS.join());
    const TagType = hasSlottedTextTag ? 'div' : this.tag;

    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <TagType class="root">
          <slot />
        </TagType>
      </Host>
    );
  }
}
