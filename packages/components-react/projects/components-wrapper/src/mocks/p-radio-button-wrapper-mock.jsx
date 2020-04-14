const React = require('react');

module.exports = {
  PRadioButtonWrapper: (props) => (
    <p-radio-button-wrapper label={props.label} message={props.message}>
      {props.hideLabel !== true && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-radio-button-wrapper>
  ),
};
