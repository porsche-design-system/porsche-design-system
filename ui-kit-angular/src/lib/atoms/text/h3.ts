import {Component, Directive, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: `pui-h3`,
  exportAs: 'puiHeadline3',
  templateUrl: 'h3.html',
  styleUrls: [
    '../../../../node_modules/porsche-stylesheets/src/base/text-size/text-size.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiHeadline3Component {
  @Input() thin;
}

@Directive({
  selector: '[puiH3]'
})
export class PuiHeadline3Directive {
  protected elementClasses: string[] = [
    '-text-size-3-regular'
  ];

  @HostBinding('class')
  get elementClass(): string {
    return this.elementClasses.join(' ');
  }
}
