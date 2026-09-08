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

  /** Sets the button's HTML type — `submit` sends the form, `reset` clears it, `button` performs no default action. */
  @Prop() public type?: ButtonType = 'submit';

  /** Sets the name submitted with the form data when this button triggers form submission. */
  @Prop({ reflect: true }) public name?: string;

  /** Sets the value submitted with the form data when this button triggers form submission, paired with `name`. */
  @Prop() public value?: string;

  /** Disables the button, preventing all interaction and blocking events. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and replaces its content with a loading spinner to indicate an ongoing operation. */
  @Prop() public loading?: boolean = false;

  /** Sets the visual style variant of the button (`primary` or `secondary`). */
  @Prop() public variant?: ButtonVariant = 'primary';

  /** Sets the icon displayed inside the button. Use `none` to show no icon. */
  @Prop() public icon?: ButtonIcon = 'none';

  /** Sets a path to a custom SVG icon, used instead of the built-in icon set. */
  @Prop() public iconSource?: string;

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Reduces the button's height and padding for denser layouts. Supports responsive breakpoint values. */
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;

  /** Sets ARIA attributes on the button to improve accessibility for screen readers. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttribute>;

  /** Associates the button with a form element by its ID, so it can submit or reset that form even when placed outside of it. */
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
          {this.loading && <PrefixedTagNames.pSpinner class="spinner" aria-hidden="true" />}
          {hasVisibleIcon(this.icon, this.iconSource) && (
            <PrefixedTagNames.pIcon
              class="icon"
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
