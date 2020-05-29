import React from 'react';
import styled from 'styled-components';
import { color, layout, spacing, text } from '@porsche-design-system/utilities';
import { headline } from '@porsche-design-system/utilities';

const DarkTheme = styled.div`
  background-color: ${color.darkTheme.background};
`;

const Div = styled.div`
  margin: ${spacing['8']}
`;

const Headline4 = styled.h4`
  color: ${color.darkTheme.default};
  ${headline['4']}
  marginLeft: ${layout.large}
  marginRight: ${layout.large}
`;

const P = styled.text`
  color: ${color.darkTheme.default};
  ${text}
  marginTop: ${layout.small}
`;

export function StyledComponent() {
  return (
    <>
      <DarkTheme>
        <Div>
          <Headline4>I change according to min and max width </Headline4>
          <div>
            <P>Look at me iam styled</P>
          </div>
          <div>
            <P>Second styled Paragraph</P>
          </div>
        </Div>
      </DarkTheme>
    </>
  );
}
