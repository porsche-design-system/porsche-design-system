import {JSX, Component, Prop, h, Host} from '@stencil/core';
import cx from 'classnames';
import {prefix} from '../../../../utils';
import {Components} from '../../../../components';

@Component({
  tag: 'p-text-list',
  styleUrl: 'text-list.scss'
})
export class TextList {
  /** The type of the text list. */
  @Prop() public listType?: 'unordered' | 'ordered' = 'unordered';

  /** Basic text list color variations. */
  @Prop() public color?: Components.PText['color'] = 'porsche-black';

  public render(): JSX.Element {

    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';

    const hostClasses = cx(
      prefix('text-list')
    );

    const textListClasses = cx(
      prefix('text-list'),
      prefix(`text-list--color-${this.color}`),
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
