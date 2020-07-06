const React = require('react');

module.exports = {
  PRadioButtonWrapper: ({ children, ...props }) => (
    <p-radio-button-wrapper {...props}>
      {!props.hideLabel && props.label && <p>{props.label}</p>}
      {children}
      {props.state && props.state !== 'none' && props.message && <p>{props.message}</p>}
    </p-radio-button-wrapper>
  )
};
