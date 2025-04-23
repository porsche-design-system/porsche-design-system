import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-scroller-example',
  styles: [
    `
      p-scroller > *:not(:last-child) {
        margin-right: 1rem;
      }

      button {
        margin: 0 1rem 1rem 0;
      }
    `,
  ],
  template: `
    <p-button type="button" (click)="onClick(0)" [compact]="true">Scroll to start</p-button>
    <p-button type="button" (click)="onClick(220)" [compact]="true">Scroll to middle</p-button>
    <p-button type="button" (click)="onClick(720)" [compact]="true">Scroll to end</p-button>
    <div style="max-width: 400px; white-space: nowrap">
      <p-scroller [scrollToPosition]="{scrollPosition, isSmooth}">
        <p-tag-dismissible>START - some tag content</p-tag-dismissible>
        <p-tag-dismissible>MIDDLE - some tag content</p-tag-dismissible>
        <p-tag-dismissible>END - some tag content</p-tag-dismissible>
      </p-scroller>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class ScrollerExampleComponent {
  scrollPosition: number = 220;
  isSmooth: boolean = false;

  onClick = (scrollPosition: number) => {
    this.scrollPosition = scrollPosition;
    this.isSmooth = true;
  };
}
