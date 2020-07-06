const React = require('react');

module.exports = {
  PButton: ({ children, ...props }) => (
    <p-button {...props}>
      <button>{children}</button>
    </p-button>
  )
};
