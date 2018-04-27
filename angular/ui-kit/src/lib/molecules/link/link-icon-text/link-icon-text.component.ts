import {Component, ViewEncapsulation, Input} from '@angular/core';
import {PuiBaseComponent} from '../../../shared';

@Component({
  selector: `pui-link-icon-text`,
  exportAs: 'puiLinkIconText',
  templateUrl: 'link-icon-text.component.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/icon/icon.scss',
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/link/link-icon-text.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiLinkIconTextComponent extends PuiBaseComponent {
  @Input() linkUrl = '';
  @Input() linkText = '';
  @Input() labelBlack = false;
}
