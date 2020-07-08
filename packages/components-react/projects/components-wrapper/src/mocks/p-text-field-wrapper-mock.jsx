const React = require('react');

module.exports = {
  PTextFieldWrapper: ({ children, ...props }) => (
    <p-text-field-wrapper {...props}>
      {!props.hideLabel && props.label && <p>{props.label}</p>}
      {!props.hideLabel && props.description && <p>{props.description}</p>}
      {children}
      {props.state && props.state !== 'none' && props.message && <p>{props.message}</p>}
    </p-text-field-wrapper>
  )
};
