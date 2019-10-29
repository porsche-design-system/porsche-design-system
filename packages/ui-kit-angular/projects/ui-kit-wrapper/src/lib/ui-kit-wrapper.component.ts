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

function proxyOutputs(instance: any, el: any, events: string[]) {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}

import { Components } from '@porsche-ui/ui-kit-js'

export declare interface PButtonIcon extends Components.PButtonIcon {}
@ProxyInputs(['disabled', 'href', 'icon', 'iconSource', 'label', 'loading', 'target', 'theme', 'type', 'variant'])
@Component({ selector: 'p-button-icon', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['disabled', 'href', 'icon', 'iconSource', 'label', 'loading', 'target', 'theme', 'type', 'variant'] })
export class PButtonIcon {
  pClick!: EventEmitter<CustomEvent>;
  pFocus!: EventEmitter<CustomEvent>;
  pBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pClick', 'pFocus', 'pBlur']);
  }
}

export declare interface PButtonRegular extends Components.PButtonRegular {}
@ProxyInputs(['disabled', 'href', 'icon', 'iconSource', 'loading', 'small', 'target', 'theme', 'type', 'variant'])
@Component({ selector: 'p-button-regular', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['disabled', 'href', 'icon', 'iconSource', 'loading', 'small', 'target', 'theme', 'type', 'variant'] })
export class PButtonRegular {
  pClick!: EventEmitter<CustomEvent>;
  pFocus!: EventEmitter<CustomEvent>;
  pBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pClick', 'pFocus', 'pBlur']);
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
@ProxyInputs(['direction', 'gap'])
@Component({ selector: 'p-grid', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['direction', 'gap'] })
export class PGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PGridChild extends Components.PGridChild {}
@ProxyInputs(['offset', 'size'])
@Component({ selector: 'p-grid-child', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['offset', 'size'] })
export class PGridChild {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PHeadline extends Components.PHeadline {}
@ProxyInputs(['align', 'color', 'ellipsis', 'tag', 'variant'])
@Component({ selector: 'p-headline', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['align', 'color', 'ellipsis', 'tag', 'variant'] })
export class PHeadline {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PIcon extends Components.PIcon {}
@ProxyInputs(['ariaLabel', 'color', 'icon', 'lazy', 'size', 'source'])
@Component({ selector: 'p-icon', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['ariaLabel', 'color', 'icon', 'lazy', 'size', 'source'] })
export class PIcon {
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
@ProxyInputs(['activePage', 'itemsPerPage', 'label', 'labelNext', 'labelPage', 'labelPrev', 'pageRange', 'theme', 'totalItemsCount'])
@Component({ selector: 'p-pagination', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['activePage', 'itemsPerPage', 'label', 'labelNext', 'labelPage', 'labelPrev', 'pageRange', 'theme', 'totalItemsCount'] })
export class PPagination {
  pClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pClick']);
  }
}

export declare interface PSpinner extends Components.PSpinner {}
@ProxyInputs(['allyLabel', 'size', 'theme'])
@Component({ selector: 'p-spinner', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['allyLabel', 'size', 'theme'] })
export class PSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PText extends Components.PText {}
@ProxyInputs(['align', 'color', 'ellipsis', 'tag', 'variant'])
@Component({ selector: 'p-text', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['align', 'color', 'ellipsis', 'tag', 'variant'] })
export class PText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PTextLink extends Components.PTextLink {}
@ProxyInputs(['color', 'download', 'href', 'icon', 'iconSource', 'rel', 'tag', 'target', 'variant'])
@Component({ selector: 'p-text-link', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['color', 'download', 'href', 'icon', 'iconSource', 'rel', 'tag', 'target', 'variant'] })
export class PTextLink {
  pClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pClick']);
  }
}

export declare interface PTextList extends Components.PTextList {}
@ProxyInputs(['color', 'listType'])
@Component({ selector: 'p-text-list', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['color', 'listType'] })
export class PTextList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface PTextListItem extends Components.PTextListItem {}
@Component({ selector: 'p-text-list-item', changeDetection: 0, template: '<ng-content></ng-content>' })
export class PTextListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
