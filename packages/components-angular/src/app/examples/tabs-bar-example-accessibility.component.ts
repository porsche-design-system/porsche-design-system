import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, TabsBarUpdateEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-tabs-bar-example-accessibility',
  styles: [
    `
      div[role='tabpanel'] {
        outline: 1px solid transparent;
        outline-offset: 2px;
        margin-top: 8px;
      }
      div[role='tabpanel']:focus {
        outline-color: #000;
      }
      div[role='tabpanel']:focus:not(:focus-visible) {
        outline-color: transparent;
      }
    `,
  ],
  template: `
    <p-tabs-bar [activeTabIndex]="tabIndex" (update)="onUpdate($event)">
      @for (tabPanel of tabPanels; track tabPanel; let i = $index) {
        <button type="button" [attr.id]="'tab-item-' + i" [attr.aria-controls]="'tab-panel-' + i">
          Tab {{ tabPanel }}
        </button>
      }
    </p-tabs-bar>

    @for (content of tabPanels; track content; let i = $index) {
      <div
        [attr.id]="'tab-panel-' + i"
        [hidden]="tabIndex !== i"
        [tabindex]="tabIndex === i ? 0 : -1"
        role="tabpanel"
        [attr.aria-labelledby]="'tab-item-' + i"
        >
        <p-text>Your content of Tab {{ i + 1 }}</p-text>
      </div>
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class TabsBarExampleAccessibilityComponent {
  tabIndex: number = 0;
  tabPanels: string[] = ['One', 'Two', 'Three'];

  onUpdate(e: CustomEvent<TabsBarUpdateEventDetail>) {
    this.tabIndex = e.detail.activeTabIndex;
  }
}
