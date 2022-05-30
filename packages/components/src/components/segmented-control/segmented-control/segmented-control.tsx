import { Component, Element, h, JSX, Prop, forceUpdate } from '@stencil/core';
import { attachComponentCss, observeChildren, unobserveChildren } from '../../../utils';
import { getComponentCss } from './segmented-control-styles';
import type { Theme } from '../../../types';
import type { SegmentedControlBackgroundColor } from './segmented-control-utils';
import { getItemMaxWidth, syncItemsProps } from './segmented-control-utils';

@Component({
  tag: 'p-segmented-control',
  shadow: true,
})
export class SegmentedControl {
  @Element() public host!: HTMLElement;

  /** Background color variations */
  @Prop() public backgroundColor?: SegmentedControlBackgroundColor = 'background-default';

  /** Adapts the segmented-control color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  public connectedCallback(): void {
    observeChildren(this.host, () => forceUpdate(this.host));
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, getItemMaxWidth(this.host));

    syncItemsProps(this.host, this.theme, this.backgroundColor);
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
