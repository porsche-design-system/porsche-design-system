import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../../utils';
import { Theme } from '../../../../types';

@Component({
  tag: 'p-headline',
  styleUrl: 'headline.scss',
  shadow: true
})
export class Headline {

  /** Sets a custom HTML tag depending of the usage of the headline component. */
  @Prop() public tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

  /** Style of the text. */
  @Prop() public variant?:
    | 'large-title'
    | 'headline-1'
    | 'headline-2'
    | 'headline-3'
    | 'headline-4'
    | 'headline-5'
    | 'headline-6' = 'headline-1';

  /** Text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: 'default' | 'inherit' = 'default';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    const TagType = this.tag;

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
