import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiButtonPrimaryComponent } from './button-primary.component';

describe('PuiButtonPrimaryComponent', () => {
  let component: PuiButtonPrimaryComponent;
  let fixture: ComponentFixture<PuiButtonPrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiButtonPrimaryComponent ]
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
