import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-popover-example-controlled-ai-tag',
  template: `
    <p-popover [open]="isPopoverOpen" (dismiss)="onDismiss()">
      <p-tag color="background-frosted" icon="brain" slot="button">
        <button type="button" [attr.aria-expanded]="isPopoverOpen" (click)="onOpen()">
          AI-generated
        </button>
      </p-tag>
      <div class="xs:max-w-[220px] flex flex-col gap-fluid-sm py-[8px]">
        <p-heading size="medium" tag="h3">Content Credentials</p-heading>
        <p-text color="contrast-medium" size="xx-small" class="-mt-fluid-sm">Created by Porsche AG, 5th April 2025</p-text>
        <p-text color="contrast-high" size="xx-small">This image combines multiple elements. At least one of them was generated using an AI tool.</p-text>
        <dl class="prose-text-xs m-0">
          <dt class="m-0 text-contrast-medium">Created by</dt>
          <dd class="m-0 text-primary">Porsche AG</dd>
          <dt class="m-0 text-contrast-medium mt-fluid-sm">AI tools used</dt>
          <dd class="m-0 text-primary">Adobe Firefly</dd>
        </dl>
        <p-button type="button" variant="ghost" [compact]="true" [aria]="{ 'aria-label': 'Check content credentials'}">Check</p-button>
      </div>
    </p-popover>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class PopoverExampleControlledAiTagComponent {
  isPopoverOpen = false;

  onOpen() {
    this.isPopoverOpen = true;
  }
  onDismiss() {
    this.isPopoverOpen = false;
  }
}
