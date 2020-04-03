import {
  PButton,
  PButtonPure,
  PCheckboxWrapper, PDivider, PFlex, PFlexItem, PGrid, PGridItem,
  PHeadline, PIcon,
  PLink,
  PLinkPure,
  PPagination,
  PRadioButtonWrapper, PSelectWrapper,
  PSpinner,
  PTextareaWrapper,
  PTextFieldWrapper
} from '..';

const React = require('react');
module.exports = {
  /*To ensure Typescript is happy, we need to use IntrinsicElements. If you debug your tests, you are able to recognize the PDS-Component via data-testid */
  PHeadlineMock: (props: React.ComponentProps<typeof PHeadline>) => React.createElement("h1", {"data-testid": "PHeadline"}, props.children),
  PIconMock: (props: React.ComponentProps<typeof PIcon>) => React.createElement("div", {"data-testid": "PIcon"}, props.children),
  PButtonMock: (props: React.ComponentProps<typeof PButton>) => React.createElement("button", {"data-testid": "PButton", onClick: props.onClick}, props.children),
  PButtonPureMock: (props: React.ComponentProps<typeof PButtonPure>) => React.createElement("button", {"data-testid": "PButtonPure", onClick: props.onClick}, props.children),
  PDividerMock: (props: React.ComponentProps<typeof PDivider>) => React.createElement("div", {"data-testid": "PDivider"}, props.children),
  PGridMock: (props: React.ComponentProps<typeof PGrid>) => React.createElement("div", {"data-testid": "PGrid"}, props.children),
  PGridItemMock: (props: React.ComponentProps<typeof PGridItem>) => React.createElement("div", {"data-testid": "PGridItem"}, props.children),
  PFlexMock: (props: React.ComponentProps<typeof PFlex>) => React.createElement("div", {"data-testid": "PFlex"}, props.children),
  PFlexItemMock: (props: React.ComponentProps<typeof PFlexItem>) => React.createElement("div", {"data-testid": "PFlexItem"}, props.children),
  PSelectWrapperMock: (props: React.ComponentProps<typeof PSelectWrapper>) => React.createElement("div", {"data-testid": "PSelectWrapper"}, props.children),
  PCheckboxWrapperMock: (props: React.ComponentProps<typeof PCheckboxWrapper>) => React.createElement("div", {"data-testid": "PCheckboxWrapper"}, props.children),
  PRadioButtonWrapperMock: (props: React.ComponentProps<typeof PRadioButtonWrapper>) => React.createElement("div", {"data-testid": "PRadioButtonWrapper"}, props.children),
  PTextareaWrapperMock: (props: React.ComponentProps<typeof PTextareaWrapper>) => React.createElement("div", {"data-testid": "PTextareaWrapper"}, props.children),
  PTextFieldWrapperMock: (props: React.ComponentProps<typeof PTextFieldWrapper>) => React.createElement("div", {"data-testid": "PTextFieldWrapper"}, props.children),
  /* To enable testing in wrapped Links we have to check if there is a href on our web-component before we simulate the native behaviour */
  PLinkMock: (props: React.ComponentProps<typeof PLink>) => {
  if (props.href) {
    return React.createElement("a", {href: props.href, "data-testid": "PLink"}, props.children);
  }
  return React.createElement("div", {"data-testid": "PLink"}, props.children);
},
  PLinkPureMock: (props: React.ComponentProps<typeof PLinkPure>) => {
  if (props.href) {
    return React.createElement("a", {href: props.href, "data-testid": "PLinkPure"}, props.children);
  }
  return React.createElement("div", {"data-testid": "PLinkPure"}, props.children);
},
  PSpinnerMock: (props: React.ComponentProps<typeof PSpinner>) => React.createElement("div", {"data-testid": "PSpinner"}, props.children),
  /* PPagination uses the onPageChange Event, which you could test. Unfortunately Jest and JS-Dom have many Restrictions (usage of useState is not allowed)
  to trigger a Mocked Custom Event. */
  PPaginationMock: (props: React.ComponentProps<typeof PPagination>) => React.createElement("div", {"data-testid": "PPagination"}, props.children)
};
