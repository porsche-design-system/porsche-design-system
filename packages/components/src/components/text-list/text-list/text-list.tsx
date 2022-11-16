import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getDataThemeDarkAttribute,
  THEMES,
  validateProps,
} from '../../../utils';
import type { PropTypes, Theme } from '../../../types';
import type { ListType, OrderType } from './text-list-utils';
import { LIST_TYPES, ORDER_TYPES, syncTextListItemsProps } from './text-list-utils';
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

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';

    syncTextListItemsProps(this.host, this.listType, this.orderType);

    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <TagType role="list">
          <slot />
        </TagType>
      </Host>
    );
  }
}
