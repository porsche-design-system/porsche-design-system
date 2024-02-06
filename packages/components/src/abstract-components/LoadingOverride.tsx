import { Component, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'p-loading-base-component',
  shadow: true,
})
export class LoadingBaseComponent {
  @Prop() loading = false;
  public initialLoading = false;

  // while this compiles, but unfortunately watcher does not work
  @Watch('loading')
  public onLoadingChange(newVal: boolean): void {
    console.log('LoadingBaseComponent onLoadingChange');
    if (newVal) {
      // don't reset initialLoading to false
      this.initialLoading = newVal;
    }
  }

  public connectedCallback(): void {
    console.log('LoadingBaseComponent connectedCallback');
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    console.log('LoadingBaseComponent componentWillLoad');
    this.initialLoading = this.loading;
  }
}
