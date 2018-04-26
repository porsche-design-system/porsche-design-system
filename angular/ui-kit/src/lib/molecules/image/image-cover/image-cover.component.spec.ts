import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PuiImageCoverComponent} from './image-cover.component';
import {DebugElement} from '@angular/core';

describe('Link Icon TextComponent', () => {
  let component: PuiImageCoverComponent;
  let fixture: ComponentFixture<PuiImageCoverComponent>;
  let linkElement: DebugElement;
  let linkLabelElement: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuiImageCoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiImageCoverComponent);
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
    component.imageUrl = 'Test Link';
    fixture.detectChanges();
    expect(linkLabelElement.nativeElement.textContent).toContain('Test Link');
  });
});
