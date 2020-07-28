//@ts-nocheck
import React from 'react';

export const PButton = ({ children, ...props }) => (
  <p-button {...props}>
    <button>{children}</button>
  </p-button>
);
