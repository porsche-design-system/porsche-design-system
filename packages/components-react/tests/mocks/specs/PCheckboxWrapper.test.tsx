import * as React from 'react';
import { render } from '@testing-library/react';
import { PCheckboxWrapper } from '../../../projects/components-wrapper/src';

describe('PCheckboxWrapper', () => {
  it('should render PCheckboxWrapper input name', () => {
    const { container } = render(
      <PCheckboxWrapper>
        <input type={'checkbox'} />
      </PCheckboxWrapper>
    );
    expect(container.getElementsByTagName('input')).toBeTruthy();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PCheckboxWrapper />);
    expect(container.getElementsByTagName('p-checkbox-wrapper')).toBeTruthy();
  });

  describe('Label', () => {
    it('should render label', () => {
      const { getByText } = render(<PCheckboxWrapper label="Label" />);
      expect(getByText('Label')).toBeDefined();
    });

    it('should not render label when hide label is set', () => {
      const { queryByText } = render(<PCheckboxWrapper label="Label" hideLabel={true} />);
      expect(queryByText('Label')).toBeNull();
    });
  });

  describe('Error Message', () => {
    it('should render message with error state', () => {
      const { getByText } = render(<PCheckboxWrapper state="error" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should render message with success state', () => {
      const { getByText } = render(<PCheckboxWrapper state="success" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should not render label when hide label is set', () => {
      const { queryByText } = render(<PCheckboxWrapper state="none" message="Message" />);
      expect(queryByText('Message')).toBeNull();
    });
  });
});
