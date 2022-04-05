
import styled, { StyleSheetManager } from 'styled-components';
import { createUseStyles } from 'react-jss';
import { getContentWrapperJssStyle, getFocusJssStyle, getScreenReaderOnlyJssStyle } from './jss';
import './scss/screen-reader.scss';
  
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
      ...(getContentWrapperJssStyle('basic') as any),
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
  