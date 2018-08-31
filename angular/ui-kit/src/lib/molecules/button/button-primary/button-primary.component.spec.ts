import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiButtonPrimaryComponent } from './button-primary.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PuiIcon } from '../../../atoms';

describe('PuiButtonPrimaryComponent', () => {
  let component: PuiButtonPrimaryComponent;
  let fixture: ComponentFixture<PuiButtonPrimaryComponent>;
  let buttonElement: DebugElement;
  let linkButtonLement: DebugElement;
  let iconElement: DebugElement;
  let labelElement: DebugElement;

  function detectChanges() {
    fixture.detectChanges();

    buttonElement = fixture.debugElement.query(By.css('button.button-primary'));
    linkButtonLement = fixture.debugElement.query(By.css('a.button-primary'));
    iconElement = fixture.debugElement.query(By.css('.button-primary__icon'));
    labelElement = fixture.debugElement.query(By.css('.button-primary__label'));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiButtonPrimaryComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiButtonPrimaryComponent);
    component = fixture.componentInstance;
    detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(buttonElement).not.toEqual(null);
    expect(linkButtonLement).toEqual(null);
    expect(buttonElement.nativeElement.classList).not.toContain('button-primary--error');
    expect(buttonElement.nativeElement.classList).not.toContain('button-primary--black');
    expect(buttonElement.nativeElement.classList).not.toContain('button-primary--red');
    expect(buttonElement.nativeElement.classList).not.toContain('button-primary--acid-green');
    expect(buttonElement.nativeElement.classList).not.toContain('button-primary--stretch');
    expect(buttonElement.nativeElement.classList).not.toContain('button-primary--button-group');
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
    expect(buttonElement.nativeElement.classList).toContain('button-primary--stretch');
  });

  it('should show error state if error is set', () => {
    component.error = true;
    detectChanges();
    expect(buttonElement.nativeElement.classList).toContain('button-primary--error');
  });

  it('should show black state if black is set', () => {
    component.black = true;
    detectChanges();
    expect(buttonElement.nativeElement.classList).toContain('button-primary--black');
  });

  it('should show red state if red is set', () => {
    component.red = true;
    detectChanges();
    expect(buttonElement.nativeElement.classList).toContain('button-primary--red');
  });

  it('should show acid-green state if acidGreen is set', () => {
    component.acidGreen = true;
    detectChanges();
    expect(buttonElement.nativeElement.classList).toContain('button-primary--acid-green');
  });

  it('should show button-group state if buttonGroup is set', () => {
    component.buttonGroup = true;
    detectChanges();
    expect(buttonElement.nativeElement.classList).toContain('button-primary--button-group');
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
