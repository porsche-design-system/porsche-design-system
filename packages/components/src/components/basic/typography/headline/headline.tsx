import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { BreakpointCustomizable, getPrefixedTagNames, insertSlottedStyles, prefix } from '../../../../utils';
import { TextAlign, TextColor, Theme, TextSize } from '../../../../types';
import { HeadlineVariant, getTagName, isHeadlineVariant } from './headlineUtils';

// We cannot include HeadlineVariant into generic. Those are ready to use variants with defined breakpoints.
export type VariantType = HeadlineVariant | BreakpointCustomizable<TextSize>;

@Component({
  tag: 'p-headline',
  styleUrl: 'headline.scss',
  shadow: true,
})
export class Headline {
  @Element() public host!: HTMLElement;

  /** Predefined style of the headline. */
  @Prop() public variant?: VariantType = 'headline-1';

  /** Sets a custom HTML tag depending of the usage of the headline component. */
  @Prop() public tag?: HeadlineTags;

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
    const TagName = getTagName(this.host, this.variant, this.tag);

    const headlineClasses = {
      [prefix('headline')]: true,
      [prefix(`headline--variant-${this.variant}`)]: isHeadlineVariant(this.variant),
      [prefix(`headline--align-${this.align}`)]: true,
      [prefix(`headline--color-${this.color}`)]: true,
      [prefix('headline--ellipsis')]: this.ellipsis,
      [prefix(`headline--theme-${this.theme}`)]: this.color !== 'inherit',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-text']);

    return (
      <TagName class={headlineClasses}>
        {!isHeadlineVariant(this.variant) ? (
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
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      color: inherit !important;
      text-decoration: none !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
