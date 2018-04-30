import { Component, ViewEncapsulation, Input } from '@angular/core';
import { PuiBaseComponent } from '../../../shared';

@Component({
  selector: `pui-image-cover`,
  exportAs: 'puiImageCover',
  templateUrl: 'image-cover.component.html',
  styleUrls: ['../../../../../node_modules/@porsche/ui-kit-core/src/modules/image/image-cover.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PuiImageCoverComponent extends PuiBaseComponent {
  @Input() imageUrl = '';
}
