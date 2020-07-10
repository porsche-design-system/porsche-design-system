//@ts-nocheck
import React from 'react';

export const PCheckboxWrapper = ({ children, ...props }) => (
  <p-checkbox-wrapper {...props}>
    {!props.hideLabel && props.label && <p>{props.label}</p>}
    {children}
    {props.state && props.state !== 'none' && props.message && <p>{props.message}</p>}
  </p-checkbox-wrapper>
);
