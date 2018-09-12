import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { PuiIconComponent, PuiIconDirective } from '.';
import { PuiIcon } from './iconMap';

describe('Text Size 1 Component', () => {
  let component: PuiIconComponent;
  let fixture: ComponentFixture<PuiIconComponent>;
  let textElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiIconComponent, PuiIconDirective ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    textElement = fixture.debugElement.query(By.css('span'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct classes', async(() => {
    component.icon = PuiIcon.CAR_NEXT;
    fixture.detectChanges();
    expect(textElement.nativeElement.classList).toContain('icon');
    expect(textElement.nativeElement.classList).toContain('icon--car-next');
  }));

  it('should update classes', async(() => {
    component.icon = PuiIcon.ARROW_LEFT;
    fixture.detectChanges();
    expect(textElement.nativeElement.classList).toContain('icon');
    expect(textElement.nativeElement.classList).toContain('icon--arrow-left');
    component.icon = PuiIcon.CAR_NEXT;
    fixture.detectChanges();
    expect(textElement.nativeElement.classList).toContain('icon');
    expect(textElement.nativeElement.classList).toContain('icon--car-next');
  }));
});
