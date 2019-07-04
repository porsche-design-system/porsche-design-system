import { JSX, Component, Prop, Host, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../../utils/prefix';
import { Components } from '../../../../index';

@Component({
  tag: 'p-text-list',
  styleUrl: 'text-list.scss'
})
export class TextList {
  /** The type of the list. */
  @Prop() public listType?: 'unordered' | 'ordered' = 'unordered';

  /** The style of the text. */
  @Prop() public textType?: Components.PText['type'] = 'copy';

  public render(): JSX.Element {
    const textListClasses = cx(prefix('text-list'), this.listType === 'ordered' && prefix('text-list--ordered'));

    return (
      <Host class={textListClasses}>
        <p-text role='list' tag='div' type={this.textType}>
          <slot />
        </p-text>
      </Host>
    );
  }
}
