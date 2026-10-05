import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { componentsReady } from '@porsche-design-system/components-angular';
import { getByRoleShadowed } from '@porsche-design-system/components-angular/testing';
import '@porsche-design-system/components-angular/jsdom-polyfill';
import { afterEach, beforeAll, beforeEach, expect, it } from 'vitest';

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

// Parses the markup into an inert template and drops its comment nodes instead of stripping `<!-- … -->` via regex,
// which can't reliably remove nested or overlapping comment sequences
const replaceHtmlComments = (input: string): string => {
  const template = document.createElement('template');
  template.innerHTML = input;
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_COMMENT);
  const comments: Comment[] = [];
  while (walker.nextNode()) {
    comments.push(walker.currentNode as Comment);
  }
  for (const comment of comments) {
    comment.remove();
  }
  return template.innerHTML;
};

beforeAll(() => {
  (window as any).PDS_SKIP_FETCH = true;
});

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [CommonModule],
    declarations: [EmptyComponent, SampleComponent],
  }).compileComponents();
});

afterEach(() => {
  TestBed.resetTestingModule();
  document.body.replaceChildren();
});

it('should return 0 when nothing is rendered', async () => {
  const fixture = TestBed.createComponent(EmptyComponent);
  document.body.appendChild(fixture.nativeElement);

  expect(await componentsReady()).toBe(0);
});

it('should return 1 after component is rendered initially', async () => {
  const fixture = TestBed.createComponent(SampleComponent);
  document.body.appendChild(fixture.nativeElement);
  expect(replaceHtmlComments(fixture.nativeElement.innerHTML)).toEqual('<p-button>Button 1</p-button>');

  expect(await componentsReady()).toBe(1);
  expect(replaceHtmlComments(fixture.nativeElement.innerHTML)).toEqual('<p-button class="hydrated">Button 1</p-button>');
});

it('should return 2 after button is clicked', async () => {
  const fixture = TestBed.createComponent(SampleComponent);
  document.body.appendChild(fixture.nativeElement);
  await componentsReady();

  const button = getByRoleShadowed('button');
  button.click();
  fixture.detectChanges();

  expect(await componentsReady()).toBe(2);
});
