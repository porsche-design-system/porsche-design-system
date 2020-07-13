//@ts-nocheck
import React from 'react';

export const PLink = ({ children, ...props }) => (
  <p-link {...props}>{props.href ? <a href={props.href}>{children}</a> : children}</p-link>
);
