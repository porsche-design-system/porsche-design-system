const React = require('react');

module.exports = {
  PLink: (props) => (
    <p-link {...props}>
      {props.href ? <a href={props.href}>{props.children}</a> : props.children}
    </p-link>
  )
};
