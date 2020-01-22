import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  lineHeightFactor
} from '../../../../utils';
import { TextSize, TextWeight, Theme } from '../../../../types';
import { throttle } from 'throttle-debounce';

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

  /** Size of the text. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<TextSize> = 'small';

  /** The weight of the text. */
  @Prop() public weight?: TextWeight = 'regular';

  /** Text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: 'brand' | 'default' | 'neutral-1' | 'neutral-2' | 'neutral-3' | 'notification-success' | 'notification-warning' | 'notification-error' | 'inherit' = 'default';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  private textTag: HTMLElement;

  public componentDidLoad() {
    this.textTag.addEventListener('transitionend', e => {
      if (e.propertyName === 'font-size') {
        throttle(50, () => {
          this.updateLineHeight();
        })();
      }
    });

    throttle(50, () => {
      this.updateLineHeight();
    })();
  }

  public render(): JSX.Element {
    const TagType = this.tag;

    const textClasses = cx(
      prefix('text'),
      mapBreakpointPropToPrefixedClasses('text--size', this.size),
      prefix(`text--weight-${this.weight}`),
      prefix(`text--align-${this.align}`),
      prefix(`text--color-${this.color}`),
      this.ellipsis && prefix('text--ellipsis'),
      this.color !== 'inherit' && prefix(`text--theme-${this.theme}`)
    );

    return (
      <TagType class={textClasses} ref={el => this.textTag = el as HTMLElement}>
        <slot />
      </TagType>
    );
  }

  private updateLineHeight() {
    const fontSize = parseInt(window.getComputedStyle(this.textTag).fontSize, 10);
    console.log(fontSize);
    const lineHeightFactorValue = lineHeightFactor(fontSize);
    this.textTag.style.lineHeight = `${lineHeightFactorValue}`;
  }
}
