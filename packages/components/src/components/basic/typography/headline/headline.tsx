import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { BreakpointCustomizable, insertSlottedStyles, prefix } from '../../../../utils';
import { HeadlineVariant, TextSize, Theme } from '../../../../types';

@Component({
  tag: 'p-headline',
  styleUrl: 'headline.scss',
  shadow: true,
})
export class Headline {
  @Element() public host!: HTMLElement;

  /** Predefined style of the headline. */
  @Prop() public variant?: HeadlineVariant = 'headline-1';

  /** Custom size of the headline. */
  @Prop() public size?: BreakpointCustomizable<TextSize>;

  /** Sets a custom HTML tag depending of the usage of the headline component. */
  @Prop() public tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** Text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: 'default' | 'inherit' = 'default';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public componentWillLoad(): void {
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    const TagType = this.getTagType;

    const headlineClasses = {
      [prefix('headline')]: true,
      [prefix(`headline--variant-${this.variant}`)]: !this.size,
      [prefix(`headline--align-${this.align}`)]: true,
      [prefix(`headline--color-${this.color}`)]: true,
      [prefix('headline--ellipsis')]: this.ellipsis,
      [prefix(`headline--theme-${this.theme}`)]: this.color !== 'inherit',
    };

    return (
      <TagType class={headlineClasses}>
        {this.size ? (
          <p-text size={this.size} weight="semibold" color="inherit" tag="span">
            <slot />
          </p-text>
        ) : (
          <slot />
        )}
      </TagType>
    );
  }

  private get getTagType(): string {
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
    } else if (this.size) {
      return this.tag ? this.tag : 'h1';
    } else {
      return this.tag ? this.tag : variantToTagMap[this.variant];
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
