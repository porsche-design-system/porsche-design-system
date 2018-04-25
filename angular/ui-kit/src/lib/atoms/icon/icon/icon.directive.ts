import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';

@Directive({
  selector: '[puiIcon]'
})
export class PuiIconDirective implements OnInit, OnChanges {

  @Input() puiIcon: String;

  constructor(private el: ElementRef) {

  }

  ngOnInit(): void {
    this.el.nativeElement.class += ' icon';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.puiIcon) {
      return;
    }

    this.setIconClass(changes.puiIcon);
  }

  /**
   * This method reacts on the dynamic change of the icon property.
   * For the initial loading the icon is just set. For further
   * changes the previous set icon is replaced.
   *
   */
  setIconClass(changes: SimpleChange) {
    const iconClass = `icon--${changes.currentValue}`;

    if (changes.firstChange) {
      this.el.nativeElement.class += ` ${iconClass}`;
    } else {
      const prevIconClass = `icon--${changes.previousValue}`;
      this.el.nativeElement.class = this.el.nativeElement.class.replace(prevIconClass, iconClass);
    }

  }

}
