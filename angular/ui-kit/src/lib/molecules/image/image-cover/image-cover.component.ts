import { Component, ViewEncapsulation, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: `pui-image-cover`,
  templateUrl: 'image-cover.component.html',
  styleUrls: ['../../../../../node_modules/@porsche/ui-kit-core/src/modules/image/image-cover.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PuiImageCoverComponent {
  @Input() imageUrl = '';
  @Input() styleModifier = '';
}
