//@ts-nocheck
import React from 'react';

export const PLinkSocial = ({ children, ...props }) => (
  <p-link-social {...props}>{props.href ? <a href={props.href}>{children}</a> : children}</p-link-social>
);
