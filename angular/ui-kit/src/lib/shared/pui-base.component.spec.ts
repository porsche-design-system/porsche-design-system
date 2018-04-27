import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiBaseComponent } from './pui-base.component';

describe('PuiComponentComponent', () => {
  let component: PuiBaseComponent;
  let fixture: ComponentFixture<PuiBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
