import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-scroller-example',
  styles: [
    `
      .scroller > span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        width: 300px;
        border: 1px solid deeppink;
      }

      .scroller > span:not(:last-child) {
        margin-right: 1rem;
      }

      p-button {
        padding: 0 1rem 1rem 0;
      }
    `,
  ],
  template: `
    <button (click)="clickHandler(0, true)">Scroll to start</button>
    <button (click)="clickHandler(290, true)">Scroll to middle</button>
    <button (click)="clickHandler(900, true)">Scroll to end</button>
    <div style="max-width: 600px">
      <p-scroller class="scroller" [isFocusable]="true" [scrollToPosition]="{scrollPosition, isSmooth}">
        <span>Start</span>
        <span>Middle</span>
        <span>End</span>
      </p-scroller>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerExampleComponent {
  scrollPosition: number = 290;
  isSmooth: boolean = false;

  clickHandler = (scrollPosition: number, isSmooth: boolean) => {
    this.scrollPosition = scrollPosition;
    this.isSmooth = isSmooth;
  };
}
