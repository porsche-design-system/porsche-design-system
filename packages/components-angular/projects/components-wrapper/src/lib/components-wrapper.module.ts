import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { defineCustomElements, applyPolyfills } from '@porsche-design-system/components-js/loader';
import { PREVENT_WEB_COMPONENTS_REGISTRATION } from './prevent-web-components-registration.token';

import {
  PContentWrapper,
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
  PLinkSocial,
  PMarque,
  PPagination,
  PRadioButtonWrapper,
  PSelectWrapper,
  PSpinner,
  PText,
  PTextList,
  PTextListItem,
  PTextFieldWrapper,
  PTextareaWrapper,
  PFieldsetWrapper,
  PDivider
} from './components-wrapper.component';

const DECLARATIONS = [
  PContentWrapper,
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
  PLinkSocial,
  PMarque,
  PPagination,
  PRadioButtonWrapper,
  PSelectWrapper,
  PSpinner,
  PText,
  PTextList,
  PTextListItem,
  PTextFieldWrapper,
  PTextareaWrapper,
  PFieldsetWrapper,
  PDivider
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class PorscheDesignSystemModule {
  constructor(
    @Inject(PREVENT_WEB_COMPONENTS_REGISTRATION) preventWebComponentsRegistration: boolean,
    @Optional() @SkipSelf() porscheDesignSystemModule: PorscheDesignSystemModule
  ) {
    /**
     * prevent registration of components js web components if this is not the first
     * instance of this module or if it's prevented explicitly via
     * PREVENT_WEB_COMPONENTS_REGISTRATION inject token
     */
    if (!preventWebComponentsRegistration && !porscheDesignSystemModule) {
      (async () => {
        await applyPolyfills();
        await defineCustomElements(window);
      })();
    }
  }
}
