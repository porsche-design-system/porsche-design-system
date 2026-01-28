import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  type FlagName,
  PorscheDesignSystemModule,
  type SelectChangeEventDetail,
} from '@porsche-design-system/components-angular';

type Option = { label: string; code: FlagName; continent: string };

const optionsData: Option[] = [
  {
    label: 'China',
    code: 'cn',
    continent: 'Asia',
  },
  {
    label: 'Japan',
    code: 'jp',
    continent: 'Asia',
  },
  {
    label: 'South Korea',
    code: 'kr',
    continent: 'Asia',
  },
  {
    label: 'Austria',
    code: 'at',
    continent: 'Europe',
  },
  {
    label: 'France',
    code: 'fr',
    continent: 'Europe',
  },
  {
    label: 'Germany',
    code: 'de',
    continent: 'Europe',
  },
  {
    label: 'Great Britain',
    code: 'gb',
    continent: 'Europe',
  },
  {
    label: 'Italy',
    code: 'it',
    continent: 'Europe',
  },
  {
    label: 'Portugal',
    code: 'pt',
    continent: 'Europe',
  },
  {
    label: 'Spain',
    code: 'es',
    continent: 'Europe',
  },

  {
    label: 'Canada',
    code: 'ca',
    continent: 'North America',
  },
  {
    label: 'USA',
    code: 'us',
    continent: 'North America',
  },
];

@Component({
  selector: 'page-select-example-selected-slot',
  template: `
    <p-select
      name="selected-slot-select"
      label="Selected Slot"
      [value]="value"
      (change)="onChange($event)"
    >
    <span slot="selected" class="h-full flex items-center gap-fluid-sm grow">
      @if (selectedOption) {
        <p-flag [name]="selectedOption.code"></p-flag>
        <p class="prose-text-sm truncate m-0">{{ selectedOption.label }}</p>
      }
    </span>
      @for (entry of optgroups; track entry[0]) {
        <p-optgroup [label]="entry[0]">
          @for (option of entry[1]; track option.code) {
            <p-select-option [value]="option.code">
              <div class="w-full flex items-center gap-fluid-sm">
                <p-flag [name]="option.code"></p-flag>
                <p class="prose-text-sm m-0">{{ option.label }}</p>
              </div>
            </p-select-option>
          }
        </p-optgroup>
      }
    </p-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class SelectExampleSelectedSlotComponent {
  value?: string;
  options: Option[] = optionsData;
  selectedOption?: Option;

  optgroups: [string, Option[]][] = Object.entries(
    this.options.reduce(
      (acc, item) => {
        const key = item.continent;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {} as Record<string, Option[]>
    )
  );

  onChange(event: CustomEvent<SelectChangeEventDetail>) {
    const value = (event.target as HTMLElement & { value: string }).value;
    this.value = value;
    this.selectedOption = this.options.find((option) => option.code === value);
  }
}
