import type { PropTypes } from '../../../types';
import type { TabsItemInternalHTMLProps } from './tabs-item-utils';
import { Component, Element, h, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../utils';
import { getComponentCss } from './tabs-item-styles';

const propTypes: PropTypes<typeof TabsItem> = {
  label: AllowedTypes.string,
};

@Component({
  tag: 'p-tabs-item',
  shadow: true,
})
export class TabsItem {
  @Element() public host!: HTMLElement & TabsItemInternalHTMLProps;

  /** Defines the label used in tabs. */
  @Prop() public label: string;

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
