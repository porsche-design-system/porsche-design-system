import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: `pui-link-icon-text`,
  exportAs: 'puiLinkIconText',
  templateUrl: 'link-icon-text.component.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/link/link-icon-text.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiLinkIconTextComponent {
  @Input() linkUrl = '';
  @Input() linkText = '';
  @Input() labelBlack = false;
}
