/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-inline-notification',
  template: `
    <div class="playground light" title="should show inline-notification neutral on light background">
      <p-inline-notification [heading]="'Some neutral heading'" [description]="'Some description'"></p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification neutral on dark background">
      <p-inline-notification
        [heading]="'Some neutral heading'"
        [description]="'Some description'"
        [theme]="'dark'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification warning on light background">
      <p-inline-notification
        [heading]="'Some warning heading'"
        [description]="'Some description'"
        [state]="'warning'"
      ></p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification warning on dark background">
      <p-inline-notification
        [heading]="'Some warning heading'"
        [description]="'Some description'"
        [state]="'warning'"
        [theme]="'dark'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification success on light background">
      <p-inline-notification
        [heading]="'Some success heading'"
        [description]="'Some description'"
        [state]="'success'"
      ></p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification success on dark background">
      <p-inline-notification
        [heading]="'Some success heading'"
        [description]="'Some description'"
        [state]="'success'"
        [theme]="'dark'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification error on light background">
      <p-inline-notification
        [heading]="'Some error heading'"
        [description]="'Some description'"
        [state]="'error'"
      ></p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification error on dark background">
      <p-inline-notification
        [heading]="'Some error heading'"
        [description]="'Some description'"
        [state]="'error'"
        [theme]="'dark'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification with slotted content on light background">
      <p-inline-notification>
        <span slot="heading">Some slotted heading</span>
        Some slotted description with a <a [href]="'https://www.porsche.com/'">LINK</a> element.
      </p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification with slotted content on dark background">
      <p-inline-notification [theme]="'dark'">
        <span slot="heading">Some slotted heading</span>
        Some slotted description with a <a [href]="'https://www.porsche.com/'">LINK</a> element.
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
        style="width: 240px"
        [heading]="'Some heading with a very long text across multiple lines'"
        [description]="'Some description with a very long text across multiple lines'"
        [actionLabel]="'Some action label with custom icon'"
      ></p-inline-notification>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineNotificationComponent {}
