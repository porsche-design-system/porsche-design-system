const React = require('react');

module.exports = {
  PLinkSocial: ({ children, ...props }) => (
    <p-link-social {...props}>{props.href ? <a href={props.href}>{children}</a> : children}</p-link-social>
  )
};
