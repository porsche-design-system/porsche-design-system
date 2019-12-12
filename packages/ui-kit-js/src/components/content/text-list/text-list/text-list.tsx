import {JSX, Component, Prop, h, Host} from '@stencil/core';
import cx from 'classnames';
import {prefix} from '../../../../utils';
import { Theme } from '../../../../types';

@Component({
  tag: 'p-text-list',
  styleUrl: 'text-list.scss'
})
export class TextList {
  /** The type of the text list. */
  @Prop() public listType?: 'unordered' | 'ordered' = 'unordered';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: 'default' | 'neutral-1' | 'neutral-2' | 'neutral-3' | 'inherit' = 'default';

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {

    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';

    const hostClasses = cx(
      prefix('text-list')
    );

    const textListClasses = cx(
      prefix('text-list'),
      prefix(`text-list--color-${this.color}`),
      this.listType === 'ordered' && prefix('text-list--ordered'),
      this.color !== 'inherit' && prefix(`text-list--theme-${this.theme}`)
    );

    return (
      <Host class={hostClasses}>
        <TagType class={textListClasses}>
          <slot/>
        </TagType>
      </Host>
    );
  }
}
