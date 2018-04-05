import {Component, Directive, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: `pui-h1`,
  exportAs: 'puiHeadline1',
  templateUrl: 'h1.html',
  styleUrls: [
    '../../../../node_modules/porsche-stylesheets/src/base/text-size/text-size.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiHeadline1Component {
  @Input() thin;
}

@Directive({
  selector: '[puiH1]'
})
export class PuiHeadline1Directive {
  protected elementClasses: string[] = [
    '-text-size-1-regular'
  ];

  @HostBinding('class')
  get elementClass(): string {
    return this.elementClasses.join(' ');
  }
}
