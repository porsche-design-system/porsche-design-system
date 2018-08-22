import { Component, ViewEncapsulation, Input } from '@angular/core';
import { PuiIcon } from './icon.enum';

@Component({
  selector: `pui-icon`,
  exportAs: 'puiIcon',
  templateUrl: 'icon.component.html',
  styleUrls: [
    '../../../../node_modules/@porsche/ui-kit-core/src/modules/icon/icon.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiIconComponent {
  @Input() icon: PuiIcon;
  @Input() styleModifier = '';
}
