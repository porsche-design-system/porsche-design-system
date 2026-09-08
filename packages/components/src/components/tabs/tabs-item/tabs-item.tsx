import { Component, Element, h, type JSX, Prop, Watch } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  throwIfParentIsNotOfKind,
  updateParent,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './tabs-item-styles';

const propTypes: PropTypes<typeof TabsItem> = {
  label: AllowedTypes.string,
};

/**
 * @slot {"name": "", "description": "Default slot for the tab content." }
 */
@Component({
  tag: 'p-tabs-item',
  shadow: true,
})
export class TabsItem {
  @Element() public host!: HTMLElement;

  /** Sets the label text displayed in the tab navigation button that the user clicks to activate this tab's content. */
  @Prop() public label: string;

  @Watch('label')
  public handleLabelChange(): void {
    updateParent(this.host);
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-tabs');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    return <slot />;
  }
}
