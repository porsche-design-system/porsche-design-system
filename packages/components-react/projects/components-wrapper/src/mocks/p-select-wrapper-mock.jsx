const React = require('react');

module.exports = {
  PSelectWrapper: (props) => (
    <p-select-wrapper {...props}>
      {!props.hideLabel && props.label}
      {props.children}
      {props.state && props.state !== 'none' && props.message}
    </p-select-wrapper>
  ),
};
