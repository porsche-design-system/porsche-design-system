import { newSpecPage } from '@stencil/core/testing';
import { Pagination } from '../../../src/components/navigation/pagination/pagination';
import * as PaginationHelper from '../../../src/components/navigation/pagination/pagination-helper';
import { formatPaginationModelToASCII } from './pagination-test-helper';

const createPaginationModel = PaginationHelper.createPaginationModel as Function;
const getTotalPages = PaginationHelper.getTotalPages as Function;
const getCurrentActivePage = PaginationHelper.getCurrentActivePage as Function;

describe('Component <p-pagination>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Pagination],
      html: `<p-pagination total-items-count="50" items-per-page="10" active-page="1"></p-pagination>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-pagination')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-pagination')).toBeTruthy();
  });

  it('should render 7 items in total with first item active and disabled prev link', async () => {
    const page = await newSpecPage({
      components: [Pagination],
      html: `<p-pagination total-items-count="50" items-per-page="10" active-page="1" max-number-of-page-links="7"></p-pagination>`,
    });

    const elContainer = page.root.shadowRoot.querySelector('.p-pagination__items');
    const elItemsList = elContainer.querySelectorAll('.p-pagination__item');
    const disabledPrevLinkContainer = elItemsList[0];
    const activeItemContainer = elItemsList[1];
    const activeItem = activeItemContainer.querySelector('span');
    const disabledPrevLink = disabledPrevLinkContainer.querySelector('span');

    expect(elItemsList.length).toBe(7);
    expect(activeItem).toHaveClass('p-pagination__goto--current');
    expect(disabledPrevLink).toHaveClass('p-pagination__prev--disabled');
  });

  it('should emit event on page change', async () => {
    const page = await newSpecPage({
      components: [Pagination],
      html: `<p-pagination total-items-count="50" items-per-page="10" active-page="1"></p-pagination>`,
    });

    const elContainer = page.root.shadowRoot.querySelector('.p-pagination__items');
    const elItemsList = elContainer.querySelectorAll('.p-pagination__item');
    const secondItemContainer = elItemsList[2];
    const secondItemLink = secondItemContainer.querySelector('.p-pagination__goto');
    const linkSpy = jest.fn();
    page.win.addEventListener('pageChange', linkSpy);
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

    describe('when there is 1 page', () => {
      it('should return correct model for 1 of 1', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 1, pageTotal: 1, pageRange: 1})))
          .toEqual(['1(<)', '*1', '1(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 1 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 1, pageTotal: 10, pageRange: 1})))
          .toEqual(['1(<)', '*1', '2', '3', '4', '5', '6(...>)', '10', '*2(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 2 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 2, pageTotal: 10, pageRange: 1})))
          .toEqual(['*1(<)', '1', '*2', '3', '4', '5', '6(...>)', '10', '*3(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 3 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 3, pageTotal: 10, pageRange: 1})))
          .toEqual(['*2(<)', '1', '2', '*3', '4', '5', '6(...>)', '10', '*4(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 4 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 4, pageTotal: 10, pageRange: 1})))
          .toEqual(['*3(<)', '1', '2', '3', '*4', '5', '6(...>)', '10', '*5(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 5 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 5, pageTotal: 10, pageRange: 1})))
          .toEqual(['*4(<)', '1', '3(<...)', '4', '*5', '6', '7(...>)', '10', '*6(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 6 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 6, pageTotal: 10, pageRange: 1})))
          .toEqual(['*5(<)', '1', '4(<...)', '5', '*6', '7', '8(...>)', '10', '*7(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 7 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 7, pageTotal: 10, pageRange: 1})))
          .toEqual(['*6(<)', '1', '5(<...)', '6', '*7', '8', '9', '10', '*8(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 8 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 8, pageTotal: 10, pageRange: 1})))
          .toEqual(['*7(<)', '1', '5(<...)', '6', '7', '*8', '9', '10', '*9(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 9 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 9, pageTotal: 10, pageRange: 1})))
          .toEqual(['*8(<)', '1', '5(<...)', '6', '7', '8', '*9', '10', '*10(>)']);
      });
    });

    describe('when there are 10 pages', () => {
      it('should return correct model for 10 of 10', () => {
        expect(formatPaginationModelToASCII(createPaginationModel({activePage: 10, pageTotal: 10, pageRange: 1})))
          .toEqual(['*9(<)', '1', '5(<...)', '6', '7', '8', '9', '*10', '10(>)']);
      });
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
});
