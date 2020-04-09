const React = require('react');

module.exports = {
  PButton: (props) => <p-button onClick={props.onClick}>{props.children}</p-button>
};
