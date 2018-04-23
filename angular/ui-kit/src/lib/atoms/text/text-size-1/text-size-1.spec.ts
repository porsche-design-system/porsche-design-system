import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiTextSize1Component } from './text-size-1.component';
import { PuiTextSize1Directive } from './text-size-1.directive';

describe('Headline 1', () => {
  let component: PuiTextSize1Component;
  let fixture: ComponentFixture<PuiTextSize1Component>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
