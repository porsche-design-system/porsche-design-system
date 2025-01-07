import { Component, Element, type JSX, Prop, Watch, h } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  throwIfParentIsNotOfKind,
  updateParent,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './tabs-item-styles';
import type { TabsItemInternalHTMLProps } from './tabs-item-utils';

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
  @Element() public host!: HTMLElement & TabsItemInternalHTMLProps;

  /** Defines the label used in tabs. */
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
    attachComponentCss(
      this.host,
      getComponentCss,
      this.host.theme || 'light' // default as fallback
    );

    return <slot />;
  }
}
