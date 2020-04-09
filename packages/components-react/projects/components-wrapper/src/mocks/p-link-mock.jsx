const React = require('react');

module.exports = {
  PLink: (props) => {
    if (props.href) {
      return (
        <p-link>
          <a href={props.href}>{props.children}</a>
        </p-link>
      )
    }
    return <p-link>{props.children}</p-link>
  }
};
