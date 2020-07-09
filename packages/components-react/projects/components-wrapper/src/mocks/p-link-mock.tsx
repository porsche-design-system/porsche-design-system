//@ts-nocheck
import React from 'react';

export const PLink = (props) => (
  <p-link {...props}>{props.href ? <a href={props.href}>{props.children}</a> : props.children}</p-link>
);
