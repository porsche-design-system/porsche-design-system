import { fromEvent } from 'rxjs';

const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get() {
        // console.log('proxyInputs get', this.el, item, this.el[item], new Date().toISOString());
        return this.el[item];
      },
      set(val: any) {
        // console.log('proxyInputs set', this.el, item, val, new Date().toISOString());
        this.z.runOutsideAngular(() => (this.el[item] = val));
      },
    });
  });
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

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach((eventName) => (instance[eventName] = fromEvent(el, eventName)));
};

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp({ inputs /*, methods*/ }: { inputs?: any; methods?: any }) {
  return function (cls: any) {
    // console.log('ProxyCmp decorator', inputs, new Date().toISOString());
    if (inputs) {
      proxyInputs(cls, inputs);
    }
    // if (methods) {
    //   proxyMethods(cls, methods);
    // }
    return cls;
  };
}
