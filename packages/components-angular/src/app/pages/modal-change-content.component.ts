/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-modal-change-content',
  template: `
    <!DOCTYPE html>
    <html [lang]="'en'">
      <head>
        <meta [charset]="'UTF-8'" />
        <title>Title</title>
      </head>
      <body>
        <p-button [type]="'button'" [aria]="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
        <p-modal
          [heading]="'Some Heading'"
          [open]="true"
          [aria]="{ 'aria-label': 'Some Heading' }"
          [fullscreen]="{ base: true, s: false }"
        >
          <p-text>Some Content</p-text>
          <div style="height: 70vh"></div>
          <p-text>
            More Content
            <p>value</p>
          </p-text>
          <p-checkbox-wrapper [label]="'Some label'" [hideLabel]="false">
            <input class="input1" [type]="'checkbox'" [name]="'some-name-1'" />
          </p-checkbox-wrapper>
          <div style="height: 40vh"></div>
          <p-button-group>
            <p-button [type]="'button'">Save</p-button>
            <p-button [type]="'button'" [variant]="'tertiary'" [icon]="'close'">Close</p-button>
          </p-button-group>
        </p-modal>
    </body>
    </html>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalChangeContentComponent implements OnInit {
  ngOnInit() {
    load();

        const debugElement = document.querySelector('p');
        (debugElement as any).innerText = 'hello world';

        const modal = document.querySelector('p-modal');
        modal.addEventListener('dismiss', () => {
          (modal as any).open = false;
        });
        document.querySelector('p-button').addEventListener('click', () => ((modal as any).open = true));
        document.querySelector('.input1').addEventListener('click', () => ((debugElement as any).innerText = 'Checkbox change'));
  }
}
