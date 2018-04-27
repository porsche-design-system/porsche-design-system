import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PuiLoaderBaseComponent} from './loader-base.component';
import {DebugElement} from '@angular/core';

describe('Link Icon TextComponent', () => {
  let component: PuiLoaderBaseComponent;
  let fixture: ComponentFixture<PuiLoaderBaseComponent>;
  let loaderElement: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuiLoaderBaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiLoaderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loaderElement = fixture.debugElement.query(By.css('.loader-base'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show element with the correct class', () => {
    expect(loaderElement.nativeElement.classList).toContain('loader-base');
  });

  it('should set the correct class if loaderDark is set', () => {
    component.loaderDark = true;
    fixture.detectChanges();
    expect(loaderElement.nativeElement.classList).toContain('loader-base--dark');
  });
});
