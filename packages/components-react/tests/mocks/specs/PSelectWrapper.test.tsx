import React from 'react';
import { render } from '@testing-library/react';
import { PSelectWrapper } from '@porsche-design-system/components-react';

describe('PSelectWrapper', () => {
  it('should render PSelectWrapper select name', () => {
    const { container } = render(
      <PSelectWrapper>
        <select>
          <option value={'Headline A'}>Headline A</option>
          <option value={'Headline B'}>Headline B</option>
        </select>
      </PSelectWrapper>
    );
    expect(container.getElementsByTagName('select')).toBeTruthy();
    expect(container.getElementsByTagName('option[value="Headline A"]')).toBeTruthy();
    expect(container.getElementsByTagName('option[value="Headline B"]')).toBeTruthy();
  });

  it('should render TagName of component', () => {
    const { container } = render(<PSelectWrapper />);
    expect(container.getElementsByTagName('p-select-wrapper')).toBeTruthy();
  });

  describe('Label', () => {
    it('should render label', () => {
      const { getByText } = render(<PSelectWrapper label="Label" />);
      expect(getByText('Label')).toBeDefined();
    });

    it('should not render label when hide label is set', () => {
      const { queryByText } = render(<PSelectWrapper label="Label" hideLabel={true} />);
      expect(queryByText('Label')).toBeNull();
    });

    it('should set label as attribute', () => {
      const { container } = render(<PSelectWrapper label="Label" hideLabel={true} />);
      expect(container.querySelectorAll('[label="Label"]').length).toBe(1);
    });
  });

  describe('Description', () => {
    it('should render description', () => {
      const { getByText } = render(<PSelectWrapper description="Description" />);
      expect(getByText('Description')).toBeDefined();
    });

    it('should not render description when hide label is set', () => {
      const { queryByText } = render(<PSelectWrapper description="Description" hideLabel={true} />);
      expect(queryByText('Description')).toBeNull();
    });

    it('should set description as attribute', () => {
      const { container } = render(<PSelectWrapper description="Description" hideLabel={true} />);
      expect(container.querySelectorAll('[description="Description"]').length).toBe(1);
    });
  });

  describe('Error Message', () => {
    it('should render message with error state', () => {
      const { getByText } = render(<PSelectWrapper state="error" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should render label and message with error state', () => {
      const { getByText } = render(<PSelectWrapper state="error" message="Message" label="Label" />);
      expect(getByText('Label')).toBeDefined();
      expect(getByText('Message')).toBeDefined();
    });

    it('should render message with success state', () => {
      const { getByText } = render(<PSelectWrapper state="success" message="Message" />);
      expect(getByText('Message')).toBeDefined();
    });

    it('should not render message when state is none', () => {
      const { queryByText } = render(<PSelectWrapper state="none" message="Message" />);
      expect(queryByText('Message')).toBeNull();
    });

    it('should set message as attribute', () => {
      const { container } = render(<PSelectWrapper message="Message" />);
      expect(container.querySelectorAll('[message="Message"]').length).toBe(1);
    });
  });
});
