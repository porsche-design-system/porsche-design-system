//@ts-nocheck
import React from 'react';

export const PSelectWrapper = (props) => (
  <p-select-wrapper {...props}>
    {!props.hideLabel && props.label}
    {props.children}
    {props.state && props.state !== 'none' && props.message}
  </p-select-wrapper>
);
