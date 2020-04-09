const React = require('react');

module.exports = {
  PTextareaWrapper: (props) => (
    <p-textarea-wrapper label={props.label} message={props.message}>
      {props.hideLabel !== true && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-textarea-wrapper>
  ),
};
