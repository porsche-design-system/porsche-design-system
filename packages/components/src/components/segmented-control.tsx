import { Component, Element, h, JSX, Prop, forceUpdate } from '@stencil/core';
import { attachComponentCss, observeChildren, unobserveChildren } from '../utils';
import { getComponentCss } from './segmented-control-styles';

@Component({
  tag: 'p-segmented-control',
  shadow: true,
})
export class SegmentedControl {
  @Element() public host!: HTMLElement;

  @Prop() public wrap?: boolean = false;

  public connectedCallback(): void {
    observeChildren(this.host, () => forceUpdate(this.host));
  }

  public async componentWillRender(): Promise<void> {
    const widths = await Promise.all(
      Array.from(this.host.children).map(async (item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.style.position = 'absolute';

        this.host.parentElement.append(clone);
        await (clone as any).componentOnReady();
        const { width } = getComputedStyle(clone);
        clone.remove();

        return width;
      })
    );

    const maxWidth = Math.max(...widths.map(parseFloat));

    const style = this.host.getAttribute('style');
    if (style && style.includes('minmax')) {
      this.host.setAttribute('style', style.replace(/(minmax\()[\d.px]+/, `$1${maxWidth}px`));
    }

    attachComponentCss(this.host, getComponentCss, this.wrap, maxWidth);
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
