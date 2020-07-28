//@ts-nocheck
import React from 'react';

export const PRadioButtonWrapper = ({ children, ...props }) => (
  <p-radio-button-wrapper {...props}>
    {!props.hideLabel && props.label && <p>{props.label}</p>}
    {children}
    {props.state && props.state !== 'none' && props.message && <p>{props.message}</p>}
  </p-radio-button-wrapper>
);
