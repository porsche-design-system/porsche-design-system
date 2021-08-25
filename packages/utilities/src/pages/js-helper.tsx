import styled from 'styled-components';
import { srOnlyStyles } from '@porsche-design-system/utilities';

const HiddenElement = styled.span`
  ${srOnlyStyles()}
`;

export const JsHelper = (): JSX.Element => {
  return (
    <>
      <h2>Helper</h2>
      <h3>Screen Reader Only</h3>
      <div className="playground">
        <p>Some visible label</p>
        <p>
          <HiddenElement>Some hidden label</HiddenElement>
        </p>
      </div>
    </>
  );
};
