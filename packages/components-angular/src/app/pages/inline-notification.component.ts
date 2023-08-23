/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-inline-notification',
  template: `
    <div class="playground light" title="should show inline-notification info">
      <p-inline-notification [heading]="'Heading (state=info)'" [description]="'Description'"></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification info with slotted and deeply nested anchor">
      <p-inline-notification>
        <span slot="heading">Slotted heading (state=info)</span>
        <span>
          Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
          <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
        </span>
      </p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification info with state neutral">
      <p-inline-notification
        [state]="'neutral'"
        [heading]="'Heading (state=neutral)'"
        [description]="'Description'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification warning with slotted and deeply nested anchor">
      <p-inline-notification [state]="'warning'">
        <span slot="heading">Slotted heading (state=warning)</span>
        <span>
          Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
          <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
        </span>
      </p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification success">
      <p-inline-notification
        [heading]="'Heading (state=success)'"
        [description]="'Description'"
        [state]="'success'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification success with slotted and deeply nested anchor">
      <p-inline-notification [state]="'success'">
        <span slot="heading">Slotted heading (state=success)</span>
        <span>
          Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
          <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
        </span>
      </p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification error">
      <p-inline-notification
        [heading]="'Heading (state=error)'"
        [description]="'Description'"
        [state]="'error'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification error with slotted and deeply nested anchor">
      <p-inline-notification [state]="'error'">
        <span slot="heading">Slotted heading (state=error)</span>
        <span>
          Slotted description. And some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>,
          <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text.
        </span>
      </p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification with action button">
      <p-inline-notification
        [heading]="'Some heading with action button'"
        [description]="'Some description'"
        [actionLabel]="'Some action label'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification with loading action button">
      <p-inline-notification
        [heading]="'Some heading with action button'"
        [description]="'Some description'"
        [actionLabel]="'Some loading action label'"
        [actionLoading]="true"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification in persistent mode">
      <p-inline-notification
        [heading]="'Some persistent heading'"
        [description]="'Some description'"
        [persistent]="true"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification without dismiss button">
      <p-inline-notification
        [heading]="'Heading with dismissButton=false'"
        [description]="'Some description'"
        [dismissButton]="false"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification in persistent mode with action button">
      <p-inline-notification
        [heading]="'Some persistent heading with action button'"
        [description]="'Some description'"
        [persistent]="true"
        [actionLabel]="'Some action label with custom icon'"
        [actionIcon]="'refresh'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification with multiline heading and description">
      <p-inline-notification
        style="max-width: 15rem"
        [heading]="'Some heading with a very long text across multiple lines'"
        [description]="'Some description with a very long text across multiple lines'"
        [actionLabel]="'Some action label with custom icon'"
      ></p-inline-notification>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineNotificationComponent {}
