import { JSX, Component, Prop, h, Host, Element, Watch } from '@stencil/core';
import {
  attachSlottedCss,
  getClosestHTMLElement,
  getPrefixedTagNames,
  getThemeDarkAttribute,
  isDark,
  updateChildren,
} from '../../../../utils';
import type { Theme } from '../../../../types';
import type { ListType, OrderType } from './text-list-utils';
import { getSlottedCss } from './text-list-styles';

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

  @Watch('listType')
  public handleListTypeChange(): void {
    updateChildren(this.host);
  }

  @Watch('orderType')
  public handleOrderTypeChange(): void {
    updateChildren(this.host);
  }

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public render(): JSX.Element {
    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const isNestedList = !!getClosestHTMLElement(this.host, PrefixedTagNames.pTextListItem);

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
    };

    return (
      <Host nested={isNestedList} {...getThemeDarkAttribute(this.theme)}>
        <TagType role="list" class={rootClasses}>
          <slot />
        </TagType>
      </Host>
    );
  }
}
