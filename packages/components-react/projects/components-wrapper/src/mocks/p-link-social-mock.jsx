const React = require('react');

module.exports = {
  PLinkSocial: (props) => (
    <p-link-social {...props}>
      {props.href ? <a href={props.href}>{props.children}</a> : props.children}
    </p-link-social>
  )
};
