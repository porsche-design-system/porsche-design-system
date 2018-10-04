import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostBinding,
  AfterViewInit
} from '@angular/core';
import { PuiIcon } from './index';

@Directive({
  selector: '[puiIcon]'
})
export class PuiIconDirective implements AfterViewInit {
  private currentIcon: PuiIcon = null;

  @HostBinding('class.icon')
  private iconClass = true;

  @Input() set puiIcon(icon: PuiIcon) {
    if (this.currentIcon) {
      this.renderer.removeClass(this.hostElement.nativeElement, this.currentIcon);
    }

    this.currentIcon = icon;
    this.updateClass();
  }

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

  ngAfterViewInit() {
    // we need to be sure that the class gets set,
    // if it's already defined before the view is
    // ready.
    this.updateClass();
  }

  private updateClass() {
    this.renderer.addClass(this.hostElement.nativeElement, this.currentIcon);
  }
}
