import { observeProperties } from '../utils';

export type ILoadingComponent = {
  loading?: boolean;
};

export class LoadingComponent {
  public initialLoading: boolean = false;

  constructor(public component: ILoadingComponent) {}

  public onLoadingChange(value: boolean): void {
    if (value) {
      this.updateInitialLoading();
    }
  }

  public connectedCallback(): void {
    console.log('LoadingComponent connectedCallback');
    this.updateInitialLoading();

    // would be great to detect loading change here but doesn't work 🤷‍
    observeProperties(this.component as any, ['loading'], () => {
      console.log('observeProperties');
      this.updateInitialLoading();
    });
  }

  public componentWillLoad(): void {
    console.log('LoadingComponent componentWillLoad');
    this.updateInitialLoading();
  }

  private updateInitialLoading(): void {
    this.initialLoading = this.component.loading;
  }
}
