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
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  FORM_STATES,
  getPrefixedTagNames,
  hasPropValueChanged,
  isDisabledOrLoading,
  THEMES,
  validateProps,
} from '../../utils';
import { type BreakpointCustomizable, type PropTypes, type Theme } from '../../types';
import { getComponentCss } from './checkbox-styles';
import type { CheckboxState, CheckboxUpdateEventDetail } from './checkbox-utils';
import { messageId, StateMessage } from '../common/state-message/state-message';
import { descriptionId, Label } from '../common/label/label';
import { LoadingMessage } from '../common/loading-message/loading-message';
import { ControllerHost, InitialLoadingController } from '../../controllers';
import { getCheckboxRadioButtonSafariRenderingFix } from '../../utils/form/applyCheckboxRadioButtonSafariRenderingFix';
import { getSlottedAnchorStyles } from '../../styles';

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

  /** The name text. */
  @Prop() public name?: string = '';

  /** Marks the checkbox as required. */
  @Prop() public required?: boolean = false;

  /** Marks the checkbox as disabled. */
  @Prop() public disabled?: boolean = false;

  /** Marks the checkbox as indeterminate. */
  @Prop() public indeterminate?: boolean = false;

  /** Marks the checkbox as pre-selected (checked) on initial load. */
  @Prop() public checked?: boolean = false;

  /** The id of a form element the checkbox should be associated with. */
  @Prop() public form?: string;

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

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when checkbox checked property is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<CheckboxUpdateEventDetail>;

  @AttachInternals() private internals: ElementInternals;

  private controllerHost = new ControllerHost(this);
  private loadingCtrl = new InitialLoadingController(this.controllerHost);
  private input: HTMLInputElement;

  @Listen('keydown')
  public onKeydown(e: KeyboardEvent): void {
    const { key } = e;
    if ((key === ' ' || key === 'Spacebar') && isDisabledOrLoading(this.disabled, this.loading)) {
      e.preventDefault();
    }
  }

  @Watch('value')
  public onValueChange(newValue: string): void {
    this.internals.setFormValue(this.input.checked ? newValue : undefined);
  }

  @Watch('indeterminate')
  public onIndeterminateChange(newValue: boolean, oldValue: boolean): void {
    if (newValue !== oldValue) {
      this.input.indeterminate = newValue;
    }
  }

  @Watch('checked')
  public onCheckedChange(newValue: boolean): void {
    this.internals.setFormValue(newValue ? this.value : undefined);
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles, getCheckboxRadioButtonSafariRenderingFix);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillLoad(): void {
    this.input.indeterminate = this.indeterminate;
  }

  public componentDidLoad(): void {
    if (this.input.checked) {
      this.internals.setFormValue(this.value);
    }
  }

  public formResetCallback(): void {
    this.internals.setValidity({});
    this.internals.setFormValue(undefined);
    this.input.checked = false;
    this.checked = false;
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    attachComponentCss(this.host, getComponentCss, this.hideLabel, this.state, this.disabled, this.loading, this.theme);

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
            required={this.required}
            disabled={this.disabled}
            ref={(el: HTMLInputElement) => (this.input = el)}
          />
          {this.loading && (
            <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.theme} aria-hidden="true" />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
        <LoadingMessage loading={this.loading} initialLoading={this.loadingCtrl.initialLoading} />
      </div>
    );
  }

  private onChange = (e: Event): void => {
    const checked = (e.target as HTMLInputElement).checked;
    this.internals.setFormValue(checked ? this.value : undefined);
    this.update.emit({
      value: this.value,
      name: this.name,
      checked: (e.target as HTMLInputElement).checked,
    });
  };
}
