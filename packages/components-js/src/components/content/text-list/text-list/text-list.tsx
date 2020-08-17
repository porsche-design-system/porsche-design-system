import { JSX, Component, Prop, h, Host, Element } from '@stencil/core';
import { prefix } from '../../../../utils';
import { Theme } from '../../../../types';

@Component({
  tag: 'p-text-list',
  styleUrl: 'text-list.scss',
  shadow: true
})
export class TextList {
  @Element() public host!: HTMLElement;

  /** The type of the text list. */
  @Prop({ reflect: true }) public listType?: 'unordered' | 'ordered' = 'unordered';

  /** The list style type of an ordered list. */
  @Prop({ reflect: true }) public orderType?: 'numbered' | 'alphabetically' = 'numbered';

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';

    const textListClasses = {
      [prefix('text-list')]: true,
      [prefix(`text-list--${this.listType}`)]: true,
      [prefix(`text-list--theme-${this.theme}`)]: true,
      [prefix('text-list--nested')]: this.isNestedList
    };

    return (
      <Host nested={this.isNestedList}>
        <TagType role="list" class={textListClasses}>
          <slot />
        </TagType>
      </Host>
    );
  }

  private get isNestedList(): boolean {
    return !!this.host.closest(prefix('text-list-item'));
  }
}
