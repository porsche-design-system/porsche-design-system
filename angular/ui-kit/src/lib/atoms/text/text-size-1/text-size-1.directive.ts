import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: '[puiTextSize1]'
})
export class PuiTextSize1Directive {
  protected elementClasses: string[] = [
    '-text-size-1-regular'
  ];

  @HostBinding('class')
  get elementClass(): string {
    return this.elementClasses.join(' ');
  }
}
