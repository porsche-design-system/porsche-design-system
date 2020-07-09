//@ts-nocheck
import React from 'react';

export const PButtonPure = (props) => (
  <p-button-pure {...props}>
    <button>{props.children}</button>
  </p-button-pure>
);
