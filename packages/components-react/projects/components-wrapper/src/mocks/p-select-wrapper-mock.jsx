const React = require('react');

module.exports = {
  PSelectWrapper: ({ children, ...props }) => (
    <p-select-wrapper {...props}>
      {!props.hideLabel && props.label && <p>{props.label}</p>}
      {children}
      {props.state && props.state !== 'none' && props.message && <p>{props.message}</p>}
    </p-select-wrapper>
  )
};
