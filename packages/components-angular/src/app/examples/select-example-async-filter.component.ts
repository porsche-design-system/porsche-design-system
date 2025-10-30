import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PorscheDesignSystemModule, InputSearchInputEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-async-search',
  template: `
    <p-select name="async-search-select" label="Async Search" value="a">
      <p-input-search
        slot="filter"
        name="search"
        [value]="searchValue"
        [loading]="loading"
        [clear]="true"
        [indicator]="true"
        [compact]="true"
        autoComplete="off"
        (input)="onInput($event)"
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
export class SelectExampleAsyncFilterComponent {
  options: { value: string; label: string }[] = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ];
  searchValue: string = '';
  loading: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  private debounceTimer?: number;

  async loadOptions(term: string) {
    this.loading = true;
    this.cdRef.detectChanges();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.options = Array.from({ length: 3 }, (_, i) => ({
      value: `${term}-${i + 1}`,
      label: `Result ${i + 1} for "${term}"`,
    }));

    this.loading = false;
    this.cdRef.detectChanges();
  }

  onInput(event: CustomEvent<InputSearchInputEventDetail>) {
    const term = (event.detail.target as HTMLInputElement).value;
    this.searchValue = term;

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      if (term.trim()) {
        this.loadOptions(term.trim());
      } else {
        // reset default options
        this.options = [
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ];
      }
    }, 400);
  }
}
