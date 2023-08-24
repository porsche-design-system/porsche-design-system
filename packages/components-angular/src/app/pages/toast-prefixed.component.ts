/* Auto Generated File */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { componentsReady, ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-toast-prefixed',
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
    <div class="playground light" title="should render prefixed toast info on light background">
      <my-prefix-p-toast p-toast></my-prefix-p-toast>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastPrefixedComponent implements OnInit {
  public allReady: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    componentsReady().then(() => {
      this.allReady = true;
      this.cdr.markForCheck();
    });
  }
}
