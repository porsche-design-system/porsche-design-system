import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, type OnChanges } from '@angular/core';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseComponent implements OnChanges {
  protected el: HTMLElement;

  constructor(cdr: ChangeDetectorRef, elementRef: ElementRef) {
    cdr.detach();
    this.el = elementRef.nativeElement;
  }

  ngOnChanges(props: Record<string, { previousValue: any; currentValue: any; firstChange: boolean }>): void {
    for (const prop in props) {
      this.el[prop] = props[prop].currentValue;
    }
  }
}
