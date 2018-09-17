import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pui-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['../../../../node_modules/@porsche/ui-kit-core/src/modules/callout/callout.scss']
})
export class PuiCalloutComponent {

  @Input() styleModifier: string;
  @Input() orientation: 'top' | 'bottom' = 'top';
  @Input() title: string;

  constructor() { }
}
