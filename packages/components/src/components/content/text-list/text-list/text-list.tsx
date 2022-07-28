import { Component, Element, h, Host, JSX, Prop, Watch } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getClosestHTMLElement,
  getDataThemeDarkAttribute,
  getPrefixedTagNames,
  THEMES,
  updateChildren,
  validateProps,
} from '../../../../utils';
import { PropTypes, Theme } from '../../../../utils';
import type { ListType, OrderType } from './text-list-utils';
import { LIST_TYPES, ORDER_TYPES } from './text-list-utils';
import { getComponentCss, getSlottedCss } from './text-list-styles';

const propTypes: PropTypes<typeof TextList> = {
  listType: AllowedTypes.oneOf<ListType>(LIST_TYPES),
  orderType: AllowedTypes.oneOf<OrderType>(ORDER_TYPES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

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
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);
  }

  public render(): JSX.Element {
    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const isNestedList = !!getClosestHTMLElement(this.host, PrefixedTagNames.pTextListItem);

    return (
      <Host nested={isNestedList} {...getDataThemeDarkAttribute(this.theme)}>
        <TagType role="list">
          <slot />
        </TagType>
      </Host>
    );
  }
}
