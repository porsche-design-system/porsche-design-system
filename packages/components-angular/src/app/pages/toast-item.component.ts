import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-toast-item',
  template: `
    <div class="playground light" title="should render toast neutral on light background">
      <p-toast-item [message]="'Some neutral message'" [state]="'neutral'"></p-toast-item>
    </div>

    <div class="playground dark" title="should render toast neutral on dark background">
      <p-toast-item [message]="'Some neutral message'" [state]="'neutral'" [theme]="'dark'"></p-toast-item>
    </div>

    <div class="playground light" title="should render toast success on light background">
      <p-toast-item [message]="'Some success message'" [state]="'success'"></p-toast-item>
    </div>

    <div class="playground dark" title="should render toast success on dark background">
      <p-toast-item [message]="'Some success message'" [state]="'success'" [theme]="'dark'"></p-toast-item>
    </div>

    <div class="playground light" title="should render toast multiline message on light background">
      <p-toast-item
        [message]="'Some message with a very long text across multiple lines'"
        style="width: 240px"
      ></p-toast-item>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastItemComponent {}
