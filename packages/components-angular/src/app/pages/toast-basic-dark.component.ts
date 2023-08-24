/* Auto Generated File */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { componentsReady, ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-toast-basic-dark',
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
    <div class="playground dark" title="should render toast info on dark background">
      <p-toast [theme]="'dark'"></p-toast>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicDarkComponent implements OnInit {
  public allReady: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    componentsReady().then(() => {
      this.allReady = true;
      this.cdr.markForCheck();
    });
  }
}
