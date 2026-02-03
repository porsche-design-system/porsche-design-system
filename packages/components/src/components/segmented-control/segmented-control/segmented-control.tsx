import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  forceUpdate,
  h,
  type JSX,
  Listen,
  Prop,
  Watch,
} from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, ValidatorFunction } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  hasPropValueChanged,
  observeChildren,
  unobserveChildren,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { StateMessage } from '../../common/state-message/state-message';
import type { SegmentedControlItem } from '../segmented-control-item/segmented-control-item';
import { getComponentCss } from './segmented-control-styles';
import {
  getItemWidths,
  SEGMENTED_CONTROL_COLUMNS,
  type SegmentedControlChangeEventDetail,
  type SegmentedControlColumns,
  type SegmentedControlState,
  syncSegmentedControlItemsProps,
} from './segmented-control-utils';

const propTypes: PropTypes<typeof SegmentedControl> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number]),
  columns: AllowedTypes.breakpoint<SegmentedControlColumns>(SEGMENTED_CONTROL_COLUMNS),
  name: AllowedTypes.string,
  form: AllowedTypes.string,
  compact: AllowedTypes.boolean,
  required: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  state: AllowedTypes.oneOf<SegmentedControlState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
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

  /** Text content for a user-facing label. */
  @Prop() public label?: string = '';

  /** Supplementary text providing more context or explanation for the segmented-control. */
  @Prop() public description?: string = '';

  /** Sets the initial value of the segmented-control. */
  @Prop({ mutable: true }) public value?: string | number;

  /** The name of the segmented-control. */
  @Prop({ reflect: true }) public name?: string;

  /** A boolean value that, if present, renders the segmented-control as a compact version. */
  @Prop() public compact?: boolean = false;

  /** Indicates the validation or overall status of the component. */
  @Prop() public state?: SegmentedControlState = 'none';

  /** A boolean value that specifies a selection must be made from the group before the form can be submitted. */
  @Prop() public required?: boolean = false;

  /** Dynamic feedback text for validation or status. */
  @Prop() public message?: string = '';

  /** Controls the visibility of the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Sets the amount of columns. */
  @Prop() public columns?: BreakpointCustomizable<SegmentedControlColumns> = 'auto';

  /** The id of a form element the segmented-control should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Disables the segmented-control. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Emitted when the segmented-control has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<void>;

  /** Emitted when the selection is changed. */
  @Event({ bubbles: true }) public change: EventEmitter<SegmentedControlChangeEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private defaultValue: string | number;

  @Listen('internalSegmentedControlItemUpdate')
  public updateSegmentedControlItemHandler(e: Event & { target: HTMLElement & SegmentedControlItem }): void {
    e.stopPropagation();
    if (!this.disabled) {
      this.updateValue(e.target);
    }
  }

  @Listen('internalBlur')
  public emitBlurEvent(e: CustomEvent): void {
    e.stopPropagation();
    this.blur.emit();
  }

  @Watch('value')
  public onValueChange(): void {
    this.internals?.setFormValue(this.value?.toString());
  }

  public connectedCallback(): void {
    // child property changes to label or icon are detected via prop watchers within child
    // here we take care of dom changes like adding/removing a child or changing its content
    observeChildren(this.host, () => {
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
    // Called when a parent fieldset is disabled or enabled
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    const { minWidth, maxWidth } = getItemWidths(this.host, this.compact);

    attachComponentCss(
      this.host,
      getComponentCss,
      minWidth,
      maxWidth,
      this.columns,
      this.disabled,
      this.hideLabel,
      this.state
    );
    syncSegmentedControlItemsProps(this.host, this.value, this.disabled, this.state, this.message, this.compact);

    return (
      <fieldset aria-invalid={this.state === 'error' ? 'true' : null} class="root">
        <Label
          host={this.host}
          tag="legend"
          label={this.label}
          description={this.description}
          isRequired={this.required}
          isDisabled={this.disabled}
        />
        <slot />
        <StateMessage state={this.state} message={this.message} host={this.host} />
      </fieldset>
    );
  }

  private updateValue = (item: HTMLElement & SegmentedControlItem): void => {
    this.value = item.value; // causes rerender
    this.change.emit({ value: this.value });
    item.focus();
  };
}
