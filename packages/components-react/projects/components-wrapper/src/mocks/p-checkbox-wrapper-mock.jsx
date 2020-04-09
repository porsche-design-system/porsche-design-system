const React = require('react');

module.exports = {
  PCheckboxWrapper: (props) => (
    <p-checkbox-wrapper>
      {props.hideLabel !== true && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-checkbox-wrapper>
  ),
};
