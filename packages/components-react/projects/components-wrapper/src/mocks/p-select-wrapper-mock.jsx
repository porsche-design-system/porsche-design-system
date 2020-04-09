const React = require('react');

module.exports = {
  PSelectWrapper: (props) => (
    <p-select-wrapper label={props.label} message={props.message}>
      {props.hideLabel !== true && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-select-wrapper>
  ),
};
