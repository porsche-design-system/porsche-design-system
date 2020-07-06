const React = require('react');
module.exports = {
  PLinkPure: ({ children, ...props }) => (
    <p-link-pure {...props}>{props.href ? <a href={props.href}>{children}</a> : children}</p-link-pure>
  )
};
