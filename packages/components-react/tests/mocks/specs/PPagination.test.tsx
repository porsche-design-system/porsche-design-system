import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PPagination } from '@porsche-design-system/components-react';

describe('PPagination', () => {
  describe('active page in the middle', () => {
    it('should render pagination elements selectable by text', () => {
      const { getByText } = render(<PPagination totalItemsCount={3} activePage={2} />);

      expect(getByText('1')).toBeDefined();
      expect(getByText('2')).toBeDefined();
      expect(getByText('3')).toBeDefined();
    });

    it('should render pagination elements selectable by tag name', () => {
      const { container } = render(<PPagination totalItemsCount={3} activePage={2} />);

      expect(container.getElementsByTagName(`ul`).length).toBe(1);
      expect(container.getElementsByTagName(`li`).length).toBe(5);
    });

    it('should render pagination elements selectable by type', () => {
      const { container } = render(<PPagination totalItemsCount={3} activePage={2} />);

      expect(container.getElementsByTagName(`li`).length).toBe(5);

      expect(container.querySelectorAll(`[type="PREVIOUS_PAGE_LINK"]`).length).toBe(1);
      expect(container.querySelectorAll(`[type="NEXT_PAGE_LINK"]`).length).toBe(1);
      expect(container.querySelectorAll(`[type="PAGE"]`).length).toBe(3);
    });

    it('should render pagination elements selectable by value', () => {
      const { container } = render(<PPagination totalItemsCount={3} activePage={2} />);

      expect(container.querySelectorAll(`[value="1"]`).length).toBe(2);
      expect(container.querySelectorAll(`[value="2"]`).length).toBe(1);
      expect(container.querySelectorAll(`[value="3"]`).length).toBe(2);
    });

    it('should call onPageChange correctly', () => {
      const callback = jest.fn();
      const { container, getByText } = render(
        <PPagination onPageChange={callback} totalItemsCount={3} activePage={2} />
      );

      fireEvent.click(container.querySelector(`[type="PREVIOUS_PAGE_LINK"]`));
      expect(callback).toHaveBeenCalledWith({ page: 1, previousPage: 2 });
      callback.mockClear();

      fireEvent.click(container.querySelector(`[type="NEXT_PAGE_LINK"]`));
      expect(callback).toHaveBeenCalledWith({ page: 3, previousPage: 2 });
      callback.mockClear();

      fireEvent.click(getByText('1'));
      expect(callback).toHaveBeenCalledWith({ page: 1, previousPage: 2 });
      callback.mockClear();

      fireEvent.click(getByText('3'));
      expect(callback).toHaveBeenCalledWith({ page: 3, previousPage: 2 });
      callback.mockClear();
    });

    it('should render TagName of component', () => {
      const { container } = render(<PPagination />);
      expect(container.getElementsByTagName('p-pagination')).toBeTruthy();
    });
  });

  describe('active page as first page', () => {
    it('should render pagination elements selectable by value', () => {
      const { container } = render(<PPagination totalItemsCount={3} activePage={1} />);

      expect(container.querySelectorAll(`[value="1"]`).length).toBe(2);
      expect(container.querySelectorAll(`[value="2"]`).length).toBe(2);
      expect(container.querySelectorAll(`[value="3"]`).length).toBe(1);
    });

    it('should call onPageChange correctly', () => {
      const callback = jest.fn();
      const { container, getByText } = render(
        <PPagination onPageChange={callback} totalItemsCount={3} activePage={1} />
      );

      fireEvent.click(container.querySelector(`[type="PREVIOUS_PAGE_LINK"]`));
      expect(callback).toHaveBeenCalledWith({ page: 1, previousPage: 1 });
      callback.mockClear();

      fireEvent.click(container.querySelector(`[type="NEXT_PAGE_LINK"]`));
      expect(callback).toHaveBeenCalledWith({ page: 2, previousPage: 1 });
      callback.mockClear();

      fireEvent.click(getByText('1'));
      expect(callback).toHaveBeenCalledWith({ page: 1, previousPage: 1 });
      callback.mockClear();

      fireEvent.click(getByText('3'));
      expect(callback).toHaveBeenCalledWith({ page: 3, previousPage: 1 });
      callback.mockClear();
    });
  });

  describe('active page as last page', () => {
    it('should render pagination elements selectable by value', () => {
      const { container } = render(<PPagination totalItemsCount={3} activePage={3} />);

      expect(container.querySelectorAll(`[value="1"]`).length).toBe(1);
      expect(container.querySelectorAll(`[value="2"]`).length).toBe(2);
      expect(container.querySelectorAll(`[value="3"]`).length).toBe(2);
    });

    it('should call onPageChange correctly', () => {
      const callback = jest.fn();
      const { container, getByText } = render(
        <PPagination onPageChange={callback} totalItemsCount={3} activePage={3} />
      );

      fireEvent.click(container.querySelector(`[type="PREVIOUS_PAGE_LINK"]`));
      expect(callback).toHaveBeenCalledWith({ page: 2, previousPage: 3 });
      callback.mockClear();

      fireEvent.click(container.querySelector(`[type="NEXT_PAGE_LINK"]`));
      expect(callback).toHaveBeenCalledWith({ page: 3, previousPage: 3 });
      callback.mockClear();

      fireEvent.click(getByText('1'));
      expect(callback).toHaveBeenCalledWith({ page: 1, previousPage: 3 });
      callback.mockClear();

      fireEvent.click(getByText('3'));
      expect(callback).toHaveBeenCalledWith({ page: 3, previousPage: 3 });
      callback.mockClear();
    });
  });
});
