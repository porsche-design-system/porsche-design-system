import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiButtonGhostComponent } from './button-ghost.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PuiButtonGhostComponent', () => {
  let component: PuiButtonGhostComponent;
  let fixture: ComponentFixture<PuiButtonGhostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiButtonGhostComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiButtonGhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
