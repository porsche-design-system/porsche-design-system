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
  getPrefixedTagNames,
  hasDescription,
  hasLabel,
  hasMessage,
  hasPropValueChanged,
  observeChildren,
  setAriaIDREF,
  unobserveChildren,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { messageId, StateMessage } from '../../common/state-message/state-message';
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
import { descriptionId, labelId } from '../../common/label/label-utils';
import { getFieldsetAriaAttributes } from '../../fieldset/fieldset-utils';

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
  noWrap: AllowedTypes.boolean,
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "", "description": "Default slot for the `p-segmented-control-item` tags." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 *
 * @controlled { "props": ["value"], "event": "change", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-segmented-control',
  shadow: true,
  formAssociated: true,
})
export class SegmentedControl {
  @Element() public host!: HTMLElement;

  /** Sets the visible label text displayed above the segmented control to describe the group of options. */
  @Prop() public label?: string = '';

  /** Sets a supplementary description displayed below the label to give users additional context about the segmented control. */
  @Prop() public description?: string = '';

  /** Sets the currently selected item's value and pre-selects the matching option when the component renders. */
  @Prop({ mutable: true }) public value?: string | number;

  /** Sets the name of the control submitted with the form data to identify the selected value on the server. */
  @Prop({ reflect: true }) public name?: string;

  /** Reduces the item height and spacing for use in dense layouts where vertical space is limited. */
  @Prop() public compact?: boolean = false;

  /** Sets the validation state of the segmented control, controlling its visual appearance and feedback message style (`none`, `success`, `error`). */
  @Prop() public state?: SegmentedControlState = 'none';

  /** Marks the segmented control as required so the form cannot be submitted until one option is selected. */
  @Prop() public required?: boolean = false;

  /** Sets the validation feedback message displayed below the segmented control when `state` is `success` or `error`. */
  @Prop() public message?: string = '';

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Sets the number of equal-width columns for the item layout. Use `auto` to distribute items based on their content width. Supports responsive breakpoint values. */
  @Prop() public columns?: BreakpointCustomizable<SegmentedControlColumns> = 'auto';

  /** Associates the segmented control with a form element by its ID when it is not a direct descendant of that form. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** Prevents user interaction with all items in the segmented control and excludes the value from form submissions. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** Prevents items from wrapping to new rows and renders them in a single horizontally scrollable row instead. */
  @Prop() public noWrap?: boolean = false;

  /** Emitted when the segmented control loses focus, useful for triggering validation on blur. */
  @Event({ bubbles: false }) public blur: EventEmitter<void>;

  /** Emitted when the user selects a different item, carrying the new value in the event detail. */
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

    const itemWidths = this.noWrap ? undefined : getItemWidths(this.host, this.compact);
    const PrefixedTagNames = !this.noWrap ? undefined : getPrefixedTagNames(this.host);

    attachComponentCss(
      this.host,
      getComponentCss,
      itemWidths?.minWidth,
      itemWidths?.maxWidth,
      this.columns,
      this.disabled,
      this.hideLabel,
      this.state,
      this.noWrap
    );
    syncSegmentedControlItemsProps(this.host, this.value, this.disabled, this.state, this.message, this.compact);

    const fieldDescriptionId = hasDescription(this.host, this.description) ? descriptionId : undefined;
    const fieldMessageId = hasMessage(this.host, this.message, this.state) ? messageId : undefined;

    return (
      <fieldset
        class="root"
        disabled={this.disabled}
        {...getFieldsetAriaAttributes(this.required, this.state === 'error')}
        aria-labelledby={hasLabel(this.host, this.label) ? labelId : null}
        aria-describedby={setAriaIDREF(fieldMessageId, fieldDescriptionId)}
      >
        <Label
          host={this.host}
          tag="div"
          label={this.label}
          description={this.description}
          isRequired={this.required}
          isDisabled={this.disabled}
        />
        {this.noWrap ? (
          <PrefixedTagNames.pScroller class="scroller">
            <slot />
          </PrefixedTagNames.pScroller>
        ) : (
          <slot />
        )}
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
