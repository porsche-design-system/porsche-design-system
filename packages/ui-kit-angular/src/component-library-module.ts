import {NgModule} from '@angular/core';
import {defineCustomElements} from '@porscheui/ui-kit-js/loader';

import {
  PButtonIcon,
  PButtonRegular,
  PFlex,
  PFlexItem,
  PGrid,
  PGridChild,
  PHeadline,
  PIcon,
  PPagination,
  PSpinner,
  PText,
  PTextLink,
  PTextList,
  PTextListItem
} from './directives/proxies';

(async () => {
  await defineCustomElements(window);
})();

const DECLARATIONS = [
  PButtonIcon,
  PButtonRegular,
  PFlex,
  PFlexItem,
  PGrid,
  PGridChild,
  PHeadline,
  PIcon,
  PPagination,
  PSpinner,
  PText,
  PTextLink,
  PTextList,
  PTextListItem
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class ComponentLibraryModule {
}
