import React from 'react';
import styled from 'styled-components';
import { color } from '@porsche-design-system/utilities';
import { font, text } from '@porsche-design-system/utilities';

const Div = styled.div`
  background-color: ${color.darkTheme.background};
`;

const P = styled.p`
  color: ${color.darkTheme.default};
  font-size: ${text.size.xlarge};
  font-weight: ${font.weight.bold};
  font-family: ${font.family}
`;

export function StyledComponent() {
  return (
    <Div>
      <P>Look at me iam styled</P>
    </Div>
  )
};

