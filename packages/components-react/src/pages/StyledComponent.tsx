import React from 'react';
import styled from 'styled-components';
import { color, spacing } from '@porsche-design-system/utilities';
import { font, text } from '@porsche-design-system/utilities';

const Div = styled.div`
  background-color: ${color.darkTheme.background};
`;

const P = styled.p`
  color: ${color.darkTheme.default};
  font-size: ${text.size.xlarge};
  font-weight: ${font.weight.bold};
  font-family: ${font.family};
  margin-top: ${spacing.twentyFour};
  margin-left: ${spacing.sixteen};
`;

export function StyledComponent() {
  return (
    <div>
      <p>Iam unstyled </p>
      <Div>
        <P>Look at me iam styled</P>
        <P>Second styled Paragraph with spacing</P>
      </Div>
    </div>
  )
};

