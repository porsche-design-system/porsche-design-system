import { JSX, Component, Prop, h, Element } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../../utils';
import { Theme } from '../../../../types';
import { insertSlottedStyles } from '../../../../utils/slotted-styles';

@Component({
  tag: 'p-headline',
  styleUrl: 'headline.scss',
  shadow: true
})
export class Headline {

  @Element() public element!: HTMLElement;

  /** Style of the text. */
  @Prop() public variant?:
  | 'large-title'
  | 'headline-1'
  | 'headline-2'
  | 'headline-3'
  | 'headline-4'
  | 'headline-5' = 'headline-1';

  /** Sets a custom HTML tag depending of the usage of the headline component. */
  @Prop() public tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = undefined;

  /** Text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: 'default' | 'inherit' = 'default';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public componentDidLoad(): void {

    const tagName= this.element.tagName.toLowerCase();
    const style = `${tagName} a {
      color: inherit;
      text-decoration: none;
    }`;

    insertSlottedStyles(this.element, style);
  }

  public render(): JSX.Element {
    const TagType = !this.tag ?
      this.variant === 'large-title' && 'h1'
      || this.variant === 'headline-1' && 'h1'
      || this.variant === 'headline-2' && 'h2'
      || this.variant === 'headline-3' && 'h3'
      || this.variant === 'headline-4' && 'h4'
      || this.variant === 'headline-5' && 'h5'
      : this.tag;

    const headlineClasses = cx(
      prefix('headline'),
      prefix(`headline--variant-${this.variant}`),
      prefix(`headline--align-${this.align}`),
      prefix(`headline--color-${this.color}`),
      this.ellipsis && prefix('headline--ellipsis'),
      this.color !== 'inherit' && prefix(`headline--theme-${this.theme}`)
    );

    return (
      <TagType class={headlineClasses}>
        <slot/>
      </TagType>
    );
  }
}
