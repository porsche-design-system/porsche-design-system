import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-core-initializer',
  template: `
    <div class="playground light">
      <p-text-field-wrapper [label]="'Some Label'" [description]="'Some Description'">
        <input type="text" />
      </p-text-field-wrapper>

      <p-text-field-wrapper *ngIf="isEnabled" [label]="'Some Label'" [description]="'Some Description'">
        <input type="text" />
      </p-text-field-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreInitializerComponent implements OnInit {
  public isEnabled = false;

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit() {
    setTimeout(() => {
      this.isEnabled = true;
      this.cdr.markForCheck();
    }, 1000);
  }
}
