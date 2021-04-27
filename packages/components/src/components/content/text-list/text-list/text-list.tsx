import { JSX, Component, Prop, h, Host, Element } from '@stencil/core';
import { getClosestHTMLElement, getPrefixedTagNames, isDark } from '../../../../utils';
import type { Theme } from '../../../../types';
import type { ListType, OrderType } from './text-list-utils';

@Component({
  tag: 'p-text-list',
  styleUrl: 'text-list.scss',
  shadow: true,
})
export class TextList {
  @Element() public host!: HTMLElement;

  /** The type of the text list. */
  @Prop() public listType?: ListType = 'unordered';

  /** The list style type of an ordered list. */
  @Prop() public orderType?: OrderType = 'numbered';

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const isNestedList = !!getClosestHTMLElement(this.host, PrefixedTagNames.pTextListItem);

    const textListClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
    };

    return (
      <Host nested={isNestedList}>
        <TagType role="list" class={textListClasses}>
          <slot />
        </TagType>
      </Host>
    );
  }
}
