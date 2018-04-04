import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PuiHeadline2Component, PuiHeadline2Directive} from './h2';

describe('Headline 2', () => {
  let component: PuiHeadline2Component;
  let fixture: ComponentFixture<PuiHeadline2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiHeadline2Component, PuiHeadline2Directive ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiHeadline2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
