import {JSX, Component, Prop, h, Host} from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../../utils';
import { Theme } from '../../../../types';

@Component({
  tag: 'p-text-list',
  styleUrl: 'text-list.scss'
})
export class TextList {

  /** The type of the text list. */
  @Prop() public listType?: 'unordered' | 'ordered' = 'unordered';

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {

    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';

    const hostClasses = cx(
      prefix('text-list')
    );

    const textListClasses = cx(
      prefix('text-list'),
      prefix(`text-list--theme-${this.theme}`),
      this.listType === 'ordered' && prefix('text-list--ordered')
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
