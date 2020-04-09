import * as React from 'react';
import { render } from '@testing-library/react';
import { PTextareaWrapper } from '../../../projects/components-wrapper/src';

describe('PTextareaWrapper', () => {
  it('should render PTextareaWrapper text input', () => {
    const { container } = render(
      <PTextareaWrapper>
        <textarea />
      </PTextareaWrapper>
    );
    expect(container.getElementsByTagName('textarea')).toBeTruthy();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PTextareaWrapper />);
    expect(container.getElementsByTagName('p-textarea-wrapper')).toBeTruthy();
  });

  describe('Label', () => {
    it('should render label', () => {
      const { getByText } = render(<PTextareaWrapper label="Label" />);
      expect(getByText('Label')).toBeDefined();
    });

    it('should not render label when hide label is set', () => {
      const { queryByText } = render(<PTextareaWrapper label="Label" hideLabel={true} />);
      expect(queryByText('Label')).toBeNull();
    });
  });

  describe('Error Message', () => {
    it('should render message with error state', () => {
      const { getByText } = render(<PTextareaWrapper state="error" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should render message with success state', () => {
      const { getByText } = render(<PTextareaWrapper state="success" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should not render label when hide label is set', () => {
      const { queryByText } = render(<PTextareaWrapper state="none" message="Message" />);
      expect(queryByText('Message')).toBeNull();
    });
  });
});
