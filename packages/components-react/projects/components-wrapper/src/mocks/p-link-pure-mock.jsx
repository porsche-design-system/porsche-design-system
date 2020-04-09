const React = require('react');
module.exports = {
  PLinkPure: (props) => {
    if (props.href) {
      return (
        <p-link-pure>
          <a href={props.href}>{props.children}</a>
        </p-link-pure>
      )
    }
    return <p-link-pure>{props.children}</p-link-pure>
  }
};
