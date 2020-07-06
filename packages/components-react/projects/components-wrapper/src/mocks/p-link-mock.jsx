const React = require('react');

module.exports = {
  PLink: ({ children, ...props }) => (
    <p-link {...props}>{props.href ? <a href={props.href}>{children}</a> : children}</p-link>
  )
};
