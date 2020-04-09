import * as React from 'react';
import { render } from '@testing-library/react';
import { PRadioButtonWrapper } from '../../../projects/components-wrapper/src';

describe('PRadioButtonWrapper', () => {
  it('should render PRadioButtonWrapper input name', () => {
    const { container } = render(
      <PRadioButtonWrapper>
        <input type={'radio'} />
      </PRadioButtonWrapper>
    );
    expect(container.getElementsByTagName('input')).toBeTruthy();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PRadioButtonWrapper />);
    expect(container.getElementsByTagName('p-radiobutton-wrapper')).toBeTruthy();
  });

  describe('Label', () => {
    it('should render label', () => {
      const { getByText } = render(<PRadioButtonWrapper label="Label" />);
      expect(getByText('Label')).toBeDefined();
    });

    it('should not render label when hide label is set', () => {
      const { queryByText } = render(<PRadioButtonWrapper label="Label" hideLabel={true} />);
      expect(queryByText('Label')).toBeNull();
    });
  });

  describe('Error Message', () => {
    it('should render message with error state', () => {
      const { getByText } = render(<PRadioButtonWrapper state="error" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should render message with success state', () => {
      const { getByText } = render(<PRadioButtonWrapper state="success" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should not render label when hide label is set', () => {
      const { queryByText } = render(<PRadioButtonWrapper state="none" message="Message" />);
      expect(queryByText('Message')).toBeNull();
    });
  });
});
