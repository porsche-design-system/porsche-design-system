const React = require('react');

module.exports = {
  PButtonPure: ({ children, ...props }) => (
    <p-button-pure {...props}>
      <button>{children}</button>
    </p-button-pure>
  )
};
