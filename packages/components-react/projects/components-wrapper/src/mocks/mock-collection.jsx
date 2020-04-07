const React = require('react');

module.exports = {
    PHeadline: (props) => <p-headline>{props.children}</p-headline>,
    PText: (props) => <p-text>{props.children}</p-text>,
    PIcon: (props) => (
      <p-icon name={props.name}>
        <svg/>
      </p-icon>
    ),
    PMarque: (props) => (
      <p-marque>
        <img/>
      </p-marque>
    ),
    PButton: (props) => <p-button onClick={props.onClick}>{props.children}</p-button>,
    PButtonPure: (props) => <p-button-pure onClick={props.onClick}>{props.children}</p-button-pure>,
    PDivider: () => <p-divider/>,
    PGrid: (props) => <p-grid>{props.children}</p-grid>,
    PGridItem: (props) => <p-grid-item>{props.children}</p-grid-item>,
    PFlex: (props) => <p-flex>{props.children}</p-flex>,
    PFlexItem: (props) => <p-flex-item>{props.children}</p-flex-item>,
    PSelectWrapper: (props) => <p-select-wrapper>{props.children}</p-select-wrapper>,
    PCheckboxWrapper: (props) => <p-checkbox-wrapper>{props.children}</p-checkbox-wrapper>,
    PRadioButtonWrapper: (props) => <p-radio-button-wrapper>{props.children}</p-radio-button-wrapper>,
    PTextareaWrapper: (props) => <p-textarea-wrapper>{props.children}</p-textarea-wrapper>,
    PTextFieldWrapper: (props) => <p-textfield-wrapper>{props.children}</p-textfield-wrapper>,
    /* To enable testing in wrapped Links we have to check if there is a href on our web-component before we simulate the native behaviour */
    PLink: (props) => {
      if (props.href) {
        return (
          <p-link>
            <a href={props.href}>{props.children}</a>
          </p-link>
        )
      }
      return <p-link>{props.children}</p-link>
    },
    PLinkPure: (props) => {
      if (props.href) {
        return (
          <p-link-pure>
            <a href={props.href}>{props.children}</a>
          </p-link-pure>
        )
      }
      return <p-link-pure>{props.children}</p-link-pure>
    },
    PSpinner: () => <p-spinner/>,
    /* PPagination uses the onPageChange Event, which you could test. Unfortunately Jest and JS-Dom have many Restrictions (usage of useState is not allowed)
    to trigger a Mocked Custom Event. */
    PPagination: (props) => {
      return <p-pagination/>
    }
};
