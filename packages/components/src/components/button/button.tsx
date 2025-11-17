import { AttachInternals, Component, Element, Host, h, type JSX, Listen, Prop, Watch } from '@stencil/core';
import type {
  BreakpointCustomizable,
  ButtonAriaAttribute,
  ButtonType,
  ButtonVariant,
  PropTypes,
  SelectedAriaAttributes,
} from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  BUTTON_TYPES,
  getPrefixedTagNames,
  hasPropValueChanged,
  hasVisibleIcon,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  LINK_BUTTON_VARIANTS,
  validateProps,
} from '../../utils';
import { LoadingMessage, loadingId } from '../common/loading-message/loading-message';
import { getComponentCss } from './button-styles';
import { type ButtonIcon, getButtonAriaAttributes } from './button-utils';

const propTypes: PropTypes<typeof Button> = {
  type: AllowedTypes.oneOf<ButtonType>(BUTTON_TYPES),
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  variant: AllowedTypes.oneOf<ButtonVariant>(LINK_BUTTON_VARIANTS),
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  compact: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<ButtonAriaAttribute>(BUTTON_ARIA_ATTRIBUTES),
  form: AllowedTypes.string,
};

/**
 * @slot {"name": "", "description": "Default slot for the button label." }
 */
@Component({
  tag: 'p-button',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class Button {
  @Element() public host!: HTMLElement;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'submit';

  /** The name of the button, submitted as a pair with the button's value as part of the form data, when that button is used to submit the form. */
  @Prop({ reflect: true }) public name?: string;

  /** Defines the value associated with the button's name when it's submitted with the form data. This value is passed to the server in params when the form is submitted using this button. */
  @Prop() public value?: string;

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The style variant of the button. */
  @Prop() public variant?: ButtonVariant = 'primary';

  /** The icon shown. By choosing 'none', no icon is displayed. */
  @Prop() public icon?: ButtonIcon = 'none';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Displays as compact version. */
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttribute>;

  /** The id of a form element the button should be associated with. */
  @Prop({ reflect: true }) public form?: string;
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "form" as an attribute ensures it is properly handled in the form submission process.

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.stopPropagation();
      return;
    }

    if (this.form && this.internals?.form) {
      e.preventDefault();
      if (this.type === 'submit') {
        // Submitter is null because the button can't be passed from the shadow DOM https://github.com/WICG/webcomponents/issues/814
        this.internals?.form.requestSubmit();
      } else if (this.type === 'reset') {
        this.internals?.form.reset();
      }
    }
  }

  @Watch('value')
  public onValueChange(newValue: string): void {
    if (this.form) {
      this.internals?.setFormValue(newValue);
    }
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    if (this.form) {
      this.internals?.setFormValue(this.value);
    }
    this.initialLoading = this.loading;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    if (!this.form) {
      improveButtonHandlingForCustomElement(
        this.host,
        () => this.type,
        () => isDisabledOrLoading(this.disabled, this.loading),
        () => this.name,
        () => this.value
      );
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.iconSource,
      this.variant,
      this.hideLabel,
      this.disabled,
      this.loading,
      this.compact
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <button
          {...getButtonAriaAttributes(this.disabled, this.loading, this.aria)}
          class="root"
          type={this.type}
          name={this.name}
          value={this.value}
          aria-describedby={this.loading ? loadingId : undefined}
        >
          {this.loading && <PrefixedTagNames.pSpinner class="spinner" size="inherit" aria-hidden="true" />}
          {hasVisibleIcon(this.icon, this.iconSource) && (
            <PrefixedTagNames.pIcon
              class="icon"
              size="inherit"
              name={this.iconSource ? undefined : this.icon}
              source={this.iconSource}
              color="inherit"
              aria-hidden="true"
            />
          )}
          <span class="label">
            <slot />
          </span>
        </button>
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </Host>
    );
  }
}
