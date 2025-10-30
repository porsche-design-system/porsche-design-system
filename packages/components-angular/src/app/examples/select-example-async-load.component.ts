import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PorscheDesignSystemModule, SelectToggleEventDetail } from '@porsche-design-system/components-angular';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'page-select-example-async-load',
  template: `
    <p-select name="async-load-select" label="Async Load on Open" (toggle)="onToggle($event)">
      <p-input-search
        slot="filter"
        name="search"
        [loading]="loading"
        [clear]="true"
        [indicator]="true"
        [compact]="true"
        autoComplete="off"
      ></p-input-search>

      <p-select-option *ngFor="let opt of options" [value]="opt.value">
        {{ opt.label }}
      </p-select-option>
    </p-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, NgForOf],
})
export class SelectExampleAsyncLoadComponent {
  options: { value: string; label: string }[] = [];
  loading = false;
  private hasLoaded = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  onToggle(event: CustomEvent<SelectToggleEventDetail>) {
    const isOpen = event.detail.value;

    if (isOpen && !this.hasLoaded && this.options.length === 0) {
      this.loading = true;
      this.cdRef.detectChanges(); // immediately show loading spinner

      setTimeout(() => {
        this.options = [
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ];
        this.loading = false;
        this.hasLoaded = true;
        this.cdRef.detectChanges();
      }, 1000);
    }
  }
}
