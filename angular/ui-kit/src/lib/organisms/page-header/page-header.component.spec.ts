import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiPageHeaderComponent } from './page-header.component';
import { DebugElement } from '@angular/core';

describe('Page Header Component', () => {
  let component: PuiPageHeaderComponent;
  let fixture: ComponentFixture<PuiPageHeaderComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuiPageHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title', () => {
    component.title = 'Some title';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.page-header__title'));
    expect(element.nativeElement.textContent).toEqual('Some title');
  });

  it('should set description', () => {
    component.description = 'Some description';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.page-header__description'));
    expect(element.nativeElement.textContent).toEqual('Some description');
  });
});
