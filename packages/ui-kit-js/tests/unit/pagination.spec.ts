import { newSpecPage } from '@stencil/core/testing';
import { Pagination } from '../../src/components/navigation/pagination/pagination';
import * as PaginationHelper from '../../src/components/navigation/pagination/pagination-helper';

// when passing parameters with incorrect data type cast functions to general Function to not have TypeScript errors
const createPaginationModel = PaginationHelper.createPaginationModel as Function;
const getTotalPages = PaginationHelper.getTotalPages as Function;
const getCurrentActivePage = PaginationHelper.getCurrentActivePage as Function;

describe('Component <p-pagination>', () => {
  it('builds', () => {
    expect(new Pagination()).toBeTruthy();
  });

  it('should render 7 items in total with first item active and disabled prev link', async () => {
    const page = await newSpecPage({
      components: [Pagination],
      html: `<p-pagination total-items-count="50" items-per-page="10" active-page="1"></p-pagination>`,
    });

    const elContainer = page.root.shadowRoot.querySelector('.p-pagination__items');
    const elItemsList = elContainer.querySelectorAll('.p-pagination__item');
    const disabledPrevLinkContainer = elItemsList[0];
    const activeItemContainer = elItemsList[1];
    const activeItem = activeItemContainer.querySelector('span');
    const disabledPrevLink = disabledPrevLinkContainer.querySelector('a');

    expect(elItemsList.length).toBe(7);
    expect(activeItem).toHaveClass('p-pagination__goto--current');
    expect(disabledPrevLink).toHaveClass('p-pagination__prev--disabled');
  });

  it('should change page items', async () => {
    const page = await newSpecPage({
      components: [Pagination],
      html: `<p-pagination total-items-count="50" items-per-page="10" active-page="1"></p-pagination>`,
    });

    const elContainer = page.root.shadowRoot.querySelector('.p-pagination__items');
    const elItemsList = elContainer.querySelectorAll('.p-pagination__item');
    const secondItemContainer = elItemsList[2];
    const secondItemLink = secondItemContainer.querySelector('a');
    const linkSpy = jest.fn();
    page.win.addEventListener('pClick', linkSpy);
    await secondItemLink.click();
    await page.waitForChanges();
    expect(linkSpy).toHaveBeenCalled();
  });
});

describe('Pagination Functions:', () => {
  /**
   * Tests for Function createPaginationModel()
   */
  describe('createPaginationModel', () => {
    it('should throw an exception if options aren\'t passed', () => {
      expect(() => createPaginationModel())
        .toThrowError('createPaginationModel(): options object should be a passed');
    });
  });

  /**
   * Tests for Function getTotalPages()
   */
  describe('getTotalPages function', () => {
    it('should throw an exception if just one value is passed', () => {
      expect(() => getTotalPages(5))
        .toThrowError('getTotalPages(): totalItemsCount and itemsPerPage props must be provided');
    });

    it('should throw an exception if value isn\'t passed', () => {
      expect(() => getTotalPages())
        .toThrowError('getTotalPages(): totalItemsCount and itemsPerPage props must be provided');
    });

    it('should return the amount of pages', () => {
      expect(PaginationHelper.getTotalPages(100, 10))
        .toBe(10);
    });

    it('should return the ceil amount of pages', () => {
      expect(PaginationHelper.getTotalPages(91, 10))
        .toBe(10);
    });

    it('should return the minimum of one page if total amount of items is < 1', () => {
      expect(PaginationHelper.getTotalPages(0, 10))
        .toBe(1);
    });

    it('should return the minimum of one page if total amount of items per page is < 1', () => {
      expect(PaginationHelper.getTotalPages(10, 0))
        .toBe(10);
    });
  });

  /**
   * Tests for Function getCurrentActivePage()
   */
  describe('getCurrentActivePage function', () => {
    it('should throw an exception if value isn\'t passed', () => {
      expect(() => getCurrentActivePage(5))
        .toThrowError('getCurrentActivePage(): activePage and totalPages props must be provided');
    });

    it('should throw an exception if value isn\'t passed', () => {
      expect(() => getCurrentActivePage())
        .toThrowError('getCurrentActivePage(): activePage and totalPages props must be provided');
    });

    it('should return the minimum of one page', () => {
      expect(PaginationHelper.getCurrentActivePage(0, 10))
        .toBe(1);
    });

    it('should not be higher than total pages', () => {
      expect(PaginationHelper.getCurrentActivePage(15, 10))
        .toBe(10);
    });
  });


  // describe('getPaginationModel', () => {
  //   describe('when there is 1 page', () => {
  //     it('should return correct model for 1 of 1', () => {
  //       expect(createPaginationModel({ currentPage: 1, totalPages: 1 }))
  //         .toEqualPagination(['*1(<<)', '*1(<)', '*1', '*1(>)', '*1(>>)']);
  //     });
  //   });
  // });

});
