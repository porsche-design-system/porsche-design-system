import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getDataThemeDarkAttribute,
  THEMES,
  TEXT_ALIGNS,
  validateProps,
  warnIfComponentIsDeprecated,
} from '../../utils';
import type { PropTypes, TextAlign, TextColor, Theme } from '../../types';
import type { HeadingTag } from '../heading/heading-utils';
import type { HeadlineVariantDeprecated } from './headline-utils';
import { getHeadlineTagName } from './headline-utils';
import { HEADING_TAGS } from '../heading/heading-utils';
import { getComponentCss } from '../heading/heading-styles';

const propTypes: Omit<PropTypes<typeof Headline>, 'variant'> = {
  // variant: AllowedTypes.string, // TODO: with all the different values this can't easily be validated
  tag: AllowedTypes.oneOf<HeadingTag>([...HEADING_TAGS, undefined]),
  align: AllowedTypes.oneOf<TextAlign>(TEXT_ALIGNS),
  color: AllowedTypes.oneOf<Extract<TextColor, 'primary' | 'default' | 'inherit'>>(['primary', 'default', 'inherit']),
  ellipsis: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-headline',
  shadow: true,
})
export class Headline {
  @Element() public host!: HTMLElement;

  /** Predefined style of the headline. */
  @Prop() public variant?: HeadlineVariantDeprecated = 'headline-1';

  /** Sets a custom HTML tag depending on the usage of the headline component. */
  @Prop() public tag?: HeadingTag;

  /** Text alignment of the component. */
  @Prop() public align?: TextAlign = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: Extract<TextColor, 'primary' | 'default' | 'inherit'> = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public componentWillLoad(): void {
    warnIfComponentIsDeprecated(
      this.host,
      'This component is deprecated and will be removed with next major release. Use "heading" component instead.'
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.variant, this.align, this.color, this.ellipsis, this.theme);

    const TagName = getHeadlineTagName(this.host, this.variant, this.tag);

    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <TagName class="root">
          <slot />
        </TagName>
      </Host>
    );
  }
}
