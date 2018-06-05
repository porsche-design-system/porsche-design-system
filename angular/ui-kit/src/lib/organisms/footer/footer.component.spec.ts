import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiFooterComponent } from './footer.component';

describe('FooterUiComponent', () => {
  let component: PuiFooterComponent;
  let fixture: ComponentFixture<PuiFooterComponent>;

  // TODO: Adding tests for footer
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PuiFooterComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
