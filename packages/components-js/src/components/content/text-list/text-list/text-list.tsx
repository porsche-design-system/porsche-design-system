import { JSX, Component, Prop, h, Host, Element } from '@stencil/core';
import cx from 'classnames';
import { getPrefixedTagNames, prefix } from '../../../../utils';
import { Theme } from '../../../../types';

@Component({
  tag: 'p-text-list',
  styleUrl: 'text-list.scss',
  shadow: true
})
export class TextList {

  @Element() public host!: HTMLElement;

  /** The type of the text list. */
  @Prop({reflect: true}) public listType?: 'unordered' | 'ordered' = 'unordered';

  /** The list style type of an ordered list. */
  @Prop({reflect: true}) public orderType?: 'numbered' | 'alphabetically' = 'numbered';

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {

    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';

    const textListClasses = cx(
      prefix('text-list'),
      prefix( `text-list--${this.listType}`),
      prefix(`text-list--theme-${this.theme}`),
      this.isNestedList && prefix('text-list--nested')
    );

    return (
      <Host nested={this.isNestedList}>
        <TagType role='list' class={textListClasses}>
          <slot/>
        </TagType>
      </Host>
    );
  }

  private get isNestedList():boolean {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-text-list-item']);
    return !!this.host.closest(PrefixedTagNames.pTextListItem);
  }
}
