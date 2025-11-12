import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-example-async-search',
  template: `
    <p-select
      name="async-search-select"
      label="Async Search"
      [value]="value"
      (change)="onChange($event)"
      (toggle)="onToggle($event)"
    >
      <p-input-search
        slot="filter"
        name="search"
        [value]="searchValue"
        [loading]="loading"
        [clear]="true"
        [indicator]="true"
        [compact]="true"
        [autoComplete]="'off'"
        (input)="onInput($event)"
        (blur)="$event.stopPropagation()"
        (change)="$event.stopPropagation()"
      ></p-input-search>

      <!-- Initial skeleton loading -->
      @if (initialLoading && !error) {
        <div *ngFor="let _ of [1,2,3,4,5,6]" class="skeleton h-[40px]"></div>
      }

      <!-- Options -->
      <p-select-option *ngFor="let opt of options" [value]="opt.value">
        {{ opt.label }}
      </p-select-option>

      <!-- No filter results -->
      @if (!initialLoading && options.length === 0 && !error) {
        <div
          class="text-contrast-medium cursor-not-allowed py-static-sm px-[12px]"
          aria-live="polite"
          role="option"
        >
          <span aria-hidden="true">–</span>
          <span class="sr-only">No results found</span>
        </div>
      }

      <!-- Error state -->
      @if (error) {
        <div
          class="flex gap-static-sm py-static-sm px-[12px]"
          aria-live="polite"
          role="alert"
        >
          <p-icon name="information" color="notification-error"></p-icon>
          <span class="text-error">{{ error }}</span>
        </div>
      }
    </p-select>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, CommonModule],
})
export class SelectExampleAsyncFilterComponent {
  value?: string;
  options: { value: string; label: string }[] = [];

  searchValue = '';
  initialLoading = false;
  loading = false;
  error: string | null = null;

  private hasLoadedOnce = false;
  private currentFetchId = 0;
  private debounceTimer?: number;

  constructor(private cdr: ChangeDetectorRef) {}

  async fetchOptions(term?: string, isInitial = false) {
    const fetchId = ++this.currentFetchId;
    if (isInitial) this.initialLoading = true;
    else this.loading = true;

    this.cdr.markForCheck();

    try {
      const url = term
        ? `https://jsonplaceholder.typicode.com/users?username_like=${term}`
        : `https://jsonplaceholder.typicode.com/users`;

      const res = await fetch(url);
      const data: { id: number; name: string; username: string }[] = await res.json();

      // Ignore stale results
      if (fetchId !== this.currentFetchId) return;

      this.options = data.map((user) => ({
        value: user.id.toString(),
        label: `${user.name} (${user.username})`,
      }));

      this.error = null;
      this.hasLoadedOnce = true;
    } catch (err) {
      console.error('Failed to fetch options', err);
      this.options = [];
      this.error = 'Failed to load options';
    } finally {
      if (isInitial) this.initialLoading = false;
      else this.loading = false;

      this.cdr.markForCheck();
    }
  }

  onInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchValue = term;

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      this.fetchOptions(term.trim() || undefined);
    }, 400);
  }

  onChange(event: CustomEvent) {
    this.value = (event.target as HTMLSelectElement).value;
  }

  onToggle(event: CustomEvent) {
    if (event.detail.open && !this.hasLoadedOnce) {
      this.fetchOptions(undefined, true);
    }
  }
}
