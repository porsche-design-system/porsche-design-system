//@ts-nocheck
import React from 'react';

export const PLinkSocial = (props) => (
  <p-link-social {...props}>{props.href ? <a href={props.href}>{props.children}</a> : props.children}</p-link-social>
);
