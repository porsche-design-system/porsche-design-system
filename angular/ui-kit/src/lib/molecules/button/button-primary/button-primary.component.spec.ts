import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiButtonPrimaryComponent } from './button-primary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PuiButtonPrimaryComponent', () => {
  let component: PuiButtonPrimaryComponent;
  let fixture: ComponentFixture<PuiButtonPrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiButtonPrimaryComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiButtonPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
