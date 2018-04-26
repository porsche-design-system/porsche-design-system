import {Component, ViewEncapsulation, Input} from '@angular/core';
import {PuiComponentComponent} from "../../../shared";

@Component({
  selector: `pui-text-size-1`,
  exportAs: 'puiTextSize1',
  templateUrl: 'text-size-1.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/base/text-size/text-size.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiTextSize1Component extends PuiComponentComponent {
  @Input() thin = false;
}
