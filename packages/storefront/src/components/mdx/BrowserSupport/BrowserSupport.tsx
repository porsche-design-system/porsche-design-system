import {
  PIcon,
  PPopover,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
} from '@porsche-design-system/components-react/ssr';

type Status = { version: string; support: 'full' | 'partial'; message: 'string' };

type BrowserSupportProps = {
  support: {
    chrome: string | Status;
    edge: string | Status;
    safari: string | Status;
    firefox: string | Status;
    chromeForAndroid: string | Status;
    safariForIOS: string | Status;
  };
};

export const BrowserSupport = ({ support }: BrowserSupportProps) => {
  return (
    <PTable className="mt-fluid-md" caption="Browser support">
      <PTableHead>
        <PTableHeadRow>
          <PTableHeadCell>Chrome</PTableHeadCell>
          <PTableHeadCell>Edge</PTableHeadCell>
          <PTableHeadCell>Safari</PTableHeadCell>
          <PTableHeadCell>Firefox</PTableHeadCell>
          <PTableHeadCell>Chrome for Android</PTableHeadCell>
          <PTableHeadCell>Safari for iOS</PTableHeadCell>
        </PTableHeadRow>
      </PTableHead>
      <PTableBody>
        <PTableRow>
          {Object.values(support).map((status, index) => (
            <PTableCell key={index}>
              {' '}
              {typeof status === 'string' ? (
                <>
                  {`>= ${status}`} <PIcon name="success" color="success" />
                </>
              ) : (
                <>
                  {`>= ${status.version}`} <PIcon name="warning" color="warning" />
                  <PPopover description={status.message} />
                </>
              )}
            </PTableCell>
          ))}
        </PTableRow>
      </PTableBody>
    </PTable>
  );
};
