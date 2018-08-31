import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiInputComponent } from './input.component';
import { PuiInputModule } from './input.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PuiIcon } from '../../../atoms';

describe('InputComponent', () => {
  let component: PuiInputComponent;
  let fixture: ComponentFixture<PuiInputComponent>;
  let wrappingElement: DebugElement, iconElement: DebugElement, inputElement: DebugElement, labelElement: DebugElement;

  function detectChanges() {
    fixture.detectChanges();

    wrappingElement = fixture.debugElement.query(By.css('.input'));
    iconElement = fixture.debugElement.query(By.css('.input__icon'));
    inputElement = fixture.debugElement.query(By.css('.input__field'));
    labelElement = fixture.debugElement.query(By.css('.input__label'));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PuiInputModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    detectChanges();

    expect(wrappingElement.nativeElement.classList).toContain('input');
    expect(wrappingElement.nativeElement.classList.length).toEqual(1);
    expect(iconElement).toBe(null);
    expect(inputElement.nativeElement.classList).not.toContain('input__field--error');
    expect(inputElement.nativeElement.type).toEqual('text');
    expect(inputElement.nativeElement.name).toEqual('');
    expect(inputElement.nativeElement.value).toEqual('');
    expect(inputElement.nativeElement.placeholder).toEqual('');
    expect(inputElement.nativeElement.disabled).toBeFalsy();
    expect(inputElement.nativeElement.readOnly).toBeFalsy();
    expect(labelElement.nativeElement.textContent).toEqual('');
  });

  it('should handle styleModifier parameter', () => {
    component.styleModifier = 'some-class';

    detectChanges();

    expect(wrappingElement.nativeElement.classList).toContain('some-class');
  });

  it('should handle icon parameter', () => {
    component.icon = PuiIcon.CAR_NEXT;

    detectChanges();

    expect(iconElement.nativeElement.className).toContain(PuiIcon.CAR_NEXT);
  });

  it('should handle error parameter', () => {
    component.error = true;

    detectChanges();

    expect(inputElement.nativeElement.classList).toContain('input__field--error');
  });

  it('should handle type parameter', () => {
    component.type = 'password';

    detectChanges();

    expect(inputElement.nativeElement.type).toEqual('password');
  });

  it('should handle name parameter', () => {
    component.name = 'some name';

    detectChanges();

    expect(inputElement.nativeElement.name).toEqual('some name');
  });

  it('should handle value parameter', () => {
    component.value = 'some value';

    detectChanges();

    expect(inputElement.nativeElement.value).toEqual('some value');
  });

  it('should handle label parameter', () => {
    component.label = 'some label';

    detectChanges();

    expect(labelElement.nativeElement.textContent).toEqual('some label');
  });

  it('should handle disabled parameter', () => {
    component.disabled = true;

    detectChanges();

    expect(inputElement.nativeElement.disabled).toBeTruthy('asdf');
    expect(inputElement.nativeElement.readOnly).toBeTruthy('hhhhh');
  });
});
