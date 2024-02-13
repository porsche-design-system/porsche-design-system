import type { ComponentInterface } from '@stencil/core';
import type { FunctionPropertyNames } from '../types';
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

type PrefixWithUnderscore<T> = {
  [K in keyof T as K extends string ? `_${K}` : never]: T[K];
};

// TODO: make this nicer and get rid of `[memberName: string]: any;` which is part of ComponentInterface
export type MixedComponent = PrefixWithUnderscore<
  Pick<ComponentInterface, FunctionPropertyNames<Omit<ComponentInterface, 'render'>>>
>;

export interface AnotherLoadingMixin extends Required<MixedComponent> {}

// extended mixin that does not override lifecycles
// but instead has a typing convention that prefixes them with an `_` underscore in the stencil component
// and then calls them from the mixin if they exist
export class AnotherLoadingMixin implements ComponentInterface {
  public loading: boolean = false;
  public initialLoading: boolean = false;

  constructor() {
    // never gets called, probably because @use mixing mutates prototype and merges the classes together
    console.log('AnotherLoadingMixin constructor');
  }

  public connectedCallback(): void {
    console.log('AnotherLoadingMixin connectedCallback');
    this.initialLoading = this.loading;
    this._connectedCallback?.();
  }

  public componentWillLoad(): void {
    console.log('AnotherLoadingMixin componentWillLoad');
    this.initialLoading = this.loading;
    this._componentWillLoad?.();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    console.log('AnotherLoadingMixin componentShouldUpdate');
    this._componentShouldUpdate?.();
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillUpdate(): void {
    console.log('AnotherLoadingMixin componentWillUpdate', this.loading, this.initialLoading);
    if (this.loading) {
      this.initialLoading = true;
    }

    this._componentWillUpdate?.();
  }

  public componentDidUpdate(): void {
    console.log('AnotherLoadingMixin componentDidUpdate', this.loading, this.initialLoading);
    this._componentDidUpdate?.();
  }

  public componentWillRender(): void {
    console.log('AnotherLoadingMixin componentWillRender');
    this._componentWillRender?.();
  }

  public componentDidRender(): void {
    console.log('AnotherLoadingMixin componentDidRender');
    this._componentDidRender?.();
  }
}
