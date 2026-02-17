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

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<SwitchAlignLabel> = 'end';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Stretches the contents to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Visualize the switch with on/off status. */
  @Prop() public checked?: boolean = false;

  /** Disables the switch. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the switch and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  /** Emitted when checked status is changed. */
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
          aria-describedby={this.loading ? loadingId : undefined}
          onClick={this.onSwitchClick}
        >
          {/* it's necessary to always render toggle and a conditionally nested spinner, for smooth transitions */}
          <span class="toggle">
            {this.loading && <PrefixedTagNames.pSpinner class="spinner" size="inherit" aria-hidden="true" />}
          </span>
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
