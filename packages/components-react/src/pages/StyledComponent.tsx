import React from 'react';
import styled from 'styled-components';
import { color, spacing } from '@porsche-design-system/utilities';
import { font } from '@porsche-design-system/utilities';
import { headline } from '@porsche-design-system/utilities';

const Div = styled.div`
  background-color: ${color.darkTheme.background};
`;

const Headline1 = styled.h4`
  ${headline['4']}
`;

const P = styled.p`
  color: ${color.darkTheme.default};
  font-size: ${font.size.xLarge};
  font-weight: ${font.weight.bold};
  font-family: ${font.family};
  margin-top: ${spacing['24']};
  margin-left: ${spacing['16']};
`;

export function StyledComponent() {
  return (
    <div>
      <Headline1>I change according to min and max width </Headline1>
      <Div>
        <P>Look at me iam styled</P>
        <P>Second styled Paragraph with spacing</P>
      </Div>
    </div>
  )
};

