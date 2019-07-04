import { JSX, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../../utils/prefix';

@Component({
  tag: 'p-headline',
  styleUrl: 'headline.scss',
  shadow: true
})
export class Headline {
  /** The style of the text. */
  @Prop() public type?:
    | 'large-title'
    | 'headline-1'
    | 'headline-2'
    | 'headline-3'
    | 'headline-4'
    | 'headline-5'
    | 'headline-6' = 'headline-1';

  /** Headline level/hierarchy. */
  @Prop() public level?: '1' | '2' | '3' | '4' | '5' | '6' = '1';

  /** The text alignment of the component. */
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Wraps the text, even when it has to break a word. */
  @Prop() public wrap?: boolean = false;

  /** Adapts the text color when used on dark background. */
  @Prop() public theme?: 'light' | 'dark' = 'light';

  public render(): JSX.Element {
    const TagType: any = 'h' + this.level;

    const headlineClasses = cx(
      prefix('headline'),
      this.type && prefix(`headline--${this.type}`),
      this.align !== 'left' && prefix(`headline--align-${this.align}`),
      this.ellipsis && prefix('headline--ellipsis'),
      this.wrap && prefix('headline--wrap'),
      this.theme === 'dark' && prefix('headline--theme-dark')
    );

    return (
      <TagType class={headlineClasses}>
        <slot />
      </TagType>
    );
  }
}
