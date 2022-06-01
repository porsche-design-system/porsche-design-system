import { Component, Element, h, JSX, Prop, forceUpdate, Event, EventEmitter } from '@stencil/core';
import { attachComponentCss, observeChildren, unobserveChildren } from '../../../utils';
import { getComponentCss } from './segmented-control-styles';
import type { Theme } from '../../../types';
import type { SegmentedControlBackgroundColor, SegmentedControlChangeEvent } from './segmented-control-utils';
import { getItemMaxWidth, isEventTargetSegmentedControlItem, syncItemsProps } from './segmented-control-utils';
import { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';

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

  /** Sets the initial value of the segmented-control. */
  @Prop() public value?: string | number;

  /** Emitted when selected element changes. */
  @Event({ bubbles: false }) public segmentedControlChange: EventEmitter<SegmentedControlChangeEvent>;

  public connectedCallback(): void {
    // child property changes to label or icon are detected via prop watchers within child
    // here we take care of dom changes like adding/removing a child or changing its content
    observeChildren(this.host, () => forceUpdate(this.host));
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, getItemMaxWidth(this.host));
    syncItemsProps(this.host, this.value, this.backgroundColor, this.theme);
  }

  public componentDidLoad(): void {
    this.host.addEventListener('click', ({ target }: MouseEvent & { target: HTMLElement & SegmentedControlItem }) => {
      if (isEventTargetSegmentedControlItem(this.host, target)) {
        this.value = target.value; // causes rerender
        this.segmentedControlChange.emit({ value: this.value });
      }
    });
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
