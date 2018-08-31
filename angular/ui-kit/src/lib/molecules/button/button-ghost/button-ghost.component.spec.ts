import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiButtonGhostComponent } from './button-ghost.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PuiIcon } from '../../../atoms';

describe('PuiButtonGhostComponent', () => {
  let component: PuiButtonGhostComponent;
  let fixture: ComponentFixture<PuiButtonGhostComponent>;
  let buttonElement: DebugElement;
  let linkButtonLement: DebugElement;
  let iconElement: DebugElement;
  let labelElement: DebugElement;

  function detectChanges() {
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button.button-ghost'));
    linkButtonLement = fixture.debugElement.query(By.css('a.button-ghost'));
    iconElement = fixture.debugElement.query(By.css('.button-ghost__icon'));
    labelElement = fixture.debugElement.query(By.css('.button-ghost__label'));
  }

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
    detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(buttonElement).not.toEqual(null);
    expect(linkButtonLement).toEqual(null);
    expect(buttonElement.nativeElement.classList).not.toContain('button-ghost--stretch');
    expect(buttonElement.nativeElement.classList).not.toContain('button-ghost--error');
    expect(buttonElement.nativeElement.classList).not.toContain('button-ghost--inverted');
    expect(buttonElement.nativeElement.disabled).toBeFalsy();
    expect(iconElement.nativeElement.classList).toContain('icon--arrow-right-hair');
    expect(labelElement.nativeElement.textContent).toEqual('');
  });

  it('should use link button if link is set', () => {
    component.link = true;
    detectChanges();
    expect(buttonElement).toEqual(null);
    expect(linkButtonLement).not.toEqual(null);
  });

  it('should stretch if stretch is set', () => {
    component.stretch = true;
    detectChanges();
    expect(buttonElement.nativeElement.classList).toContain('button-ghost--stretch');
  });

  it('should show error state if error is set', () => {
    component.error = true;
    detectChanges();
    expect(buttonElement.nativeElement.classList).toContain('button-ghost--error');
  });

  it('should show inverted state if inverted is set', () => {
    component.inverted = true;
    detectChanges();
    expect(buttonElement.nativeElement.classList).toContain('button-ghost--inverted');
  });

  it('should be disabled if disabled is set', () => {
    component.disabled = true;
    detectChanges();
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
  });

  it('should update icon class', () => {
    component.icon = PuiIcon.CAR_NEXT;
    detectChanges();
    expect(iconElement.nativeElement.classList).toContain('icon--car-next');
  });

  it('should update label content', () => {
    component.label = 'click me!';
    detectChanges();
    expect(labelElement.nativeElement.textContent).toEqual('click me!');
  });
});
