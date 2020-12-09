import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { BreakpointCustomizable, insertSlottedStyles, prefix } from '../../../../utils';
import { TextSize, TextAlign, TextColor, Theme } from '../../../../types';

// We cannot include HeadlineVariant into generic. Those are ready to use variants with defined breakpoints.
export type VariantType = HeadlineVariant | BreakpointCustomizable<TextSize>;

const HEADLINE_VARIANTS = [
  'large-title',
  'headline-1',
  'headline-2',
  'headline-3',
  'headline-4',
  'headline-5',
] as const;

export type HeadlineVariant = typeof HEADLINE_VARIANTS[number];

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
  @Prop() public tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

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
    const TagName = this.tagName;

    const headlineClasses = {
      [prefix('headline')]: true,
      [prefix(`headline--variant-${this.variant}`)]: this.isHeadlineVariant,
      [prefix(`headline--align-${this.align}`)]: true,
      [prefix(`headline--color-${this.color}`)]: true,
      [prefix('headline--ellipsis')]: this.ellipsis,
      [prefix(`headline--theme-${this.theme}`)]: this.color !== 'inherit',
    };

    return (
      <TagName class={headlineClasses}>
        {!this.isHeadlineVariant ? (
          <p-text size={this.variant} weight="semibold" color="inherit" tag="span">
            <slot />
          </p-text>
        ) : (
          <slot />
        )}
      </TagName>
    );
  }

  private get isHeadlineVariant(): boolean {
    return HEADLINE_VARIANTS.includes(this.variant as HeadlineVariant);
  }

  private get tagName(): string {
    const variantToTagMap: { [key in HeadlineVariant]: string } = {
      'large-title': 'h1',
      'headline-1': 'h1',
      'headline-2': 'h2',
      'headline-3': 'h3',
      'headline-4': 'h4',
      'headline-5': 'h5',
    };

    if (this.hasSlottedHeadlineTag) {
      return 'div';
    } else if (this.tag) {
      return this.tag;
    } else if (!this.isHeadlineVariant) {
      return 'h1';
    } else {
      return variantToTagMap[this.variant as HeadlineVariant];
    }
  }

  private get hasSlottedHeadlineTag(): boolean {
    const el = this.host.querySelector(':first-child');
    return el?.matches('h1, h2, h3, h4, h5, h6');
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
