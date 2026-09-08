import { AttachInternals, Component, Element, Host, h, type JSX, Listen, Prop, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  BUTTON_TYPES,
  getPrefixedTagNames,
  hasPropValueChanged,
  hasVisibleIcon,
  improveButtonHandlingForCustomElement,
  isDisabledOrLoading,
  validateProps,
} from '../../utils';
import { LoadingMessage, loadingId } from '../common/loading-message/loading-message';
import { getComponentCss } from './button-pure-styles';
import {
  BUTTON_PURE_COLORS,
  BUTTON_PURE_SIZES,
  type ButtonPureAlignLabel,
  type ButtonPureAriaAttribute,
  type ButtonPureColor,
  type ButtonPureIcon,
  type ButtonPureSize,
  type ButtonPureType,
  getButtonPureAriaAttributes,
  warnIfIsLoadingAndIconIsNone,
} from './button-pure-utils';

const propTypes: PropTypes<typeof ButtonPure> = {
  type: AllowedTypes.oneOf<ButtonPureType>(BUTTON_TYPES),
  name: AllowedTypes.string,
  value: AllowedTypes.string,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  size: AllowedTypes.breakpoint<ButtonPureSize>(BUTTON_PURE_SIZES),
  icon: AllowedTypes.string,
  color: AllowedTypes.oneOf<ButtonPureColor>(BUTTON_PURE_COLORS),
  iconSource: AllowedTypes.string,
  underline: AllowedTypes.boolean,
  active: AllowedTypes.boolean,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  alignLabel: AllowedTypes.breakpoint<ButtonPureAlignLabel>(ALIGN_LABELS),
  stretch: AllowedTypes.breakpoint('boolean'),
  aria: AllowedTypes.aria<ButtonPureAriaAttribute>(BUTTON_ARIA_ATTRIBUTES),
  form: AllowedTypes.string,
};

/**
 * @slot {"name": "", "description": "Default slot for the button label." }
 */
@Component({
  tag: 'p-button-pure',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class ButtonPure {
  @Element() public host!: HTMLElement;

  /** Sets the button's HTML type — `submit` sends the form, `reset` clears it, `button` performs no default action. */
  @Prop() public type?: ButtonPureType = 'submit';

  /** Sets the name submitted with the form data when this button triggers form submission. */
  @Prop({ reflect: true }) public name?: string;

  /** Sets the value submitted with the form data when this button triggers form submission, paired with `name`. */
  @Prop() public value?: string;

  /** Disables the button, preventing all interaction and blocking events. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button and replaces its icon with a loading spinner to indicate an ongoing operation. */
  @Prop() public loading?: boolean = false;

  /** Sets the font size of the button label. Supports responsive breakpoint values. */
  @Prop() public size?: BreakpointCustomizable<ButtonPureSize> = 'sm';

  /** Sets the foreground color of the button's icon and label text. */
  @Prop() public color?: ButtonPureColor = 'primary';

  /** Sets the icon displayed next to the label. */
  @Prop() public icon?: ButtonPureIcon = 'arrow-right';

  /** Sets a path to a custom SVG icon, used instead of the built-in icon set. */
  @Prop() public iconSource?: string;

  /** Adds a text underline to the label to reinforce the button's link-like appearance. */
  @Prop() public underline?: boolean = false;

  /** Visually marks the button as the currently active or selected item, useful for navigation and toggle patterns. */
  @Prop() public active?: boolean = false;

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Sets the label position relative to the icon — `start` places it before, `end` places it after. Supports responsive breakpoint values. */
  @Prop() public alignLabel?: BreakpointCustomizable<ButtonPureAlignLabel> = 'end';

  /** Expands the space between icon and label to fill the full container width. Supports responsive breakpoint values. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Sets ARIA attributes on the button to improve accessibility for screen readers. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonPureAriaAttribute>;

  /** Associates the button with a form element by its ID, so it can submit or reset that form even when placed outside of it. */
  @Prop({ reflect: true }) public form?: string;
  // In the React wrapper, all props are synced as properties on the element ref, so reflecting "form" as an attribute ensures it is properly handled in the form submission process.

  @AttachInternals() private internals: ElementInternals;

  private initialLoading: boolean = false;

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }

  // this stops click events when button is disabled
  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.isDisabledOrLoading) {
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
        () => this.isDisabledOrLoading,
        () => this.name,
        () => this.value
      );
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfIsLoadingAndIconIsNone(this.host, this.loading, this.icon, this.iconSource);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.icon,
      this.iconSource,
      this.active,
      this.disabled,
      this.loading,
      this.isDisabledOrLoading,
      this.stretch,
      this.size,
      this.color,
      this.hideLabel,
      this.alignLabel,
      this.underline
    );

    const hasIcon = hasVisibleIcon(this.icon, this.iconSource);

    const iconProps = {
      class: 'icon',
      size: 'inherit',
      color: 'inherit',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <button
          {...getButtonPureAriaAttributes(this.disabled, this.loading, this.aria)}
          class="root"
          type={this.type}
          name={this.name}
          value={this.value}
          aria-describedby={this.loading ? loadingId : undefined}
        >
          {this.loading ? (
            <PrefixedTagNames.pSpinner {...iconProps} aria-hidden="true" />
          ) : (
            hasIcon && (
              <PrefixedTagNames.pIcon {...iconProps} name={this.icon} source={this.iconSource} aria-hidden="true" />
            )
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
