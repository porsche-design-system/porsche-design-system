import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMenuTree } from './footer.interfaces';
import { PuiFooterComponent } from './footer.component';

// tslint:disable-next-line:no-any
function expectFixtureHasDecendant(fixture: ComponentFixture<any>, selector: string): void {
  expectFixtureHasManyDecendants(fixture, selector);
}

// tslint:disable-next-line:no-any
function expectFixtureHasNoDecendant(fixture: ComponentFixture<any>, selector: string): void {
  expectFixtureHasManyDecendants(fixture, selector, 0, 0);
}

function expectFixtureHasManyDecendants(
  // tslint:disable-next-line:no-any
  fixture: ComponentFixture<any>,
  selector: string,
  minAmount = 1,
  maxAmount = Infinity
): void {
   const realAmount = fixture.debugElement.nativeElement.querySelectorAll(selector).length;

   const failOutput = `Number of elements with selector "${selector}" doesn't equal the expected value`;
   if (minAmount === maxAmount) {
     expect(realAmount).toBe(minAmount, failOutput);
   } else if (maxAmount > minAmount) {
     expect(realAmount).toBeGreaterThanOrEqual(minAmount, failOutput);
     expect(realAmount).toBeLessThanOrEqual(maxAmount, failOutput);
   } else {
     throw Error('maxAmount should be greater than or equal minAmount');
   }
}

describe('FooterUiComponent', () => {
  let component: PuiFooterComponent;
  let fixture: ComponentFixture<PuiFooterComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PuiFooterComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show component with default values', () => {
    expectFixtureHasNoDecendant(fixture, '.navigation-footer');
    expectFixtureHasNoDecendant(fixture, '.language-select');
    expectFixtureHasManyDecendants(fixture, '.footer__link', 2);
  });

  it('should show navigation', () => {
    component.showNavigation = true;
    component.menuTree = [
      { title: '', items: [{ title: '', url: '', key: '' }] },
      { title: '', items: [{ title: '', url: '', key: '' }, { title: '', url: '', key: '' }] }
    ] as FooterMenuTree;
    fixture.detectChanges();

    expectFixtureHasDecendant(fixture, '.navigation-footer');
    expectFixtureHasManyDecendants(fixture, '.navigation-footer__item-header', 2);
    expectFixtureHasManyDecendants(fixture, '.navigation-footer__submenu-link', 3);
  });

  it('should show footer link for china', () => {
    component.showFooterLinkChina = true;
    fixture.detectChanges();

    expectFixtureHasManyDecendants(fixture, '.footer__link', 3);
  });

  it('should show language chooser', () => {
    component.showLanguageChooser = true;
    component.languages = [{ name: '', value: '' }, { name: '', value: '' }];
    fixture.detectChanges();

    expectFixtureHasDecendant(fixture, '.language-select');
    expectFixtureHasManyDecendants(fixture, '.language-select option', 2);
  });
});
