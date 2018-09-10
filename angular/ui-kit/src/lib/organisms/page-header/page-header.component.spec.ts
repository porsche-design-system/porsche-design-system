import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiPageHeaderComponent } from './page-header.component';
import { DebugElement, Component } from '@angular/core';

@Component({
  selector: `pui-page-header`,
  template: `
  <div>
    <pui-page-header>
      <span class="title">My Title</span>
      <ng-container class="description">My Description</ng-container>
    </pui-page-header>
   </div>
  `
})
class PuiPageHeaderMockComponent {}

describe('Page Header Component', () => {
  let component: PuiPageHeaderMockComponent;
  let fixture: ComponentFixture<PuiPageHeaderMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuiPageHeaderComponent, PuiPageHeaderMockComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiPageHeaderMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title', () => {
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.page-header__title'));
    expect(element.nativeElement.textContent).toEqual('<span>My Title</span>');
  });

  it('should set description', () => {
    fixture.detectChanges();
    const element = fixture.debugElement.query(
      By.css('.page-header__description')
    );
    expect(element.nativeElement.textContent).toEqual('My Description');
  });
});
