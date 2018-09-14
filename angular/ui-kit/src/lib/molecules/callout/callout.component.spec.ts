import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiCalloutComponent } from './callout.component';
import { By } from '@angular/platform-browser';

describe('CalloutComponent', () => {
  let component: PuiCalloutComponent;
  let fixture: ComponentFixture<PuiCalloutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiCalloutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiCalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle title changes', () => {
    let titleElement = fixture.debugElement.query(By.css('.callout__title'));

    expect(titleElement).toBeNull();

    component.title = 'Lorem ipsum';
    fixture.detectChanges();
    titleElement = fixture.debugElement.query(By.css('.callout__title'));

    expect(titleElement).not.toBeNull();
    expect(titleElement.nativeElement.textContent).toEqual('Lorem ipsum');
  });

  it('should handle orientation changes', () => {
    let calloutElement = fixture.debugElement.query(By.css('.callout'));

    expect(calloutElement.nativeElement.classList).toContain('callout--top');

    component.orientation = 'bottom';
    fixture.detectChanges();
    calloutElement = fixture.debugElement.query(By.css('.callout'));

    expect(calloutElement.nativeElement.classList).toContain('callout--bottom');

    component.orientation = 'top';
    fixture.detectChanges();
    calloutElement = fixture.debugElement.query(By.css('.callout'));

    expect(calloutElement.nativeElement.classList).toContain('callout--top');
  });
});
