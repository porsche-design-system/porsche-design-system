import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiNotificationErrorInlineComponent } from './notification-error-inline.component';
import { By } from '@angular/platform-browser';

describe('PuiNotificationErrorInlineComponent', () => {
  let component: PuiNotificationErrorInlineComponent;
  let fixture: ComponentFixture<PuiNotificationErrorInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiNotificationErrorInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiNotificationErrorInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show message', () => {
    component.message = 'Some error message';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.notification-error-inline'));

    expect(element).toBeDefined();
    expect(element.nativeElement.textContent).toEqual('Some error message');
  });
});
