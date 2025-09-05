import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  forceUpdate,
  Host,
  h,
  type JSX,
  Listen,
  Prop,
  Watch,
} from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme, ValidatorFunction } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  hasPropValueChanged,
  observeChildren,
  THEMES,
  throwIfChildrenAreNotOfKind,
  unobserveChildren,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../../utils';
import { StateMessage } from '../../common/state-message/state-message';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import { getComponentCss } from './segmented-control-styles';
import {
  getItemMaxWidth,
  SEGMENTED_CONTROL_BACKGROUND_COLORS,
  SEGMENTED_CONTROL_COLUMNS,
  type SegmentedControlBackgroundColor,
  type SegmentedControlColumns,
  type SegmentedControlState,
  type SegmentedControlUpdateEventDetail,
  syncSegmentedControlItemsProps,
} from './segmented-control-utils';

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
  compact: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  state: AllowedTypes.oneOf<SegmentedControlState>(FORM_STATES),
  message: AllowedTypes.string,
};

/**
 * @slot {"name": "", "description": "Default slot for the `p-segmented-control-item` tags." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
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
  @Prop({ reflect: true }) public name?: string;

  /** A boolean value that, if present, renders the segmented-control as a compact version. */
  @Prop() public compact?: boolean = false;

  /** Indicates the validation or overall status of the component. */
  @Prop() public state?: SegmentedControlState = 'none';

  /** Dynamic feedback text for validation or status. */
  @Prop() public message?: string = '';

  /** Sets the amount of columns. */
  @Prop() public columns?: BreakpointCustomizable<SegmentedControlColumns> = 'auto';

  /** The id of a form element the segmented-control should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Disables the segmented-control. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when selected element changes. */
  @Event({ bubbles: false }) public segmentedControlChange: EventEmitter<SegmentedControlUpdateEventDetail>;

  /** Emitted when selected element changes. */
  @Event({ bubbles: false }) public update: EventEmitter<SegmentedControlUpdateEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string | number;

  @Listen('internalSegmentedControlItemUpdate')
  public updateSegmentedControlItemHandler(e: Event & { target: HTMLElement & SegmentedControlItem }): void {
    e.stopPropagation();
    if (!this.disabled) {
      this.updateValue(e.target);
    }
  }

  @Watch('value')
  public onValueChange(): void {
    this.internals?.setFormValue(this.value?.toString());
  }

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
  }

  public componentDidLoad(): void {
    this.internals?.setFormValue(this.value?.toString());
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public formResetCallback(): void {
    this.internals?.setFormValue(this.defaultValue?.toString());
    this.value = this.defaultValue;
  }

  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof SegmentedControl>(this, 'backgroundColor');

    attachComponentCss(
      this.host,
      getComponentCss,
      getItemMaxWidth(this.host, this.compact),
      this.columns,
      this.state,
      this.theme
    );
    syncSegmentedControlItemsProps(
      this.host,
      this.value,
      this.disabled,
      this.state,
      this.message,
      this.compact,
      this.theme
    );

    return (
      <Host role="group" inert={this.disabled}>
        <slot />
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </Host>
    );
  }

  private updateValue = (item: HTMLElement & SegmentedControlItem): void => {
    this.value = item.value; // causes rerender
    this.update.emit({ value: this.value });
    this.segmentedControlChange.emit({ value: this.value });
    item.focus();
  };
}
