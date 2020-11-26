import styled from 'styled-components';
import { focus } from '@porsche-design-system/utilities';

const FocusButtonRegular = styled.button`
  ${focus()}
`;
const FocusButtonCustom = styled.button`
  ${focus({ focusColor: 'red', offset: 3 })}
`;
const FocusButtonPseudo = styled.button`
  ${focus({ pseudo: '::before' })}
`;
const FocusButtonCustomPseudo = styled.button`
  ${focus({ focusColor: 'red', offset: 3, pseudo: '::after' })}
`;

export const JsFocus = (): JSX.Element => {
  return (
    <>
      <div className="playground">
        <h2>Focus</h2>
        <div className="playground">
          <FocusButtonRegular id="focusable-element-regular">Some label</FocusButtonRegular>
        </div>
        <div className="playground">
          <FocusButtonCustom id="focusable-element-custom">Some label</FocusButtonCustom>
        </div>
        <div className="playground">
          <FocusButtonPseudo id="focusable-element-pseudo" style={{ position: 'relative',  outline: 'transparent' }}>
            Some label
          </FocusButtonPseudo>
        </div>
        <div className="playground">
          <FocusButtonCustomPseudo id="focusable-element-custom-pseudo" style={{ position: 'relative', outline: 'transparent' }}>
            Some label
          </FocusButtonCustomPseudo>
        </div>
      </div>
    </>
  );
};
