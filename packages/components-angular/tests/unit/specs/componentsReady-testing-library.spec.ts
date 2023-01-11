import { Component } from '@angular/core';
import { componentsReady } from '../../../projects/angular-wrapper/src/public-api';
import { render, fireEvent } from '@testing-library/angular';
import '@porsche-design-system/components-react/jsdom-polyfill';

@Component({
  selector: 'empty',
  template: `<div></div>`,
})
class EmptyComponent {}

@Component({
  selector: 'sample',
  template: `
    <p-button (click)="onClick()">Button 1</p-button>
    <p-button *ngIf="active">Button 2</p-button>
  `,
})
class SampleComponent {
  active = false;
  onClick() {
    this.active = true;
  }
}

const replaceHtmlComments = (input: string): string => input.replace(/<!--[\s\S]+?-->/, '');

it('should return 0 when nothing is rendered', async () => {
  await render(EmptyComponent);

  expect(await componentsReady()).toBe(0);
});

it('should return 1 after component is rendered initially', async () => {
  const { container } = await render(SampleComponent);
  expect(replaceHtmlComments(container.innerHTML)).toEqual('<p-button>Button 1</p-button>');

  expect(await componentsReady()).toBe(1);
  expect(replaceHtmlComments(container.innerHTML)).toEqual('<p-button class="hydrated">Button 1</p-button>');
});

it('should return 2 after button is clicked', async () => {
  const { container } = await render(SampleComponent);
  await componentsReady();

  const button = container.querySelector('p-button').shadowRoot.querySelector('button');
  fireEvent.click(button);

  expect(await componentsReady()).toBe(2);
});
