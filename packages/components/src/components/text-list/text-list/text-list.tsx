import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, getDataThemeDarkAttribute, THEMES, validateProps } from '../../../utils';
import type { PropTypes, Theme } from '../../../types';
import type { ListType, OrderType } from './text-list-utils';
import { isListTypeOrdered, LIST_TYPES, ORDER_TYPES } from './text-list-utils';
import { getComponentCss } from './text-list-styles';

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

  /** The type of the list. */
  @Prop() public listType?: ListType = 'unordered';

  /** The list style type of ordered list. Only has effect when list type is set to 'ordered'. */
  @Prop() public orderType?: OrderType = 'numbered';

  /** Adapts the text color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.listType, this.orderType, this.theme);

    const TagType = isListTypeOrdered(this.listType) ? 'ol' : 'ul';

    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <TagType>
          <slot />
        </TagType>
      </Host>
    );
  }
}
