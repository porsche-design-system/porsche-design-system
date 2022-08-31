import { ChangeDetectionStrategy, Component } from '@angular/core';

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
    <button type="button" (click)="onClick(0)">Scroll to start</button>
    <button type="button" (click)="onClick(220)">Scroll to middle</button>
    <button type="button" (click)="onClick(720)">Scroll to end</button>
    <div style="max-width: 400px; white-space: nowrap">
      <p-scroller [scrollToPosition]="{scrollPosition, isSmooth}">
        <p-tag-dismissible>START - some tag content</p-tag-dismissible>
        <p-tag-dismissible>MIDDLE - some tag content</p-tag-dismissible>
        <p-tag-dismissible>END - some tag content</p-tag-dismissible>
      </p-scroller>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerExampleComponent {
  scrollPosition: number = 220;
  isSmooth: boolean = false;

  onClick = (scrollPosition: number) => {
    this.scrollPosition = scrollPosition;
    this.isSmooth = true;
  };
}
