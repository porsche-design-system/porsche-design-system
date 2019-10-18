import {NgModule} from '@angular/core';
import {defineCustomElements, applyPolyfills} from '@porsche-ui/ui-kit-js/loader';

import {
  PButtonIcon,
  PButtonRegular,
  PFlex,
  PFlexItem,
  PGrid,
  PGridChild,
  PHeadline,
  PIcon,
  PMarque,
  PPagination,
  PSpinner,
  PText,
  PTextLink,
  PTextList,
  PTextListItem
} from './ui-kit-wrapper.component';

const DECLARATIONS = [
  PButtonIcon,
  PButtonRegular,
  PFlex,
  PFlexItem,
  PGrid,
  PGridChild,
  PHeadline,
  PIcon,
  PMarque,
  PPagination,
  PSpinner,
  PText,
  PTextLink,
  PTextList,
  PTextListItem
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
export class PorscheUIKitModule {}
