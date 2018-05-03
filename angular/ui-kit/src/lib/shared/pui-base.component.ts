import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'pui-component',
  template: ''
})
export class PuiBaseComponent {
  private currentStyleModifier: string;

  @Input() set styleModifier(styleModifier: string) {
    const element = this.hostElement.nativeElement.firstElementChild;
    if (element === null) {
      return;
    }

    if (this.currentStyleModifier) {
      this.renderer.removeClass(element, this.currentStyleModifier);
    }
    this.renderer.addClass(element, styleModifier);
    this.currentStyleModifier = styleModifier;
  }

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}
}
