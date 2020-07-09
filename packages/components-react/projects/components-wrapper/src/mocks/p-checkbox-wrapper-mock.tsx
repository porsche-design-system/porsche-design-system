//@ts-nocheck
import React from 'react';

export const PCheckboxWrapper = (props) => (
  <p-checkbox-wrapper {...props}>
    {!props.hideLabel && props.label}
    {props.children}
    {props.state && props.state !== 'none' && props.message}
  </p-checkbox-wrapper>
);
