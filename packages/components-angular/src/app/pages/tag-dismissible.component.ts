/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tag-dismissible',
  styles: [
    `
      .playground {
        margin-bottom: -0.5rem;
      }
    
      p-tag-dismissible {
        margin-bottom: 0.5rem;
      }
    
      p-tag-dismissible:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should show different background colors on light background">
      <p-tag-dismissible>Default</p-tag-dismissible>
      <p-tag-dismissible [color]="'default'">Color default</p-tag-dismissible>
      <p-tag-dismissible [color]="'background-surface'">Color background-surface</p-tag-dismissible>
    </div>

    <div class="playground light surface" title="should show different background colors on light surface background">
      <p-tag-dismissible>Default</p-tag-dismissible>
      <p-tag-dismissible [color]="'default'">Color default</p-tag-dismissible>
      <p-tag-dismissible [color]="'background-surface'">Color background-surface</p-tag-dismissible>
    </div>

    <div class="playground light" title="should show different background colors and label on light background">
      <p-tag-dismissible [label]="'Some label'">Default</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'" [color]="'default'">Color default</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'" [color]="'background-surface'">Color background-surface</p-tag-dismissible>
    </div>

    <div
      class="playground light surface"
      title="should show different background colors and label on light surface background"
    >
      <p-tag-dismissible [label]="'Some label'">Default</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'" [color]="'default'">Color default</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'" [color]="'background-surface'">Color background-surface</p-tag-dismissible>
    </div>

    <div class="playground light" title="should apply custom styles for dedicated slotted content on light background">
      <p-tag-dismissible>
        Color default <b>bold</b>, <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text
      </p-tag-dismissible>
    </div>

    <div class="playground light" title="should show different multiline tags on light background">
      <div style="width: 250px; overflow: auto">
        <p-tag-dismissible>Text that is very long and will break into the next line</p-tag-dismissible>
        <p-tag-dismissible [label]="'Some label'">Text that is very long and will break into the next line</p-tag-dismissible>
        <p-tag-dismissible [label]="'Label that is very long and will break into the next line'">Short Text</p-tag-dismissible>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDismissibleComponent {}
