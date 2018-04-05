import {Component, Directive, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: `pui-h2`,
  exportAs: 'puiHeadline2',
  templateUrl: 'h2.html',
  styleUrls: [
    '../../../../node_modules/porsche-stylesheets/src/base/text-size/text-size.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiHeadline2Component {
  @Input() thin;
}

@Directive({
  selector: '[puiH2]'
})
export class PuiHeadline2Directive {
  protected elementClasses: string[] = [
    '-text-size-2-regular'
  ];

  @HostBinding('class')
  get elementClass(): string {
    return this.elementClasses.join(' ');
  }
}
