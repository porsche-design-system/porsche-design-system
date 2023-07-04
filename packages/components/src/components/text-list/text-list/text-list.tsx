import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, THEMES, validateProps, warnIfDeprecatedPropIsUsed } from '../../../utils';
import type { PropTypes, Theme } from '../../../types';
import type { TextListListType, TextListOrderType, TextListType } from './text-list-utils';
import { isListTypeOrdered, LIST_TYPES, ORDER_TYPES, TEXT_LIST_TYPES } from './text-list-utils';
import { getComponentCss } from './text-list-styles';

const propTypes: PropTypes<typeof TextList> = {
  listType: AllowedTypes.oneOf<TextListListType>([undefined, ...LIST_TYPES]),
  orderType: AllowedTypes.oneOf<TextListOrderType>([undefined, ...ORDER_TYPES]),
  type: AllowedTypes.oneOf<TextListType>(TEXT_LIST_TYPES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-text-list',
  shadow: true,
})
export class TextList {
  @Element() public host!: HTMLElement;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `type` instead.
   * The type of the list. */
  @Prop() public listType?: TextListListType;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `type` instead.
   * The list style type of ordered list. Only has effect when list type is set to 'ordered'. */
  @Prop() public orderType?: TextListOrderType;

  /** The list style type. */
  @Prop() public type?: TextListType = 'unordered';

  /** Adapts the text color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof TextList>(this, 'listType', 'Please use type prop instead.');
    warnIfDeprecatedPropIsUsed<typeof TextList>(this, 'orderType', 'Please use type prop instead.');
    attachComponentCss(
      this.host,
      getComponentCss,
      this.listType === 'ordered' ? this.orderType || 'numbered' : this.type,
      this.theme
    );

    const TagType = isListTypeOrdered(this.listType || this.type) ? 'ol' : 'ul';

    return (
      <TagType>
        <slot />
      </TagType>
    );
  }
}
