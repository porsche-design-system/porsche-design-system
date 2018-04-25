import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiLinkIconTextComponent } from './link-icon-text.component';
import { DebugElement } from '@angular/core';

describe('Link Icon TextComponent', () => {
  let component: PuiLinkIconTextComponent;
  let fixture: ComponentFixture<PuiLinkIconTextComponent>;
  let linkElement: DebugElement;
  let linkLabelElement: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiLinkIconTextComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiLinkIconTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkElement = fixture.debugElement.query(By.css('link-icon-text'));
    linkLabelElement = fixture.debugElement.query(By.css('link-icon-text__label'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show element with the correct class', () => {
    expect(linkElement.nativeElement.classList).toContain('link-icon-text');
  });

  it('should set the correct text if linkText is set', () => {
    component.linkText = 'Test Link';
    fixture.detectChanges();
    expect(linkLabelElement.nativeElement.textContent).toContain('Test Link');
  });

  it('should set the correct url if linkUrl is set', () => {
    component.linkUrl = 'www.testurl.com';
    fixture.detectChanges();
    expect(linkElement.nativeElement.getAttribute('href')).toEqual('www.testurl.com');
  });
});
