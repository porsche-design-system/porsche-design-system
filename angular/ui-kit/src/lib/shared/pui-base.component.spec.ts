import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiBaseComponent } from './pui-base.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'pui-test-component',
  template: '<div id="firstChild" class="someClass"></div>'
})
class PuiBaseTestComponent extends PuiBaseComponent {}

describe('PuiBaseComponent', () => {
  let component: PuiBaseTestComponent;
  let fixture: ComponentFixture<PuiBaseTestComponent>;
  let childElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiBaseTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiBaseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    childElement = fixture.debugElement.query(By.css('#firstChild'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize without class', () => {
    expect(childElement.nativeElement.classList.length).toEqual(1);
    expect(childElement.nativeElement.classList[0]).toEqual('someClass');
  });

  it('should update class attribute', () => {
    component.styleModifier = 'class1';
    fixture.detectChanges();
    expect(childElement.nativeElement.classList.length).toEqual(2);
    expect(childElement.nativeElement.classList[0]).toEqual('someClass');
    expect(childElement.nativeElement.classList[1]).toEqual('class1');
    component.styleModifier = 'class2';
    fixture.detectChanges();
    expect(childElement.nativeElement.classList.length).toEqual(2);
    expect(childElement.nativeElement.classList[0]).toEqual('someClass');
    expect(childElement.nativeElement.classList[1]).toEqual('class2');
  });
});
