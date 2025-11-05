import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import { AllowedTypes, attachComponentCss, validateProps } from '../../../utils';
import { getComponentCss } from './text-list-styles';
import { isListTypeOrdered, TEXT_LIST_TYPES, type TextListType } from './text-list-utils';

const propTypes: PropTypes<typeof TextList> = {
  type: AllowedTypes.oneOf<TextListType>(TEXT_LIST_TYPES),
};

/**
 * @slot {"name": "", "description": "Default slot for the `p-text-list-item` tags or nested `p-text-list` tags." }
 */
@Component({
  tag: 'p-text-list',
  shadow: true,
})
export class TextList {
  @Element() public host!: HTMLElement;

  /** The list style type. */
  @Prop() public type?: TextListType = 'unordered';

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.type);

    const TagType = isListTypeOrdered(this.type) ? 'ol' : 'ul';

    return (
      <TagType>
        <slot />
      </TagType>
    );
  }
}
