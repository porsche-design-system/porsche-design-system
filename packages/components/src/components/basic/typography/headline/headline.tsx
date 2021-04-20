import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames, getTagName, insertSlottedStyles, isDark } from '../../../../utils';
import type { TextAlign, TextColor, Theme } from '../../../../types';
import type { HeadlineTag, HeadlineVariant } from './headline-utils';
import { getHeadlineTagName, isVariantType } from './headline-utils';

@Component({
  tag: 'p-headline',
  styleUrl: 'headline.scss',
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
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    const TagName = getHeadlineTagName(this.host, this.variant, this.tag);
    const isHeadlineVariantType = isVariantType(this.variant);

    const headlineClasses = {
      ['headline']: true,
      [`headline--variant-${this.variant}`]: isHeadlineVariantType || this.variant === 'inherit',
      [`headline--align-${this.align}`]: this.align !== 'left',
      [`headline--color-${this.color}`]: this.color !== 'default',
      ['headline--ellipsis']: this.ellipsis,
      ['headline--theme-dark']: isDark(this.theme) && this.color !== 'inherit',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <TagName class={headlineClasses}>
        {!isHeadlineVariantType ? (
          <PrefixedTagNames.pText size={this.variant} weight="semibold" color="inherit" tag="span">
            <slot />
          </PrefixedTagNames.pText>
        ) : (
          <slot />
        )}
      </TagName>
    );
  }

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `${tagName} a {
      color: inherit !important;
      text-decoration: none !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
