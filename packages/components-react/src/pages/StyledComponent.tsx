import React from 'react';
import styled from 'styled-components';
import { color } from '@porsche-design-system/utilities';

const Div = styled.div`
  background-color: ${color.darkTheme.background};
`;

export function StyledComponent() {
  return (
    <Div>
      <p>Look at me iam styled</p>
    </Div>
  )
};

