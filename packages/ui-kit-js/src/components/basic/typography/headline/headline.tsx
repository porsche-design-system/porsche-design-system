import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../../utils/prefix';

@Component({
  tag: 'p-headline',
  styleUrl: 'headline.scss',
  shadow: true
})
export class Headline {

  /** Set a custom HTML tag depending of the usage of the text component. */
  @Prop() public tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

  /** The style of the text. */
  @Prop() public type?:
    | 'large-title'
    | 'headline-1'
    | 'headline-2'
    | 'headline-3'
    | 'headline-4'
    | 'headline-5'
    | 'headline-6' = 'headline-1';

  /** The text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Basic text color variations. */
  @Prop() public color?: 'inherit' | 'porsche-black' | 'porsche-light' = 'porsche-black';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Wraps the text, even when it has to break a word. */
  @Prop() public wrap?: boolean = false;

  public render(): JSX.Element {
    const TagType = this.tag;

    const headlineClasses = cx(
      prefix('headline'),
      prefix(`headline--type-${this.type}`),
      prefix(`headline--align-${this.align}`),
      prefix(`headline--color-${this.color}`),
      this.ellipsis && prefix('headline--ellipsis'),
      this.wrap && prefix('headline--wrap')
    );

    return (
      <TagType class={headlineClasses}>
        <slot />
      </TagType>
    );
  }
}
