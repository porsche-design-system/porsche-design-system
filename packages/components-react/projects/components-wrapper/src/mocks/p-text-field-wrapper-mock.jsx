const React = require('react');

module.exports = {
  PTextFieldWrapper: (props) => (
    <p-textfield-wrapper>
      {props.hideLabel !== true && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-textfield-wrapper>
  ),
};
