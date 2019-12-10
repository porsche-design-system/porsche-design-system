/* tslint:disable */
/* auto-generated angular directive proxies */
import { Component, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

function proxyInputs(Cmp: any, inputs: string[]) {
  const Prototype = Cmp.prototype;
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() { return this.el[item]; },
      set(val: any) { this.el[item] = val; },
    });
  });
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

import { Components } from '@porsche-ui/ui-kit-js'

export declare interface PButton extends Components.PButton {}
@Component({ selector: 'p-button', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'tabbable', 'theme', 'type', 'variant'] })
export class PButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PButton, ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'tabbable', 'theme', 'type', 'variant']);

export declare interface PButtonPure extends Components.PButtonPure {}
@Component({ selector: 'p-button-pure', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'size', 'tabbable', 'theme', 'type', 'weight'] })
export class PButtonPure {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PButtonPure, ['disabled', 'hideLabel', 'icon', 'iconSource', 'loading', 'size', 'tabbable', 'theme', 'type', 'weight']);

export declare interface PFlex extends Components.PFlex {}
@Component({ selector: 'p-flex', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['alignContent', 'alignItems', 'direction', 'inline', 'justifyContent', 'wrap'] })
export class PFlex {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PFlex, ['alignContent', 'alignItems', 'direction', 'inline', 'justifyContent', 'wrap']);

export declare interface PFlexItem extends Components.PFlexItem {}
@Component({ selector: 'p-flex-item', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['alignSelf', 'flex', 'grow', 'offset', 'shrink', 'width'] })
export class PFlexItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PFlexItem, ['alignSelf', 'flex', 'grow', 'offset', 'shrink', 'width']);

export declare interface PGrid extends Components.PGrid {}
@Component({ selector: 'p-grid', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['direction'] })
export class PGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PGrid, ['direction']);

export declare interface PGridItem extends Components.PGridItem {}
@Component({ selector: 'p-grid-item', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['offset', 'size'] })
export class PGridItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PGridItem, ['offset', 'size']);

export declare interface PHeadline extends Components.PHeadline {}
@Component({ selector: 'p-headline', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['align', 'color', 'ellipsis', 'tag', 'variant'] })
export class PHeadline {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PHeadline, ['align', 'color', 'ellipsis', 'tag', 'variant']);

export declare interface PIcon extends Components.PIcon {}
@Component({ selector: 'p-icon', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['color', 'lazy', 'name', 'size', 'source'] })
export class PIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PIcon, ['color', 'lazy', 'name', 'size', 'source']);

export declare interface PLink extends Components.PLink {}
@Component({ selector: 'p-link', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'target', 'theme', 'variant'] })
export class PLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PLink, ['download', 'hideLabel', 'href', 'icon', 'iconSource', 'rel', 'target', 'theme', 'variant']);

export declare interface PMarque extends Components.PMarque {}
@Component({ selector: 'p-marque', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['trademark'] })
export class PMarque {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PMarque, ['trademark']);

export declare interface PPagination extends Components.PPagination {}
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
proxyInputs(PPagination, ['activePage', 'itemsPerPage', 'label', 'labelNext', 'labelPage', 'labelPrev', 'pageRange', 'theme', 'totalItemsCount']);

export declare interface PSpinner extends Components.PSpinner {}
@Component({ selector: 'p-spinner', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['allyLabel', 'size', 'theme'] })
export class PSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PSpinner, ['allyLabel', 'size', 'theme']);

export declare interface PText extends Components.PText {}
@Component({ selector: 'p-text', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['align', 'color', 'ellipsis', 'size', 'tag', 'weight'] })
export class PText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PText, ['align', 'color', 'ellipsis', 'size', 'tag', 'weight']);

export declare interface PTextLink extends Components.PTextLink {}
@Component({ selector: 'p-text-link', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['color', 'download', 'href', 'icon', 'iconSource', 'rel', 'size', 'tag', 'target'] })
export class PTextLink {
  pClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pClick']);
  }
}
proxyInputs(PTextLink, ['color', 'download', 'href', 'icon', 'iconSource', 'rel', 'size', 'tag', 'target']);

export declare interface PTextList extends Components.PTextList {}
@Component({ selector: 'p-text-list', changeDetection: 0, template: '<ng-content></ng-content>', inputs: ['color', 'listType'] })
export class PTextList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(PTextList, ['color', 'listType']);

export declare interface PTextListItem extends Components.PTextListItem {}
@Component({ selector: 'p-text-list-item', changeDetection: 0, template: '<ng-content></ng-content>' })
export class PTextListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;
  }
}
