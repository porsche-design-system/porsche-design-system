import type { PropTypes, Theme } from '../../types';
import {
  type HeadlineAlign,
  type HeadlineAlignDeprecated,
  type HeadlineColor,
  type HeadlineTag,
  type HeadlineVariant,
  getHeadlineTagType,
  HEADLINE_COLORS,
  HEADLINE_TAGS,
} from './headline-utils';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  hasPropValueChanged,
  THEMES,
  TYPOGRAPHY_ALIGNS,
  validateProps,
  warnIfDeprecatedComponentIsUsed,
} from '../../utils';
import { getComponentCss } from './headline-styles';
import { getSlottedAnchorStyles } from '../../styles';

const propTypes: Omit<PropTypes<typeof Headline>, 'variant'> = {
  // variant: AllowedTypes.string, // TODO: with all the different values this can't easily be validated
  tag: AllowedTypes.oneOf<HeadlineTag>([undefined, ...HEADLINE_TAGS]),
  align: AllowedTypes.oneOf<HeadlineAlign>(TYPOGRAPHY_ALIGNS),
  color: AllowedTypes.oneOf<HeadlineColor>(HEADLINE_COLORS),
  ellipsis: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

type AlignDeprecationMapType = Record<HeadlineAlignDeprecated, Exclude<HeadlineAlign, HeadlineAlignDeprecated>>;

/**
 * @slot {"name": "", "description": "Default slot to render the headline." }
 *
 * @deprecated since v3.0.0, will be removed with next major release. Please use "p-heading" instead.
 */
@Component({
  tag: 'p-headline',
  shadow: true,
})
export class Headline {
  @Element() public host!: HTMLElement;

  /** Predefined style of the headline. */
  @Prop() public variant?: HeadlineVariant = 'headline-1';

  /** Sets a custom HTML tag depending on the usage of the headline component. */
  @Prop() public tag?: HeadlineTag;

  /** Text alignment of the component. */
  @Prop() public align?: HeadlineAlign = 'start';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: HeadlineColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, 'Please use new p-heading component instead.');
    const alignDeprecationMap: AlignDeprecationMapType = {
      left: 'start',
      right: 'end',
    };
    attachComponentCss(
      this.host,
      getComponentCss,
      this.variant,
      (alignDeprecationMap[this.align as keyof AlignDeprecationMapType] || this.align) as Exclude<
        HeadlineAlign,
        HeadlineAlignDeprecated
      >,
      this.color,
      this.ellipsis,
      this.theme
    );

    const TagType = getHeadlineTagType(this.host, this.variant, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
