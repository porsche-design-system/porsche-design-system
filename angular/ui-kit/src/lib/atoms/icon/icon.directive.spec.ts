import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { PuiIconDirective } from '.';

@Component({
  template: `
    <span [puiIcon]="icon" id="directive"></span>
  `
})
class TestComponent {
  public icon = 'car-next';
}

describe('Text Size 1 - Directive', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, PuiIconDirective ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    directive = fixture.debugElement.query(By.css('#directive'));
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should set correct classes', () => {
    expect(directive.nativeElement.classList).toContain('icon');
    expect(directive.nativeElement.classList).toContain('icon--car-next');
  });

  it('should update classes', () => {
    component.icon = 'arrow-left';
    fixture.detectChanges();
    expect(directive.nativeElement.classList).toContain('icon');
    expect(directive.nativeElement.classList).toContain('icon--arrow-left');
  });
});
