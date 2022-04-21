import { JSX, Component, Prop, h, Host, Element, Watch } from '@stencil/core';
import {
  attachComponentCss,
  attachSlottedCss,
  getClosestHTMLElement,
  getPrefixedTagNames,
  getThemeDarkAttribute,
  updateChildren,
} from '../../../../utils';
import type { Theme } from '../../../../types';
import type { ListType, OrderType } from './text-list-utils';
import { getComponentCss, getSlottedCss } from './text-list-styles';

@Component({
  tag: 'p-text-list',
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

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.theme);
  }

  public componentDidUpdate(): void {
    if (!this.theme) {
      this.theme = 'light';
    }
  }

  public render(): JSX.Element {
    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const isNestedList = !!getClosestHTMLElement(this.host, PrefixedTagNames.pTextListItem);

    return (
      <Host nested={isNestedList} {...getThemeDarkAttribute(this.theme)}>
        <TagType role="list">
          <slot />
        </TagType>
      </Host>
    );
  }
}
