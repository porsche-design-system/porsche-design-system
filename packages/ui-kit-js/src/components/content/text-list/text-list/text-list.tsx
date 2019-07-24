import { JSX, Component, Prop, Host, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../../utils/prefix';
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
    const textListClasses = cx(prefix('text-list'), this.listType === 'ordered' && prefix('text-list--ordered'));

    return (
      <Host class={textListClasses}>
        <p-text tag={this.listType === 'unordered' ? 'ul' : 'ol'} variant='copy' color={this.color}>
          <slot />
        </p-text>
      </Host>
    );
  }
}
