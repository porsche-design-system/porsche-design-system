import { fromEvent } from 'rxjs';

export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get() {
        // console.log('proxyInputs get', item);
        return this.el[item];
      },
      set(val: any) {
        // console.log('proxyInputs set', item, val);
        this.z.runOutsideAngular(() => (this.el[item] = val));
      },
    });
  });
};

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach((methodName) => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach((eventName) => (instance[eventName] = fromEvent(el, eventName)));
};

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp({ inputs, methods }: { inputs?: any; methods?: any }) {
  // console.log('ProxyCmp');
  return function (cls: any) {
    // console.log('ProxyCmp decorator', cls, inputs, methods);
    if (inputs) {
      proxyInputs(cls, inputs);
    }
    if (methods) {
      proxyMethods(cls, methods);
    }
    return cls;
  };
}
