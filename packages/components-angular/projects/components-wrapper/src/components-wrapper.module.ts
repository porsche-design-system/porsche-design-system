import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { componentsReady, load } from '@porsche-design-system/components-js';
import { PREVENT_WEB_COMPONENTS_REGISTRATION, WEB_COMPONENTS_PREFIX } from './injection.tokens';

import {
  PBanner,
  PButton,
  PButtonPure,
  PCheckboxWrapper,
  PContentWrapper,
  PDivider,
  PFieldsetWrapper,
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
  PModal,
  PPagination,
  PRadioButtonWrapper,
  PSelectWrapper,
  PSpinner,
  PTabs,
  PTabsBar,
  PTabsItem,
  PText,
  PTextareaWrapper,
  PTextFieldWrapper,
  PTextList,
  PTextListItem,
} from './lib/proxies';

const DECLARATIONS = [
  PBanner,
  PButton,
  PButtonPure,
  PCheckboxWrapper,
  PContentWrapper,
  PDivider,
  PFieldsetWrapper,
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
  PModal,
  PPagination,
  PRadioButtonWrapper,
  PSelectWrapper,
  PSpinner,
  PTabs,
  PTabsBar,
  PTabsItem,
  PText,
  PTextareaWrapper,
  PTextFieldWrapper,
  PTextList,
  PTextListItem,
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: [],
})
export class PorscheDesignSystemModule {
  constructor(
    @Inject(PREVENT_WEB_COMPONENTS_REGISTRATION) preventWebComponentsRegistration: boolean,
    @Inject(WEB_COMPONENTS_PREFIX) webComponentsPrefix: string,
    @Optional() @SkipSelf() porscheDesignSystemModule: PorscheDesignSystemModule
  ) {
    /**
     * prevent registration of components js web components if it's prevented
     * explicitly via PREVENT_WEB_COMPONENTS_REGISTRATION inject token
     */
    if (!preventWebComponentsRegistration) {
      load({ prefix: webComponentsPrefix });
    }
  }
}
