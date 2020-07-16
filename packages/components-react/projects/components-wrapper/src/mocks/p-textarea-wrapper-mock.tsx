//@ts-nocheck
import React from 'react';

export const PTextareaWrapper = ({ children, ...props }) => (
  <p-textarea-wrapper {...props}>
    {!props.hideLabel && props.label && <p>{props.label}</p>}
    {!props.hideLabel && props.description && <p>{props.description}</p>}
    {children}
    {props.state && props.state !== 'none' && props.message && <p>{props.message}</p>}
  </p-textarea-wrapper>
);
