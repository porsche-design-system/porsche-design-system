//@ts-nocheck
import React from 'react';

export const PButtonPure = ({ children, ...props }) => (
  <p-button-pure {...props}>
    <button>{children}</button>
  </p-button-pure>
);
