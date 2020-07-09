//@ts-nocheck
import React from 'react';

export const PLinkPure = (props) => (
  <p-link-pure {...props}>{props.href ? <a href={props.href}>{props.children}</a> : props.children}</p-link-pure>
);
