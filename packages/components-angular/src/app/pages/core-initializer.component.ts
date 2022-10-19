/* Auto Generated File */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-core-initializer',
  template: `
    <div class="playground light">
      <p-text-field-wrapper [label]="'Some Label'" [description]="'Some Description'">
        <input [type]="'text'" />
      </p-text-field-wrapper>

      <div *ngIf="allReady">
        <p-text-field-wrapper [label]="'Some Label'" [description]="'Some Description'">
          <input [type]="'text'" />
        </p-text-field-wrapper>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreInitializerComponent implements OnInit {
  public allReady: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    componentsReady().then(() => {
      this.allReady = true;
      this.cdr.markForCheck();
    });
  }
}
