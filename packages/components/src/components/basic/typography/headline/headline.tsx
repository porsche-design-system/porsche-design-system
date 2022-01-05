import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames, getThemeDarkAttribute, attachSlottedCss, attachComponentCss } from '../../../../utils';
import type { TextAlign, TextColor, Theme } from '../../../../types';
import type { HeadlineTag, HeadlineVariant } from './headline-utils';
import { getHeadlineTagName, isVariantType } from './headline-utils';
import { getComponentCss, getSlottedCss } from './headline-styles';

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

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.variant, this.ellipsis, this.theme, this.align, this.color);
  }

  public render(): JSX.Element {
    const TagName = getHeadlineTagName(this.host, this.variant, this.tag);
    const isHeadlineVariantType = isVariantType(this.variant);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host {...getThemeDarkAttribute(this.theme)}>
        <TagName class="root">
          {!isHeadlineVariantType ? (
            <PrefixedTagNames.pText
              size={this.variant}
              align={this.align}
              ellipsis={this.ellipsis}
              weight="semibold"
              color="inherit"
              tag="span"
            >
              <slot />
            </PrefixedTagNames.pText>
          ) : (
            <slot />
          )}
        </TagName>
      </Host>
    );
  }
}
