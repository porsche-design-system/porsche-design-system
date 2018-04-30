import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiTextSize1Component } from './text-size-3.component';
import { PuiTextSize1Directive } from './text-size-3.directive';
import { DebugElement } from '@angular/core';

describe('Text Size 1 Component', () => {
  let component: PuiTextSize1Component;
  let fixture: ComponentFixture<PuiTextSize1Component>;
  let textElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiTextSize1Component, PuiTextSize1Directive ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiTextSize1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
    textElement = fixture.debugElement.query(By.css('h1'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show element with the correct class', () => {
    expect(textElement.nativeElement.classList).toContain('-text-size-1-regular');
  });

  it('should switch to correct thin class if input thin is set', () => {
    component.thin = true;
    fixture.detectChanges();
    expect(textElement.nativeElement.classList).toContain('-text-size-1-thin');
  });
});
