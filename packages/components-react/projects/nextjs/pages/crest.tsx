/* Auto Generated File */
import type { NextPage } from 'next';
import { PCrest } from '@porsche-design-system/components-react/ssr';

const CrestPage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="playground" title="should show crest">
        <PCrest />
      </div>

      <div className="playground" title="should render with custom click area">
        <PCrest href="#" style={{ padding: '1.5rem' }} />
      </div>

      <div className="playground" title="should not exceed parents width">
        <div style={{ width: '20px', background: 'lightsalmon' }}>
          <PCrest />
        </div>
        <br />
        <div style={{ width: '20px', background: 'lightsalmon' }}>
          <PCrest href="#" />
        </div>
      </div>

      <div className="playground" title="should not exceed parents height">
        <div style={{ height: '20px', background: 'lightsalmon' }}>
          <PCrest />
        </div>
        <br />
        <div style={{ height: '20px', background: 'lightsalmon' }}>
          <PCrest href="#" />
        </div>
      </div>
    </>
  );
};

export default CrestPage;
