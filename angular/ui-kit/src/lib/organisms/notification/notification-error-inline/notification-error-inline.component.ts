import { Component, OnInit, Input, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pui-notification-error-inline',
  templateUrl: './notification-error-inline.component.html',
  styleUrls: [
    '../../../../../node_modules/@porsche/ui-kit-core/src/modules/notification/notification-error-inline.scss',
    './notification-error-inline.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PuiNotificationErrorInlineComponent {
  @Input() message: string;
  @Input() styleModifier = '';
}
