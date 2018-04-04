import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PuiHeadline1Component, PuiHeadline1Directive} from './h1';

describe('Headline 1', () => {
  let component: PuiHeadline1Component;
  let fixture: ComponentFixture<PuiHeadline1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiHeadline1Component, PuiHeadline1Directive ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiHeadline1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
