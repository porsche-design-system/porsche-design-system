import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { attachComponentCss } from '../utils';
import { getComponentCss } from './segmented-control-styles';

@Component({
  tag: 'p-segmented-control',
  shadow: true,
})
export class SegmentedControl {
  @Element() public host!: HTMLElement;

  @Prop() public stretch?: boolean = false;
  @Prop() public wrap?: boolean = false;

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.stretch, this.wrap);
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
