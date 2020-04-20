const React = require('react');

module.exports = {
  PButtonPure: (props) => <p-button-pure {...props}>
    <button>{props.children}</button>
  </p-button-pure>
};
