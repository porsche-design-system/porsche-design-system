const React = require('react');

module.exports = {
  PTextareaWrapper: ({ children, ...props }) => (
    <p-textarea-wrapper {...props}>
      {!props.hideLabel && props.label && <p>{props.label}</p>}
      {children}
      {props.state && props.state !== 'none' && props.message && <p>{props.message}</p>}
    </p-textarea-wrapper>
  )
};
