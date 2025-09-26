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
import { GROUP_DIRECTIONS, type GroupDirection } from '../../../styles/group-direction-styles';
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
import type { ButtonGroupDirection } from '../../button-group/button-group-utils';
import { Label } from '../../common/label/label';
import { LoadingMessage } from '../../common/loading-message/loading-message';
import { StateMessage } from '../../common/state-message/state-message';
import { updateSelectOptions } from '../../select/select/select-utils';
import { getComponentCss } from './radio-group-styles';
import {
  type RadioGroupChangeEventDetail,
  type RadioGroupOption,
  type RadioGroupState,
  setSelectedRadioGroupOption,
  syncRadioGroupChildrenProps,
  updateOptionsDisabled,
  updateRadioGroupOptions,
} from './radio-group-utils';

const propTypes: PropTypes<typeof RadioGroup> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  placeholder: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  required: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  direction: AllowedTypes.breakpoint<ButtonGroupDirection>(GROUP_DIRECTIONS),
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
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "", "description": "Default slot for the `p-radio-group-option` tags." }
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

  /** Supplementary text providing more context or explanation for the input. */
  @Prop() public description?: string = '';

  /** A boolean value that, if present, renders the input field as a compact version. */
  @Prop() public compact?: boolean = false;

  /** Defines the direction of the main and cross axis. The default is ’{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint ‘xs’. You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: BreakpointCustomizable<GroupDirection> = 'column';

  /** The name of the input field, used when submitting the form data. */
  @Prop({ reflect: true }) public name: string;
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** The text input value. */
  @Prop({ mutable: true, reflect: true }) public value?: string = '';

  /** Specifies the id of the <form> element that the input belongs to (useful if the input is not a direct descendant of the form). */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /** A string that provides a brief hint to the user about what kind of information is expected in the field (e.g., placeholder='Enter your full name'). This text is displayed when the input field is empty. */
  @Prop() public placeholder?: string = '';

  /** A boolean value that, if present, makes the input field unusable and unclickable. The value will not be submitted with the form. */
  @Prop() public disabled?: boolean = false;

  /** A boolean value that, if present, indicates that the input field must be filled out before the form can be submitted. */
  @Prop() public required?: boolean = false;

  /** @experimental Shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Indicates the validation or overall status of the input component. */
  @Prop() public state?: RadioGroupState = 'none';

  /** Dynamic feedback text for validation or status. */
  @Prop() public message?: string = '';

  /** Controls the visibility of the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Controls the visual appearance of the component. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the text input loses focus after its value was changed. */
  @Event({ bubbles: true }) public change: EventEmitter<RadioGroupChangeEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;
  private defaultValue: string;

  private radioGroupOptions: RadioGroupOption[] = [];
  private preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated

  @Listen('internalRadioGroupOptionChange')
  public updateOptionHandler(e: Event & { target: RadioGroupOption; detail: RadioGroupChangeEventDetail }): void {
    e.stopPropagation();
    this.updateSelectedOption(e.target, e.detail);
  }

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals?.setFormValue(newValue);

    if (this.radioGroupOptions.length > 0) {
      if (!this.preventOptionUpdate) {
        updateRadioGroupOptions(this.radioGroupOptions, this.value);
      }
      this.preventOptionUpdate = false;
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
    syncRadioGroupChildrenProps(this.radioGroupOptions, this.theme);
    updateOptionsDisabled(this.host, this.disabled, this.loading, this.state, this.name);

    const id = 'radio-group';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <Label
          host={this.host}
          label={this.label}
          description={this.description}
          htmlFor={id}
          isRequired={this.required}
          isLoading={this.loading}
          isDisabled={this.disabled}
        />
        <div class="wrapper" role="radiogroup" aria-labelledby={id} onKeyDown={this.onKeyDown}>
          <slot onSlotchange={this.onSlotChange} />
          {this.loading && (
            <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.theme} aria-hidden="true" />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </div>
    );
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (!this.radioGroupOptions.length) return;

    // const currentIndex = this.radioGroupOptions.findIndex((opt) => opt.value === this.value);
    const currentIndex = this.radioGroupOptions.findIndex(
      (opt) => opt === document.activeElement || opt.contains(document.activeElement)
    );
    let nextIndex = currentIndex;

    const len = this.radioGroupOptions.length;

    const move = (step: number): void => {
      let i = currentIndex;
      for (let tries = 0; tries < len; tries++) {
        i = (i + step + len) % len; // wrap around
        if (!this.radioGroupOptions[i].disabled && !this.radioGroupOptions[i].loading) {
          nextIndex = i;
          return;
        }
      }
      nextIndex = currentIndex;
    };

    let navigationKey = false;

    switch (key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        move(+1);
        navigationKey = true;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        move(-1);
        navigationKey = true;
        break;
    }

    if (navigationKey) {
      const nextOption = this.radioGroupOptions[nextIndex];
      if (nextOption && !nextOption.disabled) {
        /*
        Fix for when multiple keys (e.g., ArrowUp + ArrowDown) are pressed simultaneously,
        the focus could land on the wrong (non-selected) option. Deferring the click
        with requestAnimationFrame ensures previous blur/focus events are processed first.
        */
        requestAnimationFrame(() => {
          nextOption.click();
        });
      }
    }
  };

  private updateSelectedOption = (
    selectedOption: RadioGroupOption,
    originalEvent: RadioGroupChangeEventDetail
  ): void => {
    // option can be undefined when no option is highlighted and keyboard action calls this
    if (selectedOption) {
      this.preventOptionUpdate = true; // Avoid unnecessary updating of options in value watcher
      setSelectedRadioGroupOption(this.radioGroupOptions, selectedOption);
      this.value = selectedOption.value;
      this.change.emit(originalEvent);
    }
  };

  private updateOptions = (): void => {
    this.radioGroupOptions = [];

    for (const child of Array.from(this.host.children).filter(
      (el) => el.slot !== 'label' && el.slot !== 'description' && el.slot !== 'message'
    )) {
      throwIfElementIsNotOfKind(this.host, child as HTMLElement, ['p-radio-group-option']);
      this.radioGroupOptions.push(child as RadioGroupOption);
    }
  };

  private onSlotChange = (): void => {
    this.updateOptions();
    updateSelectOptions(this.radioGroupOptions, this.value);
  };
}
