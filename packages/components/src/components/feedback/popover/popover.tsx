import { JSX, Component, Prop, h, Element, Host } from '@stencil/core';
import { Theme } from '../../../types';
import { getFlyoutDirection, Position } from './popover-utils';
import { State } from '../../../../tests/unit/mocks/stencil-decorator.mocks';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './popover-styles';

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

  @State() open: boolean = true;

  private direction: { x: string; y: string };

  public componentWillRender(): void {
    this.setDirection();
    attachComponentCss(this.host, getComponentCss, this.direction.x, this.direction.y);
  }

  public render(): JSX.Element {
    return (
      <Host>
        <p-button-pure
          icon="information"
          hideLabel="true"
          // onFocus={() => (this.open = true)}
          // onBlur={() => (this.open = false)}
        >
          Open Popover
        </p-button-pure>
        {this.open && (
          <div class="flyout">
            <slot />
          </div>
        )}
      </Host>
    );
  }

  private setDirection = () => {
    this.direction = getFlyoutDirection(this.host);
  };
}
