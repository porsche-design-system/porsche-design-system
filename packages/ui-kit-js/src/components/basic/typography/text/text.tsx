import {JSX, Component, Prop, h} from '@stencil/core';
import cx from 'classnames';
import {prefix} from '../../../../utils/prefix';

@Component({
  tag: 'p-text',
  styleUrl: 'text.scss',
  shadow: true
})
export class Text {

  /** Sets a custom HTML tag depending of the usage of the text component. */
  @Prop() public tag?:
    | 'p'
    | 'span'
    | 'div'
    | 'label'
    | 'address'
    | 'blockquote'
    | 'figcaption'
    | 'a'
    | 'cite'
    | 'time'
    | 'sup'
    | 'sub'
    | 'ul'
    | 'ol'
    | 'li'
    | 'legend' = 'p';

  /** Style of the text. */
  @Prop() public variant?:
    | 'copy'
    | 'small'
    | '12'
    | '16'
    | '18'
    | '20'
    | '24'
    | '28'
    | '30'
    | '32'
    | '36'
    | '42'
    | '44'
    | '48'
    | '52'
    | '60'
    | '60-thin'
    | '62'
    | '62-thin'
    | '72'
    | '72-thin'
    | '84'
    | '84-thin' = 'copy';

  /** Text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Basic text color variations. */
  @Prop() public color?: 'inherit' | 'porsche-black' | 'porsche-light' = 'porsche-black';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  public render(): JSX.Element {
    const TagType = this.tag;

    const textClasses = cx(
      prefix('text'),
      prefix(`text--variant-${this.variant}`),
      prefix(`text--align-${this.align}`),
      prefix(`text--color-${this.color}`),
      this.ellipsis && prefix('text--ellipsis')
    );

    return (
      <TagType class={textClasses}>
        <slot/>
      </TagType>
    );
  }
}
