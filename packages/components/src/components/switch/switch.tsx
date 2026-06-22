import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Listen, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  ALIGN_LABELS,
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  isDisabledOrLoading,
  validateProps,
} from '../../utils';
import { LoadingMessage, loadingId } from '../common/loading-message/loading-message';
import { getComponentCss } from './switch-styles';
import { getSwitchButtonAriaAttributes, type SwitchAlignLabel, type SwitchUpdateEventDetail } from './switch-utils';

const propTypes: PropTypes<typeof Switch> = {
  alignLabel: AllowedTypes.breakpoint<SwitchAlignLabel>(ALIGN_LABELS),
  hideLabel: AllowedTypes.breakpoint('boolean'),
  stretch: AllowedTypes.breakpoint('boolean'),
  checked: AllowedTypes.boolean,
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the label." }
 *
 * @controlled {"props": ["checked"], "event": "update"}
 */
@Component({
  tag: 'p-switch',
  shadow: { delegatesFocus: true },
})
export class Switch {
  @Element() public host!: HTMLElement;

  /** Sets the position of the slotted label relative to the switch toggle, either before (`start`) or after (`end`) it. Supports responsive breakpoint values. */
  @Prop() public alignLabel?: BreakpointCustomizable<SwitchAlignLabel> = 'end';

  /** Hides the visible label while keeping it accessible to screen readers. Supports responsive breakpoint values. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Expands the space between the switch toggle and its label to fill the full available width of the container. Supports responsive breakpoint values. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Reflects the switch's current on/off state and allows setting the initial checked value when the component first renders. */
  @Prop() public checked?: boolean = false;

  /** Prevents user interaction with the switch and blocks all click and keyboard events while it is disabled. */
  @Prop() public disabled?: boolean = false;

  /** Disables the switch and shows a loading spinner to indicate an ongoing asynchronous toggle operation. */
  @Prop() public loading?: boolean = false;

  /** Reduces the switch size and spacing for use in dense layouts where vertical space is limited. */
  @Prop() public compact?: boolean = false;

  /** Emitted when the user toggles the switch, carrying the new `checked` state in the event detail. */
  @Event({ bubbles: false }) public update: EventEmitter<SwitchUpdateEventDetail>;

  private initialLoading: boolean = false;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  public connectedCallback(): void {
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
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

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.alignLabel,
      this.hideLabel,
      this.stretch,
      this.checked,
      this.disabled,
      this.loading,
      this.compact
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const id = 'x';

    return (
      <Host>
        <button
          {...getSwitchButtonAriaAttributes(this.disabled, this.loading, this.checked)}
          id={id}
          type="button"
          role="switch"
          aria-labelledby="label" // only relevant for axe-core because of https://github.com/dequelabs/axe-core/issues/1393
          aria-describedby={this.loading ? loadingId : null}
          onClick={this.onSwitchClick}
        >
          {/* it's necessary to always render toggle and a conditionally nested spinner, for smooth transitions */}
          <span class="toggle">{this.loading && <PrefixedTagNames.pSpinner class="spinner" aria-hidden="true" />}</span>
        </button>
        <label id="label" htmlFor={id}>
          <slot />
        </label>
        <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
      </Host>
    );
  }

  private onSwitchClick = (): void => {
    this.update.emit({ checked: !this.checked });
  };
}
