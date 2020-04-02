import React from 'react';
import {
  PButton,
  PButtonPure,
  PCheckboxWrapper,
  PDivider,
  PFlex,
  PFlexItem,
  PGrid,
  PGridItem,
  PHeadline,
  PIcon,
  PLink,
  PLinkPure,
  PPagination,
  PRadioButtonWrapper,
  PSelectWrapper,
  PSpinner,
  PTextareaWrapper,
  PTextFieldWrapper
} from '../';

/*To ensure Typescript is happy, we need to use IntrinsicElements. If you debug your tests, you are able to recognize the PDS-Component via data-testid */
export const PHeadlineMock = (props: React.ComponentProps<typeof PHeadline>) => <h1 data-testid="PHeadline">{props.children}</h1>;
export const PIconMock = (props: React.ComponentProps<typeof PIcon>) => <div data-testid="PIcon">{props.children}</div>;
export const PButtonMock = (props: React.ComponentProps<typeof PButton>) => <button data-testid="PButton">{props.children}</button>;
export const PButtonPureMock = (props: React.ComponentProps<typeof PButtonPure>) => <button>{props.children}</button>;
export const PDividerMock = (props: React.ComponentProps<typeof PDivider>) => <div data-testid="PDivider">{props.children}</div>;
export const PGridMock = (props: React.ComponentProps<typeof PGrid>) => <div data-testid="PGrid">{props.children}</div>;
export const PGridItemMock = (props: React.ComponentProps<typeof PGridItem>) => <div data-testid="PGridItem">{props.children}</div>;
export const PFlexMock = (props: React.ComponentProps<typeof PFlex>) => <div data-testid="PFlex">{props.children}</div>;
export const PFlexItemMock = (props: React.ComponentProps<typeof PFlexItem>) => <div data-testid="PFlexItem">{props.children}</div>;
export const PSelectWrapperMock = (props: React.ComponentProps<typeof PSelectWrapper>) => <div data-testid="PSelectWrapper">{props.children}</div>;
export const PCheckboxWrapperMock = (props: React.ComponentProps<typeof PCheckboxWrapper>) => <div data-testid="PCheckboxWrapper">{props.children}</div>;
export const PRadioButtonWrapperMock = (props: React.ComponentProps<typeof PRadioButtonWrapper>) => <div data-testid="PRadioButtonWrapper">{props.children}</div>;
export const PTextareaWrapperMock = (props: React.ComponentProps<typeof PTextareaWrapper>) => <div data-testid="PTextareaWrapper">{props.children}</div>;
export const PTextFieldWrapperMock = (props: React.ComponentProps<typeof PTextFieldWrapper>) => <div data-testid="PTextFieldWrapper">{props.children}</div>;

/* To enable testing in wrapped Links we have to check if there is a href on our web-component before we simulate the native behaviour */
export const PLinkMock = (props: React.ComponentProps<typeof PLink>) => {
  if (props.href) {
    return <a href={props.href} data-testid="PLink">{props.children}</a>
  }
  return <div data-testid="PLink">{props.children}</div>
};
export const PLinkPureMock = (props: React.ComponentProps<typeof PLinkPure>) => {
  if (props.href) {
    return <a href={props.href} data-testid="PLinkPure">{props.children}</a>
  }
  return <div data-testid="PLinkPure">{props.children}</div>
};
export const PSpinnerMock = (props: React.ComponentProps<typeof PSpinner>) => <div data-testid="PSpinner">{props.children}</div>;

/* PPagination uses the onPageChange Event, which you could test. Unfortunately Jest and JS-Dom have many Restrictions (usage of useState is not allowed)
to trigger a Mocked Custom Event. */
export const PPaginationMock = (props: React.ComponentProps<typeof PPagination>) => <div data-testid="PPagination">{props.children}</div>;
