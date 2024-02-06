import { hasPropValueChanged } from '../utils';

export class LoadingMixin {
  // private _loading: boolean = false;
  public loading: boolean = false;
  public initialLoading: boolean = false;

  constructor() {
    // never gets called, probably because @use mixing mutates prototype and merges the classes together
    console.log('LoadingMixin constructor');
  }

  // looks like @Prop decorator overrides this
  // get loading(): boolean {
  //   console.log('getter loading');
  //   return this._loading;
  // }
  //
  // looks like @Prop decorator overrides this
  // set loading(newValue: boolean) {
  //   console.log('setter loading', newValue);
  //   if (newValue) {
  //     this.initialLoading = this.loading;
  //   }
  //
  //   this._loading = newValue;
  // }

  public connectedCallback(): void {
    console.log('LoadingMixin connectedCallback');
    this.initialLoading = this.loading;
  }

  public componentWillLoad(): void {
    console.log('LoadingMixin componentWillLoad');
    this.initialLoading = this.loading;
  }

  // we can't use any stencil decorators here since it isn't a stencil component
  // that's why we use the componentShouldUpdate lifecycle to check for the loading change
  // keep in mind that `hasPropValueChanged(newVal, oldVal)` was added here, which was previously in the component itself
  // because defining same lifecycle here and in component will override with the one from component
  public componentShouldUpdate(newVal: unknown, oldVal: unknown, propName: keyof typeof this): boolean {
    console.log('LoadingMixin componentShouldUpdate', propName, oldVal, '-->', newVal);
    if (propName === 'loading' && newVal) {
      this.initialLoading = newVal as boolean;
    }

    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillUpdate(): void {
    console.log('LoadingMixin componentWillUpdate');
  }
}
