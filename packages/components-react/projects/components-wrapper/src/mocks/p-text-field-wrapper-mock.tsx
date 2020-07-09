//@ts-nocheck
import React from 'react';

export const PTextFieldWrapper = (props) => (
  <p-text-field-wrapper {...props}>
    {!props.hideLabel && props.label}
    {props.children}
    {props.state && props.state !== 'none' && props.message}
  </p-text-field-wrapper>
);
