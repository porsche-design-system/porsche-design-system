import { JSX, Component, Prop, h, Element, Event, EventEmitter } from '@stencil/core';
import type { BreakpointCustomizable } from '../../../types';
import { getPrefixedTagNames } from '../../../utils';
import { Theme } from '../../../types';
import { isDisabled, SwitchChangeEvent } from './switch-utils';

@Component({
  tag: 'p-switch',
  styleUrl: 'switch.scss',
  shadow: true,
})
export class Switch {
  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<'left' | 'right'> = 'right';

  /** Visualize the switch with on/off status. */
  @Prop() public checked?: boolean = false;

  /** Disables the switch. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the switch and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** To remove the element from tab order. */
  @Prop() public tabbable?: boolean = true;

  /** Adapts the switch color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when checked status is changed. */
  @Event({ bubbles: false }) public switchChange: EventEmitter<SwitchChangeEvent>;

  public render(): JSX.Element {
    const rootClasses = {
      ['checked']: this.checked,
      ['disabled']: this.disabled,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <label class={rootClasses}>
        <PrefixedTagNames.pText tag="span" color="inherit">
          {this.label}
        </PrefixedTagNames.pText>
        <button
          class="button"
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          disabled={isDisabled(this.disabled, this.loading)}
          tabindex={this.tabbable ? 0 : -1}
          aria-busy={this.loading ? 'true' : null}
          onClick={this.handleSwitchClick}
        >
          <span class="toggle" />
        </button>
      </label>
    );
  }

  private handleSwitchClick = (): void => {
    this.switchChange.emit({ checked: !this.checked });
  };
}
