const React = require('react');

module.exports = {
  PCheckboxWrapper: (props) => (
    <p-checkbox-wrapper label={props.label} message={props.message}>
      {props.hideLabel !== true && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-checkbox-wrapper>
  ),
};
