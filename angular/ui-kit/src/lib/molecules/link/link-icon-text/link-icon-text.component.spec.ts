import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PuiLinkIconTextComponent} from './link-icon-text.component';
import {PuiIconComponent} from '../../../atoms/icon/icon.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

describe('Link Icon TextComponent', () => {
  let component: PuiLinkIconTextComponent;
  let icon: PuiIconComponent;
  let fixture: ComponentFixture<PuiLinkIconTextComponent>;
  let fixtureIcon: ComponentFixture<PuiIconComponent>;
  let linkElement: DebugElement;
  let linkLabelElement: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuiLinkIconTextComponent, PuiIconComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiLinkIconTextComponent);
    fixtureIcon = TestBed.createComponent(PuiIconComponent);
    component = fixture.componentInstance;
    icon = fixtureIcon.componentInstance;
    fixture.detectChanges();
    linkElement = fixture.debugElement.query(By.css('.link-icon-text'));
    linkLabelElement = fixture.debugElement.query(By.css('.link-icon-text__label'));
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
