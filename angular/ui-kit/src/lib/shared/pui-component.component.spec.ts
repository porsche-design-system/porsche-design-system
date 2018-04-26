import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiComponentComponent } from './pui-component.component';

describe('PuiComponentComponent', () => {
  let component: PuiComponentComponent;
  let fixture: ComponentFixture<PuiComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
