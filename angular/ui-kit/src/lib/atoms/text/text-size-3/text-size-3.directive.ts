import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[puiTextSize3]'
})
export class PuiTextSize3Directive {
  @HostBinding('class.-text-size-3-regular')
  protected regularClass = true;

  @HostBinding('class.-text-size-3-thin')
  protected thinClass = false;

  @HostBinding('class.-text-color-white')
  protected whiteClass = false;

  @Input() set thin(thin: boolean) {
    this.thinClass = thin;
    this.regularClass = !thin;
  }
  @Input() set white(white: boolean) {
    this.whiteClass= white;
  }
}
