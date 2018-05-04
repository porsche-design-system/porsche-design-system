import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiTextSize3Directive } from './text-size-3.directive';
import { Component, DebugElement } from '@angular/core';

@Component({
  template: `
    <span puiTextSize3 id="element1"></span>
    <span puiTextSize3 id="element2" class="a" [thin]="thin"></span>
  `
})
class TestComponent {
  public thin = false;
}

describe('Text Size 3 - Directive', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element1: DebugElement;
  let element2: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, PuiTextSize3Directive]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    element1 = fixture.debugElement.query(By.css('#element1'));
    element2 = fixture.debugElement.query(By.css('#element2'));
  });

  it('should add the correct class to the element', () => {
    expect(element1.nativeElement.classList).toContain('-text-size-3-regular');
    expect(element1.nativeElement.classList).not.toContain('-text-size-3-thin');
    expect(element2.nativeElement.classList).toContain('-text-size-3-regular');
    expect(element2.nativeElement.classList).not.toContain('-text-size-3-thin');
  });

  it('should switch to correct thin class if input thin is set', () => {
    component.thin = true;
    fixture.detectChanges();
    expect(element1.nativeElement.classList).toContain('-text-size-3-regular');
    expect(element1.nativeElement.classList).not.toContain('-text-size-3-thin');
    expect(element2.nativeElement.classList).toContain('-text-size-3-thin');
    expect(element2.nativeElement.classList).not.toContain('-text-size-3-regular');
  });

  it('should keep existing classes on the element', () => {
    expect(element2.nativeElement.classList).toContain('a');
    expect(element2.nativeElement.classList).toContain('-text-size-3-regular');
    component.thin = true;
    fixture.detectChanges();
    expect(element2.nativeElement.classList).toContain('a');
    expect(element2.nativeElement.classList).toContain('-text-size-3-thin');
  });
});
