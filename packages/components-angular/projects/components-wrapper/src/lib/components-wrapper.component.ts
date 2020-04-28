/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';

export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() { return this.el[item]; },
      set(val: any) { this.z.runOutsideAngular(() => (this.el[item] = val)); }
    });
  });
};

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp(opts: { inputs?: any; methods?: any }) {
  const decorator =  function(cls: any){
    if (opts.inputs) {
      proxyInputs(cls, opts.inputs);
    }
    if (opts.methods) {
      proxyMethods(cls, opts.methods);
    }
    return cls;
  };
  return decorator;
}

import { Components } from '@porsche-design-system/components-js'

export declare interface PButton extends Components.PButton {}
@ProxyCmp({inputs: ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'tabbable', 'theme', 'type', 'variant']})
@Component({ selector: 'p-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'tabbable', 'theme', 'type', 'variant'] })
export class PButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PButtonPure extends Components.PButtonPure {}
@ProxyCmp({inputs: ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'size', 'tabbable', 'theme', 'type', 'weight']})
@Component({ selector: 'p-button-pure', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'size', 'tabbable', 'theme', 'type', 'weight'] })
export class PButtonPure {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PCheckboxWrapper extends Components.PCheckboxWrapper {}
@ProxyCmp({inputs: ['hideLabel', 'label', 'message', 'state']})
@Component({ selector: 'p-checkbox-wrapper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hideLabel', 'label', 'message', 'state'] })
export class PCheckboxWrapper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PDivider extends Components.PDivider {}
@ProxyCmp({inputs: ['color', 'orientation', 'theme']})
@Component({ selector: 'p-divider', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'orientation', 'theme'] })
export class PDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PFlex extends Components.PFlex {}
@ProxyCmp({inputs: ['alignContent', 'alignItems', 'direction', 'inline', 'justifyContent', 'wrap']})
@Component({ selector: 'p-flex', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['alignContent', 'alignItems', 'direction', 'inline', 'justifyContent', 'wrap'] })
export class PFlex {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PFlexItem extends Components.PFlexItem {}
@ProxyCmp({inputs: ['alignSelf', 'flex', 'grow', 'offset', 'shrink', 'width']})
@Component({ selector: 'p-flex-item', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['alignSelf', 'flex', 'grow', 'offset', 'shrink', 'width'] })
export class PFlexItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PGrid extends Components.PGrid {}
@ProxyCmp({inputs: ['direction', 'safeZone']})
@Component({ selector: 'p-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['direction', 'safeZone'] })
export class PGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PGridItem extends Components.PGridItem {}
@ProxyCmp({inputs: ['offset', 'size']})
@Component({ selector: 'p-grid-item', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['offset', 'size'] })
export class PGridItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PHeadline extends Components.PHeadline {}
@ProxyCmp({inputs: ['align', 'color', 'ellipsis', 'tag', 'theme', 'variant']})
@Component({ selector: 'p-headline', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['align', 'color', 'ellipsis', 'tag', 'theme', 'variant'] })
export class PHeadline {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PIcon extends Components.PIcon {}
@ProxyCmp({inputs: ['color', 'lazy', 'name', 'size', 'source', 'theme']})
@Component({ selector: 'p-icon', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'lazy', 'name', 'size', 'source', 'theme'] })
export class PIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PLink extends Components.PLink {}
@ProxyCmp({inputs: ['download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'target', 'theme', 'variant']})
@Component({ selector: 'p-link', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'target', 'theme', 'variant'] })
export class PLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PLinkPure extends Components.PLinkPure {}
@ProxyCmp({inputs: ['active', 'download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'size', 'target', 'theme', 'weight']})
@Component({ selector: 'p-link-pure', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['active', 'download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'size', 'target', 'theme', 'weight'] })
export class PLinkPure {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PMarque extends Components.PMarque {}
@ProxyCmp({inputs: ['trademark']})
@Component({ selector: 'p-marque', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['trademark'] })
export class PMarque {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PPagination extends Components.PPagination {}
@ProxyCmp({inputs: ['activePage', 'allyLabel', 'allyLabelNext', 'allyLabelPage', 'allyLabelPrev', 'itemsPerPage', 'maxNumberOfPageLinks', 'theme', 'totalItemsCount']})
@Component({ selector: 'p-pagination', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['activePage', 'allyLabel', 'allyLabelNext', 'allyLabelPage', 'allyLabelPrev', 'itemsPerPage', 'maxNumberOfPageLinks', 'theme', 'totalItemsCount'] })
export class PPagination {
  pageChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pageChange']);
  }
}

export declare interface PRadioButtonWrapper extends Components.PRadioButtonWrapper {}
@ProxyCmp({inputs: ['hideLabel', 'label', 'message', 'state']})
@Component({ selector: 'p-radio-button-wrapper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hideLabel', 'label', 'message', 'state'] })
export class PRadioButtonWrapper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PSelectWrapper extends Components.PSelectWrapper {}
@ProxyCmp({inputs: ['hideLabel', 'label', 'message', 'state']})
@Component({ selector: 'p-select-wrapper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hideLabel', 'label', 'message', 'state'] })
export class PSelectWrapper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PSpinner extends Components.PSpinner {}
@ProxyCmp({inputs: ['size', 'theme']})
@Component({ selector: 'p-spinner', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['size', 'theme'] })
export class PSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PText extends Components.PText {}
@ProxyCmp({inputs: ['align', 'color', 'ellipsis', 'size', 'tag', 'theme', 'weight']})
@Component({ selector: 'p-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['align', 'color', 'ellipsis', 'size', 'tag', 'theme', 'weight'] })
export class PText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PTextFieldWrapper extends Components.PTextFieldWrapper {}
@ProxyCmp({inputs: ['hideLabel', 'label', 'message', 'state']})
@Component({ selector: 'p-text-field-wrapper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hideLabel', 'label', 'message', 'state'] })
export class PTextFieldWrapper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PTextareaWrapper extends Components.PTextareaWrapper {}
@ProxyCmp({inputs: ['hideLabel', 'label', 'message', 'state']})
@Component({ selector: 'p-textarea-wrapper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hideLabel', 'label', 'message', 'state'] })
export class PTextareaWrapper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
