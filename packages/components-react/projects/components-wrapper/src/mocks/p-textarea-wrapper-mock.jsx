const React = require('react');

module.exports = {
  PTextareaWrapper: (props) => (
    <p-textarea-wrapper {...props}>
      {!props.hideLabel && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-textarea-wrapper>
  ),
};
