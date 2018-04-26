import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { PuiIconComponent, PuiIconDirective } from '.';

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
    component.icon = 'car-next';
    fixture.detectChanges();
    textElement = fixture.debugElement.query(By.css('span'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct classes', () => {
    expect(textElement.nativeElement.classList).toContain('icon');
    expect(textElement.nativeElement.classList).toContain('icon--car-next');
  });

  it('should update classes', () => {
    component.icon = 'arrow-left';
    fixture.detectChanges();
    expect(textElement.nativeElement.classList).toContain('icon');
    expect(textElement.nativeElement.classList).toContain('icon--arrow-left');
  });
});
