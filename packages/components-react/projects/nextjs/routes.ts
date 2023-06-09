/* Auto Generated Below */
const generatedRoutes = {
  "accordion": {
    "path": "/accordion",
    "name": "Accordion"
  },
  "banner": {
    "path": "/banner",
    "name": "Banner"
  },
  "button": {
    "path": "/button",
    "name": "Button"
  },
  "buttonGroup": {
    "path": "/button-group",
    "name": "ButtonGroup"
  },
  "buttonPure": {
    "path": "/button-pure",
    "name": "ButtonPure"
  },
  "buttonTile": {
    "path": "/button-tile",
    "name": "ButtonTile"
  },
  "carousel": {
    "path": "/carousel",
    "name": "Carousel"
  },
  "checkboxWrapper": {
    "path": "/checkbox-wrapper",
    "name": "CheckboxWrapper"
  },
  "contentWrapper": {
    "path": "/content-wrapper",
    "name": "ContentWrapper"
  },
  "coreInitializer": {
    "path": "/core-initializer",
    "name": "CoreInitializer"
  },
  "crest": {
    "path": "/crest",
    "name": "Crest"
  },
  "display": {
    "path": "/display",
    "name": "Display"
  },
  "divider": {
    "path": "/divider",
    "name": "Divider"
  },
  "fieldset": {
    "path": "/fieldset",
    "name": "Fieldset"
  },
  "fieldsetWrapper": {
    "path": "/fieldset-wrapper",
    "name": "FieldsetWrapper"
  },
  "flex": {
    "path": "/flex",
    "name": "Flex"
  },
  "flyout": {
    "path": "/flyout",
    "name": "Flyout"
  },
  "grid": {
    "path": "/grid",
    "name": "Grid"
  },
  "heading": {
    "path": "/heading",
    "name": "Heading"
  },
  "headline": {
    "path": "/headline",
    "name": "Headline"
  },
  "icon": {
    "path": "/icon",
    "name": "Icon"
  },
  "inlineNotification": {
    "path": "/inline-notification",
    "name": "InlineNotification"
  },
  "link": {
    "path": "/link",
    "name": "Link"
  },
  "linkPure": {
    "path": "/link-pure",
    "name": "LinkPure"
  },
  "linkSocial": {
    "path": "/link-social",
    "name": "LinkSocial"
  },
  "linkTile": {
    "path": "/link-tile",
    "name": "LinkTile"
  },
  "linkTileModelSignature": {
    "path": "/link-tile-model-signature",
    "name": "LinkTileModelSignature"
  },
  "marque": {
    "path": "/marque",
    "name": "Marque"
  },
  "modal": {
    "path": "/modal",
    "name": "Modal"
  },
  "modelSignature": {
    "path": "/model-signature",
    "name": "ModelSignature"
  },
  "overview": {
    "path": "/overview",
    "name": "Overview"
  },
  "overviewFlaky": {
    "path": "/overview-flaky",
    "name": "OverviewFlaky"
  },
  "overviewNotifications": {
    "path": "/overview-notifications",
    "name": "OverviewNotifications"
  },
  "pagination": {
    "path": "/pagination",
    "name": "Pagination"
  },
  "popover": {
    "path": "/popover",
    "name": "Popover"
  },
  "radioButtonWrapper": {
    "path": "/radio-button-wrapper",
    "name": "RadioButtonWrapper"
  },
  "scroller": {
    "path": "/scroller",
    "name": "Scroller"
  },
  "segmentedControl": {
    "path": "/segmented-control",
    "name": "SegmentedControl"
  },
  "selectWrapper": {
    "path": "/select-wrapper",
    "name": "SelectWrapper"
  },
  "spinner": {
    "path": "/spinner",
    "name": "Spinner"
  },
  "stepperHorizontal": {
    "path": "/stepper-horizontal",
    "name": "StepperHorizontal"
  },
  "switch": {
    "path": "/switch",
    "name": "Switch"
  },
  "tabs": {
    "path": "/tabs",
    "name": "Tabs"
  },
  "tabsBar": {
    "path": "/tabs-bar",
    "name": "TabsBar"
  },
  "tag": {
    "path": "/tag",
    "name": "Tag"
  },
  "tagDismissible": {
    "path": "/tag-dismissible",
    "name": "TagDismissible"
  },
  "text": {
    "path": "/text",
    "name": "Text"
  },
  "textFieldWrapper": {
    "path": "/text-field-wrapper",
    "name": "TextFieldWrapper"
  },
  "textList": {
    "path": "/text-list",
    "name": "TextList"
  },
  "textareaWrapper": {
    "path": "/textarea-wrapper",
    "name": "TextareaWrapper"
  },
  "toastBasic": {
    "path": "/toast-basic",
    "name": "ToastBasic"
  },
  "toastBasicDark": {
    "path": "/toast-basic-dark",
    "name": "ToastBasicDark"
  },
  "toastBasicLongText": {
    "path": "/toast-basic-long-text",
    "name": "ToastBasicLongText"
  },
  "toastBasicStateNeutral": {
    "path": "/toast-basic-state-neutral",
    "name": "ToastBasicStateNeutral"
  },
  "toastOffset": {
    "path": "/toast-offset",
    "name": "ToastOffset"
  },
  "toastPrefixed": {
    "path": "/toast-prefixed",
    "name": "ToastPrefixed"
  },
  "typographyCyril": {
    "path": "/typography-cyril",
    "name": "TypographyCyril"
  },
  "typographyFallbackStrategy": {
    "path": "/typography-fallback-strategy",
    "name": "TypographyFallbackStrategy"
  },
  "typographyGreekAndCoptic": {
    "path": "/typography-greek-and-coptic",
    "name": "TypographyGreekAndCoptic"
  },
  "typographyLatin": {
    "path": "/typography-latin",
    "name": "TypographyLatin"
  },
  "wordmark": {
    "path": "/wordmark",
    "name": "Wordmark"
  }
};
/* Auto Generated Above */

export const sitemap = {
  home: { path: '/', name: 'Home' },
  table: { path: '/table', name: 'Table' },
  ...generatedRoutes,
};

export const routes = Object.values(sitemap).sort((a, b) => a.name.localeCompare(b.name));
