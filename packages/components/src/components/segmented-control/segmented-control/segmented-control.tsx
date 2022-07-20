import { Component, Element, Event, EventEmitter, forceUpdate, h, Host, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  observeChildren,
  throwIfChildrenAreNotOfKind,
  unobserveChildren,
  validateProps,
} from '../../../utils';
import type { PropTypes, ValidatorFunction } from '../../../utils';
import { getComponentCss } from './segmented-control-styles';
import type { Theme } from '../../../types';
import { THEMES } from '../../../types';
import type { SegmentedControlBackgroundColor, SegmentedControlChangeEvent } from './segmented-control-utils';
import { getItemMaxWidth, SEGMENTED_CONTROL_BACKGROUND_COLORS, syncItemsProps } from './segmented-control-utils';
import { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import { getClickedItem } from '../../../utils/dom/getClickedItem';

const propTypes: PropTypes<typeof SegmentedControl> = {
  backgroundColor: AllowedTypes.oneOf<SegmentedControlBackgroundColor>(SEGMENTED_CONTROL_BACKGROUND_COLORS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number]),
};

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
    throwIfChildrenAreNotOfKind(this.host, 'pSegmentedControlItem');

    // child property changes to label or icon are detected via prop watchers within child
    // here we take care of dom changes like adding/removing a child or changing its content
    observeChildren(this.host, () => {
      throwIfChildrenAreNotOfKind(this.host, 'pSegmentedControlItem');
      forceUpdate(this.host);
    });
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, getItemMaxWidth(this.host));
    syncItemsProps(this.host, this.value, this.backgroundColor, this.theme);
  }

  public componentDidLoad(): void {
    this.host.addEventListener('click', (e) =>
      this.updateValue(getClickedItem(this.host, 'pSegmentedControlItem', e.composedPath()))
    );
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    return (
      <Host role="group">
        <slot />
      </Host>
    );
  }

  private updateValue = (item: HTMLElement & SegmentedControlItem): void => {
    if (item) {
      this.value = item.value; // causes rerender
      this.segmentedControlChange.emit({ value: this.value });
      item.focus();
    }
  };
}
