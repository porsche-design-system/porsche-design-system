import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PorscheDesignSystemModule, type SelectChangeEventDetail } from '@porsche-design-system/components-angular';

type Option = { value: string; label: string; description: string; tags: string[]; imgSrc: string };

const optionsData: Option[] = [
  {
    value: '718',
    label: '718',
    description: 'Präziser Sportwagen mit Mittelmotor',
    tags: ['Benzin'],
    imgSrc: 'http://localhost:3002/718.png',
  },
  {
    value: '911',
    label: '911',
    description: 'Ikonischer Sportwagen mit Heckmotor',
    tags: ['Benzin'],
    imgSrc: 'http://localhost:3002/911.png',
  },
  {
    value: 'taycan',
    label: 'Taycan',
    description: 'Elektrischer Sportwagen',
    tags: ['Elektro'],
    imgSrc: 'http://localhost:3002/taycan.png',
  },
  {
    value: 'macan',
    label: 'Macan',
    tags: ['Elektro'],
    description: 'Sportlicher Kompakt-SUV',
    imgSrc: 'http://localhost:3002/macan.png',
  },
  {
    value: 'cayenne',
    label: 'Cayenne',
    tags: ['Hybrid', 'Benzin'],
    description: 'Vielseitiger SUV',
    imgSrc: 'http://localhost:3002/cayenne.png',
  },
  {
    value: 'panamera',
    label: 'Panamera',
    tags: ['Hybrid', 'Benzin'],
    description: 'Luxuslimousine mit hohem Komfort',
    imgSrc: 'http://localhost:3002/panamera.png',
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
      <img [src]="selectedOption?.imgSrc" alt="" class="h-full w-auto" />
      <p class="prose-text-md truncate m-0">{{ selectedOption?.label }}</p>
      @for (tag of selectedOption?.tags; track tag) {
        <p-tag color="notification-info-soft" [compact]="true">{{ tag }}</p-tag>
      }
    </span>
      @for (option of options; track option.value) {
        <p-select-option [value]="option.value">
          <div class="flex items-center gap-fluid-sm">
            <img [src]="option.imgSrc" alt="" class="h-[34px] w-auto" />
            <div class="flex flex-col">
              <div class="flex items-center gap-fluid-sm">
                <p class="prose-text-md m-0">{{ option.label }}</p>
                @for (tag of option.tags; track tag) {
                  <p-tag color="notification-info-soft" [compact]="true">{{ tag }}</p-tag>
                }
              </div>
              <p class="prose-text-2xs m-0">{{ option.description }}</p>
            </div>
          </div>
        </p-select-option>
      }
    </p-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule, CommonModule],
})
export class SelectExampleSelectedSlotComponent {
  value?: string;
  options: Option[] = optionsData;
  selectedOption?: Option;

  onChange(event: CustomEvent<SelectChangeEventDetail>) {
    const value = (event.target as HTMLElement & { value: string }).value;
    this.value = value;
    this.selectedOption = this.options.find((option) => option.value === value);
  }
}
