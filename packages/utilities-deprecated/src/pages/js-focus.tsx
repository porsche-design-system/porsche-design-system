import styled from 'styled-components';
import { focus } from '@porsche-design-system/utilities';

const FocusButtonRegular = styled.button`
  ${focus()}
`;
const FocusButtonCustom = styled.button`
  ${focus({ color: 'deeppink', offset: '6px' })}
`;
const StyledDiv = styled.div`
  position: relative;
  padding: 1rem;

  button {
    ${focus({ pseudo: '::before' })}
  }
`;
const FocusButtonCustomPseudo = styled.button`
  position: relative;

  ${focus({ color: 'deeppink', offset: '6px', pseudo: '::after' })}
`;

export const JsFocus = (): JSX.Element => {
  return (
    <>
      <h2>Focus</h2>
      <div className="playground">
        <FocusButtonRegular id="focusable-element-regular">Some label</FocusButtonRegular>
      </div>
      <div className="playground">
        <FocusButtonCustom id="focusable-element-custom">Some label</FocusButtonCustom>
      </div>
      <div className="playground">
        <StyledDiv>
          <button id="focusable-element-pseudo">Some label</button>
        </StyledDiv>
      </div>
      <div className="playground">
        <FocusButtonCustomPseudo id="focusable-element-custom-pseudo">Some label</FocusButtonCustomPseudo>
      </div>
    </>
  );
};
