import styled, { StyleSheetManager } from 'styled-components';
import { createUseStyles } from 'react-jss';
import { getScreenReaderOnlyJssStyle, getContentWrapperJssStyle, getFocusJssStyle } from './jss';

export const StyledComponentsStyle = styled.div({
  div: {
    ...(getContentWrapperJssStyle('basic') as any),
    ...getFocusJssStyle(),
    ...getScreenReaderOnlyJssStyle(),
  },
});

const useStyles = createUseStyles({
  '@global': {
    div: {
      ...getContentWrapperJssStyle('basic'),
      ...getFocusJssStyle(),
      ...getScreenReaderOnlyJssStyle(),
    },
  },
});

export const App = (): JSX.Element => {
  useStyles();
  return (
    <StyleSheetManager disableVendorPrefixes>
      <StyledComponentsStyle />
    </StyleSheetManager>
  );
};
