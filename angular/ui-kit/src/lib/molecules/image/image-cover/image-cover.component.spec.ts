import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PuiImageCoverComponent} from './image-cover.component';
import {DebugElement} from '@angular/core';

describe('Image Cover Component', () => {
  let component: PuiImageCoverComponent;
  let fixture: ComponentFixture<PuiImageCoverComponent>;


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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set background image', () => {
    component.imageUrl = 'https://some.url';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.image-cover'));
    expect(element.nativeElement.style.backgroundImage).toEqual('url("https://some.url")');
  });
});
