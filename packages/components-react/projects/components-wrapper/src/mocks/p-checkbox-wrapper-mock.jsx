const React = require('react');

module.exports = {
  PCheckboxWrapper: ({ children, ...props }) => (
    <p-checkbox-wrapper {...props}>
      {!props.hideLabel && props.label && <p>{props.label}</p>}
      {children}
      {props.state && props.state !== 'none' && props.message && <p>{props.message}</p>}
    </p-checkbox-wrapper>
  )
};
