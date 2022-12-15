import {
  componentsReady,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
} from '@porsche-design-system/components-react';
import { render } from '@testing-library/react';

const Sample = (): JSX.Element => {
  return (
    <PTable data-testid="host" caption="Some caption">
      <PTableHead data-testid="head">
        <PTableHeadRow data-testid="head-row">
          <PTableHeadCell data-testid="head-cell">Col 1</PTableHeadCell>
        </PTableHeadRow>
      </PTableHead>
      <PTableBody data-testid="body">
        <PTableRow data-testid="row">
          <PTableCell data-testid="cell">Cell 1</PTableCell>
        </PTableRow>
      </PTableBody>
    </PTable>
  );
};

it('should have initialized shadow dom', async () => {
  const { getByTestId } = render(<Sample />);
  await componentsReady();

  expect(getByTestId('host').shadowRoot).not.toBeNull();
  expect(getByTestId('head').shadowRoot).not.toBeNull();
  expect(getByTestId('head-row').shadowRoot).not.toBeNull();
  expect(getByTestId('head-cell').shadowRoot).not.toBeNull();
  expect(getByTestId('body').shadowRoot).not.toBeNull();
  expect(getByTestId('row').shadowRoot).not.toBeNull();
  expect(getByTestId('cell').shadowRoot).not.toBeNull();
});
