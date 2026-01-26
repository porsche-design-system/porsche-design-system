import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  h,
  type JSX,
  Listen,
  Prop,
  Watch,
} from '@stencil/core';
import { GROUP_DIRECTIONS } from '../../../styles/group-direction-styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasPropValueChanged,
  THEMES,
  throwIfElementIsNotOfKind,
  validateProps,
} from '../../../utils';
import { Label } from '../../common/label/label';
import { descriptionId, labelId } from '../../common/label/label-utils';
import { LoadingMessage, loadingId } from '../../common/loading-message/loading-message';
import { messageId, StateMessage } from '../../common/state-message/state-message';
import { getFieldsetAriaAttributes } from '../../fieldset/fieldset-utils';
import { getComponentCss } from './radio-group-styles';
import {
  findNextEnabledIndex,
  getActiveOptionIndex,
  getCheckedOptionIndex,
  getFirstEnabledOptionIndex,
  type RadioGroupChangeEventDetail,
  type RadioGroupDirection,
  type RadioGroupOption,
  type RadioGroupState,
  setSelectedRadioGroupOption,
  syncRadioGroupChildrenProps,
  updateRadioGroupOptions,
} from './radio-group-utils';

const propTypes: PropTypes<typeof RadioGroup> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  direction: AllowedTypes.breakpoint<RadioGroupDirection>(GROUP_DIRECTIONS),
  disabled: AllowedTypes.boolean,
  form: AllowedTypes.string,
  state: AllowedTypes.oneOf<RadioGroupState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  compact: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "label-after", "description": "Places additional content after the label text (for content that should not be part of the label, e.g. external links or `p-popover`)."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "", "description": "Default slot for the p-radio-group-option tags."}
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 */
@Component({
  tag: 'p-radio-group',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class RadioGroup {
  @Element() public host!: HTMLElement;

  /** Text content for a user-facing label. */
  @Prop() public label?: string = '';

  /** Supplementary text providing more context or explanation for the radio group. */
  @Prop() public description?: string = '';

  /** A boolean value that, if present, renders the radio group as a compact version. */
  @Prop() public compact?: boolean = false;

  /** Defines the direction of the main and cross axis. The default is 'column' showing options vertically stacked. You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: BreakpointCustomizable<RadioGroupDirection> = 'column';

  /** The name of the group of radio buttons, used when submitting the form data. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The default value for the radio-group. */
  @Prop({ mutable: true }) public value?: string = '';

  /** Specifies the id of the <form> element that the radio group belongs to (useful if the radio group is not a direct descendant of the form). */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** A boolean value that, if present, makes the radio group unusable and unclickable. The value will not be submitted with the form. */
  @Prop({ mutable: true }) public disabled?: boolean = false;

  /** A boolean value that specifies a selection must be made from the group before the form can be submitted. */
  @Prop() public required?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Indicates the validation or overall status of the radio group component. */
  @Prop() public state?: RadioGroupState = 'none';

  /** Dynamic feedback text for validation or status. */
  @Prop() public message?: string = '';

  /** Controls the visibility of the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Controls the visual appearance of the component. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the radio-group has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<void>;

  /** Emitted when the selected option is changed. */
  @Event({ bubbles: true }) public change: EventEmitter<RadioGroupChangeEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;
  private defaultValue: string;

  private radioGroupOptions: RadioGroupOption[] = [];
  private preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated

  @Listen('internalRadioGroupOptionChange')
  public updateOptionHandler(e: Event & { target: RadioGroupOption; detail: RadioGroupChangeEventDetail }): void {
    e.stopPropagation();
    const selectedOption = e.target;
    const originalEvent = e.detail;

    this.preventOptionUpdate = true; // Avoid unnecessary updating of options in the value watcher
    setSelectedRadioGroupOption(this.radioGroupOptions, selectedOption);
    this.value = selectedOption.value;
    this.change.emit(originalEvent);
  }

  @Listen('internalRadioGroupOptionBlur')
  public emitBlurEvent(e: CustomEvent): void {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.blur.emit();
  }

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals?.setFormValue(newValue);

    if (this.radioGroupOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        updateRadioGroupOptions(this.radioGroupOptions, this.value);
      }
      this.preventOptionUpdate = false;
      this.updateTabStops();
    }
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    this.defaultValue = this.value;
    this.initialLoading = this.loading;
    this.updateOptions();
    updateRadioGroupOptions(this.radioGroupOptions, this.value);
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public formResetCallback(): void {
    this.value = this.defaultValue; // triggers value watcher
  }

  public formDisabledCallback(disabled: boolean): void {
    // Called when a parent fieldset is disabled or enabled
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    this.internals?.setFormValue(this.value);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.disabled,
      this.loading,
      this.hideLabel,
      this.state,
      this.compact,
      this.direction,
      this.theme
    );
    syncRadioGroupChildrenProps(this.radioGroupOptions, this.theme, this.disabled, this.loading, this.state, this.name);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <fieldset
        class="root"
        inert={this.disabled}
        disabled={this.disabled}
        {...getFieldsetAriaAttributes(this.required, this.state === 'error', { role: 'radiogroup' })}
        aria-describedby={this.loading ? loadingId : `${descriptionId} ${messageId}`}
        aria-labelledby={labelId}
        onKeyDown={this.onKeyDown}
      >
        <Label
          host={this.host}
          tag="div"
          label={this.label}
          description={this.description}
          isRequired={this.required}
          isLoading={this.loading}
          isDisabled={this.disabled}
        />
        <div class="wrapper">
          <slot onSlotchange={this.onSlotChange} />
          {this.loading && (
            <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.theme} aria-hidden="true" />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </fieldset>
    );
  }

  private focusOption(index: number): void {
    const option = this.radioGroupOptions[index];
    if (option && !option.disabled) {
      /*
      Fix for when multiple keys (e.g., ArrowUp + ArrowDown) are pressed simultaneously,
      the focus could land on the wrong (non-selected) option. Deferring the click
      with requestAnimationFrame ensures previous blur/focus events are processed first.
      */
      requestAnimationFrame(() => option.click());
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    if (!this.radioGroupOptions.length) return;

    const currentIndex = getActiveOptionIndex(this.radioGroupOptions);
    let nextIndex = currentIndex;

    switch (key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = findNextEnabledIndex(this.radioGroupOptions, currentIndex, +1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = findNextEnabledIndex(this.radioGroupOptions, currentIndex, -1);
        break;
      default:
        return; // not a navigation key
    }

    this.focusOption(nextIndex);
    this.updateTabStops();
  };

  private updateOptions = (): void => {
    this.radioGroupOptions = [];

    for (const child of Array.from(this.host.children).filter(
      (el) => el.slot !== 'label' && el.slot !== 'label-after' && el.slot !== 'description' && el.slot !== 'message'
    )) {
      throwIfElementIsNotOfKind(this.host, child as HTMLElement, ['p-radio-group-option']);
      this.radioGroupOptions.push(child as RadioGroupOption);
    }
  };

  private onSlotChange = (): void => {
    this.updateOptions();
    updateRadioGroupOptions(this.radioGroupOptions, this.value);
    this.updateTabStops();
  };

  private updateTabStops(): void {
    if (!this.radioGroupOptions.length) return;
    const selectedIndex = getCheckedOptionIndex(this.radioGroupOptions);
    const firstEnabledIndex = getFirstEnabledOptionIndex(this.radioGroupOptions);
    const focusIndex = selectedIndex !== -1 ? selectedIndex : firstEnabledIndex !== -1 ? firstEnabledIndex : -1;

    this.radioGroupOptions.forEach((opt, i) => {
      const input = opt.shadowRoot?.querySelector('input[type="radio"]') as HTMLInputElement | null;
      if (input) {
        input.tabIndex = i === focusIndex ? 0 : -1;
      }
    });
  }
}
