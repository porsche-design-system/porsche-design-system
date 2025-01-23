import {
  AttachInternals,
  Component,
  Element,
  Event,
  type EventEmitter,
  type JSX,
  Listen,
  Prop,
  Watch,
  h,
} from '@stencil/core';
import { getSlottedAnchorStyles } from '../../styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  FORM_STATES,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  isDisabledOrLoading,
  validateProps,
} from '../../utils';
import { Label, descriptionId } from '../common/label/label';
import { LoadingMessage } from '../common/loading-message/loading-message';
import { StateMessage, messageId } from '../common/state-message/state-message';
import { getComponentCss } from './checkbox-styles';
import type { CheckboxBlurEventDetail, CheckboxState, CheckboxUpdateEventDetail } from './checkbox-utils';

const propTypes: PropTypes<typeof Checkbox> = {
  label: AllowedTypes.string,
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  required: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  indeterminate: AllowedTypes.boolean,
  checked: AllowedTypes.boolean,
  form: AllowedTypes.string,
  state: AllowedTypes.oneOf<CheckboxState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  loading: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
@Component({
  tag: 'p-checkbox',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class Checkbox {
  @Element() public host!: HTMLElement;

  /** The name of the checkbox. */
  @Prop({ reflect: true }) public name?: string = '';
  // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.

  /** Marks the checkbox as required. */
  @Prop() public required?: boolean = false;

  /** Marks the checkbox as disabled. */
  @Prop() public disabled?: boolean = false;

  /** Marks the checkbox as indeterminate. */
  @Prop() public indeterminate?: boolean = false;

  /** Reflects the checkbox current checked state and allows setting the initial checked state. */
  @Prop({ mutable: true }) public checked?: boolean = false;

  /** The id of a form element the checkbox should be associated with. */
  @Prop({ reflect: true }) public form?: string; // The ElementInternals API automatically detects the form attribute

  /**
   * The checkbox value.
   * When a form is submitted, only a checkbox which is currently checked is included in the submission.
   */
  @Prop() public value?: string = 'on';

  /** The label text. */
  @Prop() public label?: string = '';

  /** The validation state. */
  @Prop() public state?: CheckboxState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** @experimental Disables the checkbox and shows a loading indicator. */
  @Prop() public loading?: boolean = false;

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when checkbox checked property is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<CheckboxUpdateEventDetail>;

  /** Emitted when the checkbox has lost focus. */
  @Event({ bubbles: false }) public blur: EventEmitter<CheckboxBlurEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;
  private defaultChecked: boolean;
  private checkboxInputElement: HTMLInputElement;

  @Listen('keydown')
  public onKeydown(e: KeyboardEvent): void {
    const { key } = e;
    if ((key === ' ' || key === 'Spacebar') && isDisabledOrLoading(this.disabled, this.loading)) {
      e.preventDefault();
    }
  }

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals?.setFormValue(this.checkboxInputElement?.checked ? newValue : undefined);
  }

  @Watch('indeterminate')
  public onIndeterminateChange(newValue: boolean): void {
    if (this.checkboxInputElement) {
      this.checkboxInputElement.indeterminate = newValue;
    }
  }

  @Watch('checked')
  public onCheckedChange(newValue: boolean): void {
    this.internals?.setFormValue(newValue ? this.value : undefined);
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillLoad(): void {
    this.initialLoading = this.loading;
    this.defaultChecked = this.checked;
  }

  public componentDidLoad(): void {
    this.checkboxInputElement.indeterminate = this.indeterminate;
    if (this.checkboxInputElement.checked) {
      this.internals?.setFormValue(this.value);
    }
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public formResetCallback(): void {
    this.internals?.setFormValue(this.defaultChecked ? this.value : undefined);
    this.checked = this.defaultChecked;
  }

  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  public formStateRestoreCallback(state: string): void {
    this.checked = !!state;
  }

  public componentDidRender(): void {
    // Skip validation if the checkbox is disabled; it's ignored in form validation
    // and always has an empty validationMessage, even if some ValidityState flags are true.
    if (!this.disabled) {
      this.internals?.setValidity(
        this.checkboxInputElement.validity,
        this.checkboxInputElement.validationMessage,
        this.checkboxInputElement
      );
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.hideLabel,
      this.state,
      this.disabled,
      this.loading,
      this.compact,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const id = 'checkbox';
    return (
      <div class="root">
        <Label
          host={this.host}
          htmlFor={id}
          label={this.label}
          isLoading={this.loading}
          isDisabled={this.disabled}
          isRequired={this.required}
        />
        <div class="wrapper">
          <input
            type="checkbox"
            id={id}
            aria-describedby={`${descriptionId} ${messageId}`}
            aria-invalid={this.state === 'error' ? 'true' : null}
            aria-disabled={this.loading || this.disabled ? 'true' : null}
            checked={this.checked}
            form={this.form}
            value={this.value}
            name={this.name}
            onChange={this.onChange}
            onBlur={this.onBlur}
            required={this.required}
            disabled={this.disabled}
            ref={(el: HTMLInputElement) => (this.checkboxInputElement = el)}
          />
          {this.loading && (
            <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.theme} aria-hidden="true" />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </div>
    );
  }

  private onBlur = (e: Event): void => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.blur.emit(e);
  };

  private onChange = (e: Event): void => {
    const checked = (e.target as HTMLInputElement).checked;
    this.checked = checked;
    this.internals?.setFormValue(checked ? this.value : undefined);
    this.update.emit({
      value: this.value,
      name: this.name,
      checked,
    });
  };
}
