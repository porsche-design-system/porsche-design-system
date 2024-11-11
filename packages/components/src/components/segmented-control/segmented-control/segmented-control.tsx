import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  forceUpdate,
  h,
  Host,
  type JSX,
  Prop,
} from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  observeChildren,
  THEMES,
  throwIfChildrenAreNotOfKind,
  unobserveChildren,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../../utils';
import type { PropTypes, Theme, ValidatorFunction, BreakpointCustomizable } from '../../../types';
import { getComponentCss } from './segmented-control-styles';
import {
  type SegmentedControlBackgroundColor,
  type SegmentedControlColumns,
  type SegmentedControlUpdateEventDetail,
  getItemMaxWidth,
  SEGMENTED_CONTROL_BACKGROUND_COLORS,
  SEGMENTED_CONTROL_COLUMNS,
  syncSegmentedControlItemsProps,
} from './segmented-control-utils';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import { getClickedItem } from '../../../utils/dom/getClickedItem';

const propTypes: PropTypes<typeof SegmentedControl> = {
  backgroundColor: AllowedTypes.oneOf<SegmentedControlBackgroundColor>([
    undefined,
    ...SEGMENTED_CONTROL_BACKGROUND_COLORS,
  ]),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number]),
  columns: AllowedTypes.breakpoint<SegmentedControlColumns>(SEGMENTED_CONTROL_COLUMNS),
  name: AllowedTypes.string,
  form: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the `p-segmented-control-item` tags." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-segmented-control',
  shadow: true,
  formAssociated: true,
})
export class SegmentedControl {
  @Element() public host!: HTMLElement;

  /**
   * @deprecated since v3.0.0, will be removed with next major release.
   * Background color variations */
  @Prop() public backgroundColor?: SegmentedControlBackgroundColor;

  /** Adapts the segmented-control color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Sets the initial value of the segmented-control. */
  @Prop({ mutable: true }) public value?: string | number;

  /** The name of the segmented-control. */
  @Prop({ reflect: true }) public name: string;

  /** Sets the amount of columns. */
  @Prop() public columns?: BreakpointCustomizable<SegmentedControlColumns> = 'auto';

  /** The id of a form element the segmented-control should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Disables the segmented-control. */
  @Prop() public disabled?: boolean = false;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when selected element changes. */
  @Event({ bubbles: false }) public segmentedControlChange: EventEmitter<SegmentedControlUpdateEventDetail>;

  /** Emitted when selected element changes. */
  @Event({ bubbles: false }) public update: EventEmitter<SegmentedControlUpdateEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string | number;

  public connectedCallback(): void {
    throwIfChildrenAreNotOfKind(this.host, 'p-segmented-control-item');

    // child property changes to label or icon are detected via prop watchers within child
    // here we take care of dom changes like adding/removing a child or changing its content
    observeChildren(this.host, () => {
      throwIfChildrenAreNotOfKind(this.host, 'p-segmented-control-item');
      forceUpdate(this.host);
    });
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
    this.updateSegmentedControlItemDisabledState();
  }

  public updateSegmentedControlItemDisabledState(): void {
    if (this.disabled) {
      Array.from(this.host.children).forEach((child) => {
        (child as unknown as SegmentedControlItem).disabled = true;
      });
    }
  }

  public componentDidLoad(): void {
    this.internals.setFormValue(this.value.toString());
    this.host.addEventListener('click', (e) => {
      const item: HTMLElement & SegmentedControlItem = getClickedItem(
        this.host,
        'p-segmented-control-item',
        e.composedPath()
      );
      this.internals.setFormValue(item.value.toString());
      this.updateValue(item);
    });
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public formResetCallback(): void {
    this.internals.setFormValue(this.defaultValue.toString());
    this.value = this.defaultValue;
  }

  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
    this.updateSegmentedControlItemDisabledState();
  }

  public formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof SegmentedControl>(this, 'backgroundColor');

    attachComponentCss(this.host, getComponentCss, getItemMaxWidth(this.host), this.columns);
    syncSegmentedControlItemsProps(this.host, this.value, this.theme);

    return (
      <Host role="group">
        <slot />
      </Host>
    );
  }

  private updateValue = (item: HTMLElement & SegmentedControlItem): void => {
    if (item) {
      this.value = item.value; // causes rerender
      this.update.emit({ value: this.value });
      this.segmentedControlChange.emit({ value: this.value });
      item.focus();
    }
  };
}
