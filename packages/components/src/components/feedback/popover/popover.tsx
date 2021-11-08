import { JSX, Component, Prop, h, Element, Host } from '@stencil/core';
import { Theme } from '../../../types';
import { Position } from './popover-utils';
import { State } from '../../../../tests/unit/mocks/stencil-decorator.mocks';

@Component({
  tag: 'p-popover',
  shadow: true,
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Theme. */
  @Prop() public theme?: Theme = 'light';

  /** Define the position on the clickable element from which the popover flys out. */
  @Prop() public anchorOrigin?: Position = {
    vertical: 'center',
    horizontal: 'right',
  };

  /** Define the position of the popover from which it anchors to the button. */
  @Prop() public anchorFlyout?: Position = {
    vertical: 'center',
    horizontal: 'left',
  };

  @State() open: boolean = false;

  public render(): JSX.Element {
    console.log(this.open);
    return (
      <Host>
        <p-button-pure icon="information" hideLabel="true" onClick={() => (this.open = !this.open)}>
          Open Popover
        </p-button-pure>
        {this.open && (
          <span>
            <slot />
          </span>
        )}
      </Host>
    );
  }
}
