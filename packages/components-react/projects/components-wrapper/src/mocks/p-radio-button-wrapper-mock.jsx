const React = require('react');

module.exports = {
  PRadioButtonWrapper: (props) => (
    <p-radio-button-wrapper {...props}>
      {!props.hideLabel && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-radio-button-wrapper>
  ),
};
