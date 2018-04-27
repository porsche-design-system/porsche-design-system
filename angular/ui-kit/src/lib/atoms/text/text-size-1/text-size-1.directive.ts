import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[puiTextSize1]'
})
export class PuiTextSize1Directive {
  @HostBinding('class.-text-size-1-regular')
  protected regularClass = true;

  @HostBinding('class.-text-size-1-thin')
  protected thinClass = false;

  @Input() set thin(thin: boolean) {
    this.thinClass = thin;
    this.regularClass = !thin;
  }
}
