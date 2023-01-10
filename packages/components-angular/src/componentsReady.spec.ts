import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { componentsReady, PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'empty',
  template: ` <div></div> `,
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

beforeEach(waitForAsync(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, PorscheDesignSystemModule],
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
  expect(fixture.nativeElement.innerHTML).toEqual('<p-button>Button 1</p-button><!--container-->');
  await componentsReady();

  expect(fixture.nativeElement.innerHTML).toEqual('<p-button class="hydrated">Button 1</p-button><!--container-->');
  expect(await componentsReady()).toBe(1);
});

it('should return 2 after button is clicked', async () => {
  const fixture = TestBed.createComponent(SampleComponent);
  await componentsReady();

  const button = fixture.debugElement.query(By.css('p-button')).nativeElement.shadowRoot.querySelector('button');
  button.click();
  fixture.detectChanges();

  expect(await componentsReady()).toBe(2);
});
