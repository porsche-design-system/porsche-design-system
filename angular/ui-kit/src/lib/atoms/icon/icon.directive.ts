import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostBinding
} from '@angular/core';
import {PuiIcon} from "./iconMap";

@Directive({
  selector: '[puiIcon]'
})
export class PuiIconDirective {
  private currentIcon: string = null;

  @HostBinding('class.icon')
  private iconClass = true;

  @Input() set puiIcon(icon: string) {
    if (this.currentIcon) {
      this.renderer.removeClass(this.hostElement.nativeElement, this.currentIcon);
    }

    this.currentIcon = icon;
    this.renderer.addClass(this.hostElement.nativeElement, this.currentIcon);
  }

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}
}
