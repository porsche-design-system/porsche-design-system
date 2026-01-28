import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { componentsReady, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

// TODO: remove karma tests since vitest is primary

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
    @if (active) {
      <p-button>Button 2</p-button>
    }
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

beforeEach(waitForAsync(() => {
  TestBed.configureTestingModule({
    imports: [PorscheDesignSystemModule],
    declarations: [EmptyComponent, SampleComponent],
  }).compileComponents();
}));

it('should return 0 when nothing is rendered', async () => {
  // we need to create something to bootstrap the design system via PorscheDesignSystemModule, which is calling load()
  TestBed.createComponent(EmptyComponent);

  expect(await componentsReady()).toBe(0);
});

it('should return 1 after component is rendered initially', async () => {
  const fixture = TestBed.createComponent(SampleComponent);
  expect(replaceHtmlComments(fixture.nativeElement.innerHTML)).toEqual('<p-button>Button 1</p-button>');

  expect(await componentsReady()).toBe(1);
  expect(replaceHtmlComments(fixture.nativeElement.innerHTML)).toEqual(
    '<p-button class="hydrated">Button 1</p-button>'
  );
});

it('should return 2 after button is clicked', async () => {
  const fixture = TestBed.createComponent(SampleComponent);
  await componentsReady();

  const button = fixture.debugElement.query(By.css('p-button')).nativeElement.shadowRoot.querySelector('button');
  button.click();
  fixture.detectChanges();

  expect(await componentsReady()).toBe(2);
});
