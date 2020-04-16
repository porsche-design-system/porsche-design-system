const React = require('react');
module.exports = {
  PLinkPure: (props) => (
    <p-link-pure {...props}>
      {props.href ? <a href={props.href}>{props.children}</a> : props.children}
    </p-link-pure>
  )
};
