import { Component } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';
import { getByRoleShadowed } from '@porsche-design-system/components-angular/testing';
import { fireEvent, render } from '@testing-library/angular';
import '@porsche-design-system/components-angular/jsdom-polyfill';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeAll, expect, it } from 'vitest';

if (!HTMLElement.prototype.attachInternals) {
  Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
    value: function () {
      return {};
    },
    writable: true,
  });
}

@Component({
  selector: 'empty',
  template: `<div></div>`,
  standalone: false,
})
class EmptyComponent {}

@Component({
  selector: 'sample',
  template: `
    <p-button (click)="onClick()">Button 1</p-button>
    <p-button *ngIf="active">Button 2</p-button>
  `,
  standalone: false,
})
class SampleComponent {
  active = false;
  onClick() {
    this.active = true;
  }
}

const replaceHtmlComments = (input: string): string => input.replace(/<!--[\s\S]+?-->/g, '');

beforeAll(() => {
  (window as any).PDS_SKIP_FETCH = true;
});

afterEach(() => {
  TestBed.resetTestingModule();
});

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
  await render(SampleComponent);
  await componentsReady();

  const button = getByRoleShadowed('button');
  fireEvent.click(button);

  expect(await componentsReady()).toBe(2);
});
