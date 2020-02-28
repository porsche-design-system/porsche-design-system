import {NgModule} from '@angular/core';
import {defineCustomElements, applyPolyfills} from '@porsche-design-system/components-js/loader';

import {
  PButton,
  PButtonPure,
  PCheckboxWrapper,
  PFlex,
  PFlexItem,
  PGrid,
  PGridItem,
  PHeadline,
  PIcon,
  PLink,
  PLinkPure,
  PMarque,
  PPagination,
  PRadioButtonWrapper,
  PSpinner,
  PText,
  PTextFieldWrapper,
  PSelectWrapper
} from './components-wrapper.component';

const DECLARATIONS = [
  PButton,
  PButtonPure,
  PCheckboxWrapper,
  PFlex,
  PFlexItem,
  PGrid,
  PGridItem,
  PHeadline,
  PIcon,
  PLink,
  PLinkPure,
  PMarque,
  PPagination,
  PRadioButtonWrapper,
  PSpinner,
  PText,
  PTextFieldWrapper,
  PSelectWrapper
];

export function ApplyPolyfillAndDefineCustomElements<T extends {new(...args:any[])}>(constructor:T) {
  (async () => {
    await applyPolyfills();
    await defineCustomElements(window);
  })();
  return constructor;
}

@ApplyPolyfillAndDefineCustomElements
@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class PorscheDesignSystemModule {}
