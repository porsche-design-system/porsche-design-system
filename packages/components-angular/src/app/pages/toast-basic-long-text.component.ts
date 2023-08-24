/* Auto Generated File */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { componentsReady, ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-toast-basic-long-text',
  styles: [
    `
      .playground {
        height: 300px;
        padding: 0;
        transform: translateX(0);
        border: 1px solid deeppink;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render toast multiline message on light background">
      <p-toast></p-toast>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicLongTextComponent implements OnInit {
  public allReady: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    componentsReady().then(() => {
      this.allReady = true;
      this.cdr.markForCheck();
    });
  }
}
