import React from 'react';
import { PGrid, PFlex, PButtonRegular, PGridChild, PFlexItem } from '@porscheui/ui-kit-react';
import '@porscheui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <PGrid>
        <PGridChild size="8" offset="2">
          <PFlex gap={16} direction={{ base: "column", l: "row" }}>
            <PFlexItem>
              <PButtonRegular onPClick={(e) => console.log(e)}>Button click!</PButtonRegular>
            </PFlexItem>
            <PFlexItem>
              <PButtonRegular variant="ghost" onPClick={(e) => console.log(e)}>Button click!</PButtonRegular>
            </PFlexItem>
            <PFlexItem>
              <PButtonRegular variant="highlight" onPClick={(e) => console.log(e)}>Button click!</PButtonRegular>
            </PFlexItem>
          </PFlex>
        </PGridChild>
      </PGrid>
    </div>
  );
}

export default App;
