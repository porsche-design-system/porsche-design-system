import * as React from 'react';
import { render } from '@testing-library/react';
import { PTextFieldWrapper } from '../../../projects/components-wrapper/src';

describe('PTextFieldWrapper', () => {
  it('should render PTextFieldWrapper text input', () => {
    const { container } = render(
      <PTextFieldWrapper>
        <input type={'text'} />
      </PTextFieldWrapper>
    );
    expect(container.getElementsByTagName('input')).toBeTruthy();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PTextFieldWrapper />);
    expect(container.getElementsByTagName('p-text-field-wrapper')).toBeTruthy();
  });

  describe('Label', () => {
    it('should render label', () => {
      const { getByText } = render(<PTextFieldWrapper label="Label" />);
      expect(getByText('Label')).toBeDefined();
    });

    it('should not render label when hide label is set', () => {
      const { queryByText } = render(<PTextFieldWrapper label="Label" hideLabel={true} />);
      expect(queryByText('Label')).toBeNull();
    });

    it('should set label as attribute', () => {
      const { container } = render(<PTextFieldWrapper label="Label" hideLabel={true} />);
      expect(container.querySelectorAll('[label="Label"]').length).toBe(1);
    });
  });

  describe('Error Message', () => {
    it('should render message with error state', () => {
      const { getByText } = render(<PTextFieldWrapper state="error" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should render label and message with error state', () => {
      const { getByText } = render(<PTextFieldWrapper state="error" message="Message" label="Label" />);
      expect(getByText('Label')).toBeDefined();
      expect(getByText('Message')).toBeDefined();
    });

    it('should render message with success state', () => {
      const { getByText } = render(<PTextFieldWrapper state="success" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should not render message when state is none', () => {
      const { queryByText } = render(<PTextFieldWrapper state="none" message="Message" />);
      expect(queryByText('Message')).toBeNull();
    });

    it('should set message as attribute', () => {
      const { container } = render(<PTextFieldWrapper message="Message" />);
      expect(container.querySelectorAll('[message="Message"]').length).toBe(1);
    });
  });
});
