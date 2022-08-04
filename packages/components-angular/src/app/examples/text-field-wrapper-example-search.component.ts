import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'text-field-wrapper-example-search',
  template: `
    <p-text-field-wrapper
      label="Search location"
      hideLabel="true"
      actionIcon="locate"
      [actionLoading]="isLoading"
      (action)="onAction()"
    >
      <input type="search" [value]="value" [placeholder]="isLoading ? 'Locating...' : ''" (input)="onInput($event)" />
    </p-text-field-wrapper>
    <p-text>Value: {{ value }}</p-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldWrapperExampleSearchComponent {
  public value = '';
  public isLoading = false;

  constructor(private cdr: ChangeDetectorRef) {}

  public onAction() {
    this.isLoading = true;

    // simulate async request
    setTimeout(() => {
      this.value = 'Stuttgart, Baden-Württemberg';
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 3000);
  }

  public onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    if (this.isLoading) {
      this.isLoading = false;
    }
  }
}
