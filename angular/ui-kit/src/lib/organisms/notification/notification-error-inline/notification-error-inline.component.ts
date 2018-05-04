import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'pui-notification-error-inline',
  templateUrl: './notification-error-inline.component.html',
  styleUrls: ['../../../../../node_modules/@porsche/ui-kit-core/src/modules/notification/notification-error-inline.scss']
})
export class PuiNotificationErrorInlineComponent {
  @Input() message: string;
  @Input() styleModifier = '';
}
