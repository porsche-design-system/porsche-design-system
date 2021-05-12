import { EventEmitter } from '@angular/core';

const proxyInputs = (component: any, inputs: string[]): void => {
  const callback = (item: string): void => {
    Object.defineProperty(component.prototype, item, {
      get() {
        return this.el[item];
      },
      set(val: any) {
        this.z.runOutsideAngular(() => (this.el[item] = val));
      },
    });
  };

  inputs.forEach(callback);
};

// NOTE: only relevant if components use the @Method() decorator
// currently our AngularWrapperGenerator doesn't support this
// const proxyMethods = (Cmp: any, methods: string[]) => {
//   const Prototype = Cmp.prototype;
//   methods.forEach((methodName) => {
//     Prototype[methodName] = function () {
//       const args = arguments;
//       return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
//     };
//   });
// };

export const proxyOutputs = (instance: any, events: string[]): void => {
  events.forEach((event) => (instance[event] = new EventEmitter()));
};

type ProxyCmpOptions = { inputs?: string[]; methods?: string[] };

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp({ inputs /*, methods*/ }: ProxyCmpOptions) {
  return function (component: any) {
    if (inputs) {
      proxyInputs(component, inputs);
    }
    // if (methods) {
    //   proxyMethods(component, methods);
    // }
    return component;
  };
}
