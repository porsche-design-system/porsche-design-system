import { Component, Element, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  FORM_STATES,
  getOnlyChildOfKindHTMLElementOrThrow,
  getPrefixedTagNames,
  getSlotTextContent,
  hasPropValueChanged,
  isRequiredAndParentNotRequired,
  observeAttributes,
  setAriaAttributes,
  setAttribute,
  THEMES,
  unobserveAttributes,
  validateProps,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import type { SelectWrapperDropdownDirection, SelectWrapperState } from './select-wrapper-utils';
import { DROPDOWN_DIRECTIONS, isCustomDropdown } from './select-wrapper-utils';
import { getComponentCss } from './select-wrapper-styles';
import { StateMessage } from '../../common/state-message/state-message';
import { Label } from '../../common/label/label';

const propTypes: PropTypes<typeof SelectWrapper> = {
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<SelectWrapperState>(FORM_STATES),
  message: AllowedTypes.string,
  hideLabel: AllowedTypes.breakpoint('boolean'),
  filter: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  dropdownDirection: AllowedTypes.oneOf<SelectWrapperDropdownDirection>(DROPDOWN_DIRECTIONS),
  native: AllowedTypes.boolean,
};

@Component({
  tag: 'p-select-wrapper',
  shadow: true,
})
export class SelectWrapper {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The validation state. */
  @Prop() public state?: SelectWrapperState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Filters select options by typing a character */
  @Prop() public filter?: boolean = false;

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: SelectWrapperDropdownDirection = 'auto';

  /** Forces rendering of native browser select dropdown */
  @Prop() public native?: boolean = false;

  private select: HTMLSelectElement;
  private iconElement: HTMLElement;
  private hasCustomDropdown: boolean;

  public connectedCallback(): void {
    this.observeAttributes(); // on every reconnect
  }

  public componentWillLoad(): void {
    this.select = getOnlyChildOfKindHTMLElementOrThrow(this.host, 'select');
    this.observeAttributes(); // once initially

    this.hasCustomDropdown = isCustomDropdown(this.filter, this.native);
    if (this.hasCustomDropdown) {
      setAttribute(this.select, 'tabindex', '-1');
      setAttribute(this.select, 'aria-hidden', 'true');
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    /*
     * This is a workaround to improve accessibility because the select and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
     */
    if (!this.hasCustomDropdown) {
      setAriaAttributes(this.select, {
        label: this.label,
        message: this.message || this.description,
        state: this.state,
      });
    }
  }

  public disconnectedCallback(): void {
    unobserveAttributes(this.select);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { disabled } = this.select;
    attachComponentCss(
      this.host,
      getComponentCss,
      disabled,
      this.hasCustomDropdown,
      this.hideLabel,
      this.state,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <Label
          label={this.label}
          description={this.description}
          formElement={this.select}
          host={this.host}
          hasCustomSelectDropdown={this.hasCustomDropdown}
        />
        <div class="wrapper">
          <slot />
          <PrefixedTagNames.pIcon
            class="icon"
            name="arrow-head-down"
            theme={this.theme}
            color={disabled ? 'state-disabled' : 'primary'}
            aria-hidden="true"
            ref={(el) => (this.iconElement = el)}
          />
          {this.hasCustomDropdown && !disabled && (
            <PrefixedTagNames.pSelectWrapperDropdown
              class="dropdown"
              selectRef={this.select}
              label={this.label || getSlotTextContent(this.host, 'label')}
              message={this.message || getSlotTextContent(this.host, 'message')}
              description={this.description || getSlotTextContent(this.host, 'description')}
              state={this.state}
              direction={this.dropdownDirection}
              filter={this.filter}
              theme={this.theme}
              required={isRequiredAndParentNotRequired(this.host, this.select)}
              disabled={disabled}
              onOpenChange={(isOpen: boolean) => this.iconElement.classList.toggle('icon--open', isOpen)}
            />
          )}
        </div>
        <StateMessage state={this.state} message={this.message} theme={this.theme} host={this.host} />
      </div>
    );
  }

  private observeAttributes(): void {
    observeAttributes(this.select, ['disabled', 'required'], () => forceUpdate(this.host));
  }
}
