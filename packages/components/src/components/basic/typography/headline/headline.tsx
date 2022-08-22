import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getDataThemeDarkAttribute,
  setLineHeightOnSizeInherit,
  THEMES,
  TEXT_ALIGNS,
  validateProps,
} from '../../../../utils';
import type { PropTypes, TextAlign, TextColor, Theme } from '../../../../types';
import type { HeadlineTag, HeadlineVariant } from './headline-utils';
import { getHeadlineTagName, HEADLINE_TAGS } from './headline-utils';
import { getComponentCss, getSlottedCss } from './headline-styles';

const propTypes: Omit<PropTypes<typeof Headline>, 'variant'> = {
  // variant: AllowedTypes.string, // TODO: with all the different values this can't easily be validated
  tag: AllowedTypes.oneOf<HeadlineTag>([...HEADLINE_TAGS, undefined]),
  align: AllowedTypes.oneOf<TextAlign>(TEXT_ALIGNS),
  color: AllowedTypes.oneOf<Extract<TextColor, 'default' | 'inherit'>>(['default', 'inherit']),
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
  @Prop() public variant?: HeadlineVariant = 'headline-1';

  /** Sets a custom HTML tag depending of the usage of the headline component. */
  @Prop() public tag?: HeadlineTag;

  /** Text alignment of the component. */
  @Prop() public align?: TextAlign = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: Extract<TextColor, 'default' | 'inherit'> = 'default';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  private headlineTag: HTMLElement;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.variant, this.align, this.color, this.ellipsis, this.theme);
  }

  public componentDidLoad(): void {
    setLineHeightOnSizeInherit(this.variant, this.headlineTag);
  }

  public render(): JSX.Element {
    const TagName = getHeadlineTagName(this.host, this.variant, this.tag);

    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <TagName class="root" ref={(el) => (this.headlineTag = el)}>
          <slot />
        </TagName>
      </Host>
    );
  }
}
