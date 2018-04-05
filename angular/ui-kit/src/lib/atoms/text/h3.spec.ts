import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PuiHeadline3Component, PuiHeadline3Directive} from './h3';

describe('Headline 3', () => {
  let component: PuiHeadline3Component;
  let fixture: ComponentFixture<PuiHeadline3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiHeadline3Component, PuiHeadline3Directive ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiHeadline3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
