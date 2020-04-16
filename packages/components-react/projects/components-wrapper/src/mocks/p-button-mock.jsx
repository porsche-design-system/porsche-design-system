const React = require('react');

module.exports = {
  PButton: (props) => <p-button {...props}>
    <button>{props.children}</button>
  </p-button>
};
