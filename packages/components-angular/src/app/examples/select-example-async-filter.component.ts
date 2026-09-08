import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {
  type InputSearchInputEventDetail,
  PorscheDesignSystemModule,
  PSelect,
  type SelectChangeEventDetail,
  type SelectToggleEventDetail,
} from '@porsche-design-system/components-angular';

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

      <!-- Persistent status announcer for assistive technologies (keep always in the DOM) -->
      <div slot="options-status" class="sr-only" aria-live="polite" aria-atomic="true">{{ filterStatusMessage }}</div>

      <!-- Initial skeleton loading -->
      @if (initialLoading && !error) {
        @for (_ of [1,2,3,4,5,6,7,8,9]; track $index) {
          <div slot="options-status" class="skeleton h-[40px]"></div>
        }
      }

      <!-- Options -->
      @for (option of options; track option.value) {
        <p-select-option [value]="option.value">
          {{ option.label }}
        </p-select-option>
      }

      <!-- No filter results (visual only; announcements come from the live region) -->
      @if (!initialLoading && !loading && options.length === 0 && !error) {
        <div
          slot="options-status"
          class="text-contrast-medium cursor-not-allowed py-static-sm px-[12px]"
          aria-hidden="true"
        >
          –
        </div>
      }

      <!-- Error state -->
      @if (error) {
        <div
          slot="options-status"
          class="flex gap-static-sm py-static-sm px-[12px]"
          role="alert"
        >
          <p-icon name="information" color="error"></p-icon>
          <span class="text-error">{{ error }}</span>
        </div>
      }
    </p-select>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class SelectExampleAsyncFilterComponent {
  value?: PSelect['value'];
  options: { value: string; label: string }[] = [];

  searchValue = '';
  initialLoading = false;
  loading = false;
  error: string | null = null;
  filterStatusMessage = '';

  private hasLoadedOnce = false;
  private currentFetchId = 0;
  private debounceTimer?: number;

  constructor(private cdr: ChangeDetectorRef) {}

  async fetchOptions(term?: string, isInitial = false) {
    const fetchId = ++this.currentFetchId;
    if (isInitial) this.initialLoading = true;
    else this.loading = true;
    this.updateFilterStatusMessage();

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
      this.updateFilterStatusMessage();

      this.cdr.markForCheck();
    }
  }

  onInput(event: CustomEvent<InputSearchInputEventDetail>) {
    const term = (event.target as HTMLInputElement).value;
    this.searchValue = term;

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      this.fetchOptions(term.trim() || undefined);
    }, 400);
  }

  onChange(event: CustomEvent<SelectChangeEventDetail>) {
    this.value = event.detail.value;
  }

  onToggle(event: CustomEvent<SelectToggleEventDetail>) {
    if (event.detail.open && !this.hasLoadedOnce) {
      this.fetchOptions(undefined, true);
    }
  }

  private updateFilterStatusMessage(): void {
    if (this.error) {
      this.filterStatusMessage = '';
      return;
    }
    if (this.initialLoading || this.loading) {
      this.filterStatusMessage = 'Loading options';
      return;
    }
    const term = this.searchValue.trim();
    if (!term) {
      this.filterStatusMessage = '';
      return;
    }
    if (this.options.length === 0) {
      this.filterStatusMessage = 'No results found';
      return;
    }
    this.filterStatusMessage =
      this.options.length === 1 ? '1 result available' : `${this.options.length} results available`;
  }
}
