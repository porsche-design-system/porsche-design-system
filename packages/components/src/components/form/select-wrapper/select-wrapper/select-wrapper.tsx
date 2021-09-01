import { Component, Element, forceUpdate, h, Host, JSX, Listen, Prop } from '@stencil/core';
import {
  getHTMLElementAndThrowIfUndefined,
  getPrefixedTagNames,
  hasDescription,
  hasLabel,
  hasMessage,
  isRequiredAndParentNotRequired,
  observeAttributes,
  setAriaAttributes,
  setAttribute,
} from '../../../../utils';
import type { BreakpointCustomizable, FormState, Theme } from '../../../../types';
import type { DropdownDirection } from './select-wrapper-utils';
import { isCustomDropdown } from './select-wrapper-utils';
import { addComponentCss, addSlottedCss } from './select-wrapper-styles';
import { StateMessage } from '../../../common/state-message';

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
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Filters select options by typing a character */
  @Prop() public filter?: boolean = false;

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: DropdownDirection = 'auto';

  /** Forces rendering of native browser select dropdown */
  @Prop() public native?: boolean = false;

  // @State() private isOpen = false;

  private select: HTMLSelectElement;
  private iconElement: HTMLElement;
  // private comboButton: HTMLButtonElement;
  // private comboList: HTMLUListElement;
  // private dropdownElement: HTMLPSelectWrapperDropdownElement;
  // private filterElement: HTMLPSelectWrapperFilterElement;
  private hasCustomDropdown: boolean;

  // this stops click events when filter input is clicked
  // TODO: still needed?
  @Listen('click', { capture: false })
  public onClick(e: MouseEvent): void {
    if (this.filter) {
      e.stopPropagation();
    }
  }

  public connectedCallback(): void {
    this.setSelect();
    this.observeSelect();
    addSlottedCss(this.host);
  }

  public componentWillLoad(): void {
    this.hasCustomDropdown = isCustomDropdown(this.filter, this.native);
  }

  public componentDidRender(): void {
    addComponentCss(this.host, this.hideLabel, this.state, this.theme);

    /*
     * This is a workaround to improve accessibility because the select and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
     */
    setAriaAttributes(this.select, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }

  public render(): JSX.Element {
    const { disabled } = this.select;

    const rootClasses = {
      ['root']: true,
      ['root--disabled']: disabled,
    };
    const iconClasses = {
      ['icon']: true,
      // ['icon--open']: this.isOpen,
    };

    const labelId = 'label';

    const textProps = { tag: 'span', color: 'inherit' };
    const labelProps = { ...textProps /*onClick: this.onFocus*/ };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class={rootClasses}>
          <label id={labelId} class="label">
            {hasLabel(this.host, this.label) && (
              <PrefixedTagNames.pText class="label__text" {...labelProps}>
                {this.label || <slot name="label" />}
                {isRequiredAndParentNotRequired(this.host, this.select) && <span class="required" />}
              </PrefixedTagNames.pText>
            )}
            {hasDescription(this.host, this.description) && (
              <PrefixedTagNames.pText class="label__text label__text--description" {...labelProps} size="x-small">
                {this.description || <slot name="description" />}
              </PrefixedTagNames.pText>
            )}
            <PrefixedTagNames.pIcon
              ref={(el) => (this.iconElement = el)}
              class={iconClasses}
              name="arrow-head-down"
              color="inherit"
              aria-hidden="true"
            />
            <slot />
          </label>
          {this.hasCustomDropdown && (
            <PrefixedTagNames.pSelectWrapperDropdown
              // id={dropdownId}
              // class="dropdown"
              // optionMaps={this.optionMaps}
              direction={this.dropdownDirection}
              // open={this.isOpen}
              filter={this.filter}
              // hasFilterResults={hasFilterResults(this.optionMaps)}
              theme={this.theme}
              onOpenChange={(isOpen: boolean) => this.iconElement.classList[isOpen ? 'add' : 'remove']('icon--open')}
              // onSelect={this.setOptionSelected}
              // onFocus={this.onFocus}
              // onMouseDown={this.onMouseDown}
              label={this.label}
              // ref={(el) => (this.dropdownElement = el)}
              selectRef={this.select}
            />
          )}
        </div>
        {hasMessage(this.host, this.message, this.state) && (
          <StateMessage state={this.state} message={this.message} host={this.host} />
        )}
      </Host>
    );
  }

  // private get selectedIndex(): number {
  //   return this.select.selectedIndex;
  // }

  /*
   * <START NATIVE SELECT>
   */
  private setSelect(): void {
    this.select = getHTMLElementAndThrowIfUndefined(this.host, 'select');

    setAttribute(this.select, 'tabindex', '-1');
    setAttribute(this.select, 'aria-hidden', 'true');
  }

  private observeSelect(): void {
    observeAttributes(this.select, ['disabled', 'required'], () => forceUpdate(this.host));
  }
}
