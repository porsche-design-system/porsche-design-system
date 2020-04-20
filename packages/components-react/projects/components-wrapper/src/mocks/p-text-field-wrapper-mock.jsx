const React = require('react');

module.exports = {
  PTextFieldWrapper: (props) => (
    <p-textfield-wrapper {...props}>
      {!props.hideLabel && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-textfield-wrapper>
  ),
};
