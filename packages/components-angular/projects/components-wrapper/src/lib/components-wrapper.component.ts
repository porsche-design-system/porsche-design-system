/* tslint:disable */
/* auto-generated angular directive proxies */
import { Component, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

export function ProxyInputs(inputs: string[]) {
  const decorator = function <T extends {new(...args:any[])}>(constructor:T) {
    const Prototype = constructor.prototype;
    inputs.forEach((item) => {
      Object.defineProperty(Prototype, item, {
        get() { return this.el[item]; },
        set(val: any) { this.el[item] = val; },
      });
    });
    return constructor;
  };
  return decorator;
}

function proxyMethods(Cmp: any, methods: string[]) {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function() {
      const args = arguments;
      return this.el.componentOnReady().then((el: any) => el[methodName].apply(el, args));
    };
  });
}

function proxyOutputs(instance: any, el: any, events: string[]) {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}

import { Components } from '@porsche-design-system/components-js'
export declare interface PButton extends Components.PButton {}
@ProxyInputs(['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'tabbable', 'theme', 'type', 'variant'])

@Component({ selector: 'p-button', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'tabbable', 'theme', 'type', 'variant'] })
export class PButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PButtonPure extends Components.PButtonPure {}
@ProxyInputs(['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'size', 'tabbable', 'theme', 'type', 'weight'])

@Component({ selector: 'p-button-pure', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'size', 'tabbable', 'theme', 'type', 'weight'] })
export class PButtonPure {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PFlex extends Components.PFlex {}
@ProxyInputs(['alignContent', 'alignItems', 'direction', 'inline', 'justifyContent', 'wrap'])

@Component({ selector: 'p-flex', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['alignContent', 'alignItems', 'direction', 'inline', 'justifyContent', 'wrap'] })
export class PFlex {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PFlexItem extends Components.PFlexItem {}
@ProxyInputs(['alignSelf', 'flex', 'grow', 'offset', 'shrink', 'width'])

@Component({ selector: 'p-flex-item', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['alignSelf', 'flex', 'grow', 'offset', 'shrink', 'width'] })
export class PFlexItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PGrid extends Components.PGrid {}
@ProxyInputs(['direction'])

@Component({ selector: 'p-grid', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['direction'] })
export class PGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PGridItem extends Components.PGridItem {}
@ProxyInputs(['offset', 'size'])

@Component({ selector: 'p-grid-item', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['offset', 'size'] })
export class PGridItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PHeadline extends Components.PHeadline {}
@ProxyInputs(['align', 'color', 'ellipsis', 'tag', 'theme', 'variant'])

@Component({ selector: 'p-headline', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['align', 'color', 'ellipsis', 'tag', 'theme', 'variant'] })
export class PHeadline {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PIcon extends Components.PIcon {}
@ProxyInputs(['color', 'lazy', 'name', 'size', 'source', 'theme'])

@Component({ selector: 'p-icon', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['color', 'lazy', 'name', 'size', 'source', 'theme'] })
export class PIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PLink extends Components.PLink {}
@ProxyInputs(['download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'target', 'theme', 'variant'])

@Component({ selector: 'p-link', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'target', 'theme', 'variant'] })
export class PLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PLinkPure extends Components.PLinkPure {}
@ProxyInputs(['active', 'download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'size', 'target', 'theme', 'weight'])

@Component({ selector: 'p-link-pure', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['active', 'download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'size', 'target', 'theme', 'weight'] })
export class PLinkPure {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PMarque extends Components.PMarque {}
@ProxyInputs(['trademark'])

@Component({ selector: 'p-marque', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['trademark'] })
export class PMarque {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PPagination extends Components.PPagination {}
@ProxyInputs(['activePage', 'allyLabel', 'allyLabelNext', 'allyLabelPage', 'allyLabelPrev', 'itemsPerPage', 'maxNumberOfPageLinks', 'theme', 'totalItemsCount'])

@Component({ selector: 'p-pagination', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['activePage', 'allyLabel', 'allyLabelNext', 'allyLabelPage', 'allyLabelPrev', 'itemsPerPage', 'maxNumberOfPageLinks', 'theme', 'totalItemsCount'] })
export class PPagination {
  pageChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pageChange']);
  }
}
export declare interface PSpinner extends Components.PSpinner {}
@ProxyInputs(['size', 'theme'])

@Component({ selector: 'p-spinner', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['size', 'theme'] })
export class PSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PText extends Components.PText {}
@ProxyInputs(['align', 'color', 'ellipsis', 'size', 'tag', 'theme', 'weight'])

@Component({ selector: 'p-text', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['align', 'color', 'ellipsis', 'size', 'tag', 'theme', 'weight'] })
export class PText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
export declare interface PTextareaWrapper extends Components.PTextareaWrapper {}
@ProxyInputs(['hideLabel', 'label', 'message', 'state'])

@Component({ selector: 'p-textarea-wrapper', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['hideLabel', 'label', 'message', 'state'] })
export class PTextareaWrapper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
