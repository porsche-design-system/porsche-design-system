import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  type MultiSelectChangeEventDetail,
  PMultiSelect,
  PorscheDesignSystemModule,
} from '@porsche-design-system/components-angular';

type Option = { value: string; label: string; description: string; tags: string[]; imgSrc: string };

const optionsData: Option[] = [
  {
    value: '718',
    label: '718',
    description: 'Präziser Sportwagen mit Mittelmotor',
    tags: ['Benzin'],
    imgSrc: 'assets/718.png',
  },
  {
    value: '911',
    label: '911',
    description: 'Ikonischer Sportwagen mit Heckmotor',
    tags: ['Benzin'],
    imgSrc: 'assets/911.png',
  },
  {
    value: 'taycan',
    label: 'Taycan',
    description: 'Elektrischer Sportwagen',
    tags: ['Elektro'],
    imgSrc: 'assets/taycan.png',
  },
  {
    value: 'macan',
    label: 'Macan',
    tags: ['Elektro'],
    description: 'Sportlicher Kompakt-SUV',
    imgSrc: 'assets/macan.png',
  },
  {
    value: 'cayenne',
    label: 'Cayenne',
    tags: ['Hybrid', 'Benzin'],
    description: 'Vielseitiger SUV',
    imgSrc: 'assets/cayenne.png',
  },
  {
    value: 'panamera',
    label: 'Panamera',
    tags: ['Hybrid', 'Benzin'],
    description: 'Luxuslimousine mit hohem Komfort',
    imgSrc: 'assets/panamera.png',
  },
];

@Component({
  selector: 'porsche-design-system-app',
  template: `
    <p-multi-select
      name="selected-slot-select"
      label="Selected Slot"
      [value]="value"
      (change)="onChange($event)"
    >
    <span slot="selected" class="h-full flex items-center">
      <span class="truncate">{{ selectedLabels }}</span>
    </span>
      @for (option of options; track option.value) {
      <p-multi-select-option [value]="option.value">
        <div class="w-full flex gap-fluid-sm">
          <img [src]="option.imgSrc" alt="" class="h-[34px] w-auto self-center" />
          <div class="flex flex-col justify-center flex-1 min-w-0">
            <p class="prose-text-sm m-0">{{ option.label }}</p>
            <p class="prose-text-2xs m-0">{{ option.description }}</p>
          </div>
          <div class="self-center flex gap-fluid-sm">
            @for (tag of option.tags; track tag) {
              <p-tag color="info-soft" [compact]="true">{{ tag }}</p-tag>
            }
          </div>
        </div>
      </p-multi-select-option>
      }
    </p-multi-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class ExampleComponent {
  value: PMultiSelect['value'] = [];
  options: Option[] = optionsData;
  selectedOptions: Option[] = [];

  get selectedLabels(): string {
    return this.selectedOptions.map((option) => option.label).join(', ');
  }

  onChange(event: CustomEvent<MultiSelectChangeEventDetail>) {
    const { value } = event.detail;
    this.value = value;
    this.selectedOptions = this.options.filter((option) => (value as string[]).includes(option.value));
  }
}
