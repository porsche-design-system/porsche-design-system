//@ts-nocheck
import React from 'react';

export const PTextareaWrapper = (props) => (
  <p-textarea-wrapper {...props}>
    {!props.hideLabel && props.label}
    {props.children}
    {props.state && props.state !== 'none' && props.message}
  </p-textarea-wrapper>
);
