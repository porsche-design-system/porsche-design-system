import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'pui-text-size-3',
  exportAs: 'puiTextSize3',
  templateUrl: 'text-size-3.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/base/text-size/text-size.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiTextSize3Component {
  @Input() thin = false;
  @Input() white = false;
  @Input() styleModifier = '';
}
