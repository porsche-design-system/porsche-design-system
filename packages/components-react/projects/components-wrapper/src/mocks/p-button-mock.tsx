//@ts-nocheck
import React from 'react';

export const PButton = (props) => (
  <p-button {...props}>
    <button>{props.children}</button>
  </p-button>
);
