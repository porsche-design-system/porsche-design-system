import {JSX, Component, Prop, h} from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../../utils';
import {TextVariant, TextColor} from '../../../../types';

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
    | 'address'
    | 'blockquote'
    | 'figcaption'
    | 'cite'
    | 'time'
    | 'legend' = 'p';

  /** Style of the text. Also defines the style for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public variant?: BreakpointCustomizable<TextVariant> = 'small';

  /** The weight of the text. */
  @Prop() public weight?: 'thin' | 'regular' | 'bold' = 'regular';

  /** Text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Basic text color variations. */
  @Prop() public color?: TextColor = 'porsche-black';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  public render(): JSX.Element {
    const TagType = this.tag;

    const textClasses = cx(
      prefix('text'),
      // prefix(`text--variant-${this.variant}`),
      mapBreakpointPropToPrefixedClasses('text--variant', this.variant),
      prefix(`text--weight-${this.weight}`),
      prefix(`text--align-${this.align}`),
      prefix(`text--color-${this.color}`),
      this.ellipsis && prefix('text--ellipsis')
    );

    return (
      <TagType class={textClasses}>
        <slot />
      </TagType>
    );
  }
}
