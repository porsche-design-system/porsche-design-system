import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-scroller-example',
  styles: [
    `
      .scroller > *:not(:last-child) {
        margin-right: 1rem;
      }

      #app > button {
        margin: 0 1rem 1rem 0;
      }
    `,
  ],
  template: `
    <button (click)="clickHandler(0, true)">Scroll to start</button>
    <button (click)="clickHandler(220, true)">Scroll to middle</button>
    <button (click)="clickHandler(720, true)">Scroll to end</button>
    <div style="max-width: 400px; white-space: nowrap">
      <p-scroller class="scroller" [scrollToPosition]="{scrollPosition, isSmooth}">
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

  clickHandler = (scrollPosition: number, isSmooth: boolean) => {
    this.scrollPosition = scrollPosition;
    this.isSmooth = isSmooth;
  };
}
