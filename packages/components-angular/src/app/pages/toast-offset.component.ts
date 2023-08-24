/* Auto Generated File */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { componentsReady, ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-toast-offset',
  styles: [
    `
      .playground {
        height: 300px;
        padding: 0;
        transform: translateX(0);
        border: 1px solid deeppink;
      }
    
      p-toast {
        --p-toast-position-bottom: 200px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render toast info on light background with custom bottom position">
      <p-toast></p-toast>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastOffsetComponent implements OnInit {
  public allReady: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    componentsReady().then(() => {
      this.allReady = true;
      this.cdr.markForCheck();
    });
  }
}
