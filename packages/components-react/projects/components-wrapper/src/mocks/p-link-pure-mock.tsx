//@ts-nocheck
import React from 'react';

export const PLinkPure = ({ children, ...props }) => (
  <p-link-pure {...props}>{props.href ? <a href={props.href}>{children}</a> : children}</p-link-pure>
);
