import {
  createPaginationModel,
  getTotalPages,
  getCurrentActivePage,
  createRange,
  ItemType,
  type PaginationItem,
} from './pagination-utils';

const paginationModelItemToSymbolPart = (item: PaginationItem, index: number): string => {
  switch (item.type) {
    case ItemType.PREVIOUS:
      return '<';
    case ItemType.NEXT:
      return '>';
    case ItemType.ELLIPSIS:
      return index === 2 ? '<...' : '...>';
  }
};

const formatPaginationModelToASCII = (items: PaginationItem[]): string[] => {
  return items.map((item, idx) => {
    const symbolPart = paginationModelItemToSymbolPart(item, idx);
    return [item.isActive ? '*' : '', item.value, symbolPart ? `(${symbolPart})` : ''].join('');
  });
};

describe('createRange()', () => {
  it.each<[number, number, number[]]>([
    [0, 1, [0, 1]],
    [1, 1, [1]],
    [-1, 0, [-1, 0]],
    [5, 10, [5, 6, 7, 8, 9, 10]],
  ])('should for start: %s and end: %s return: %s', (start, end, result) => {
    expect(createRange(start, end)).toEqual(result);
  });
});

describe('createPaginationModel()', () => {
  const pageRange = 1;

  describe('for showLastPage = true', () => {
    describe('for pageTotal = 1', () => {
      it('should return correct model for 1 of 1', () => {
        expect(
          formatPaginationModelToASCII(
            createPaginationModel({ activePage: 1, pageTotal: 1, pageRange, showLastPage: true })
          )
        ).toEqual(['1(<)', '*1', '1(>)']);
      });
    });

    describe('for pageTotal = 10', () => {
      it.each<[number, string[]]>([
        [1, ['1(<)', '*1', '2', '3', '4', '5', '(...>)', '10', '*2(>)']],
        [2, ['*1(<)', '1', '*2', '3', '4', '5', '(...>)', '10', '*3(>)']],
        [3, ['*2(<)', '1', '2', '*3', '4', '5', '(...>)', '10', '*4(>)']],
        [4, ['*3(<)', '1', '2', '3', '*4', '5', '(...>)', '10', '*5(>)']],
        [5, ['*4(<)', '1', '(<...)', '4', '*5', '6', '(...>)', '10', '*6(>)']],
        [6, ['*5(<)', '1', '(<...)', '5', '*6', '7', '(...>)', '10', '*7(>)']],
        [7, ['*6(<)', '1', '(<...)', '6', '*7', '8', '9', '10', '*8(>)']],
        [8, ['*7(<)', '1', '(<...)', '6', '7', '*8', '9', '10', '*9(>)']],
        [9, ['*8(<)', '1', '(<...)', '6', '7', '8', '*9', '10', '*10(>)']],
        [10, ['*9(<)', '1', '(<...)', '6', '7', '8', '9', '*10', '10(>)']],
      ])('should return correct model for %s of 10', (activePage, result) => {
        expect(
          formatPaginationModelToASCII(
            createPaginationModel({ activePage, pageTotal: 10, pageRange, showLastPage: true })
          )
        ).toEqual(result);
      });
    });
  });

  describe('for showLastPage = false', () => {
    describe('for pageTotal = 1', () => {
      it('should return correct model for 1 of 1', () => {
        expect(
          formatPaginationModelToASCII(
            createPaginationModel({ activePage: 1, pageTotal: 1, pageRange, showLastPage: false })
          )
        ).toEqual(['1(<)', '*1', '1(>)']);
      });
    });

    describe('for pageTotal = 10', () => {
      it.each<[number, string[]]>([
        [1, ['1(<)', '*1', '2', '3', '4', '5', '(...>)', '*2(>)']],
        [2, ['*1(<)', '1', '*2', '3', '4', '5', '(...>)', '*3(>)']],
        [3, ['*2(<)', '1', '2', '*3', '4', '5', '(...>)', '*4(>)']],
        [4, ['*3(<)', '1', '2', '3', '*4', '5', '(...>)', '*5(>)']],
        [5, ['*4(<)', '1', '(<...)', '4', '*5', '6', '(...>)', '*6(>)']],
        [6, ['*5(<)', '1', '(<...)', '5', '*6', '7', '(...>)', '*7(>)']],
        [7, ['*6(<)', '1', '(<...)', '6', '*7', '8', '(...>)', '*8(>)']],
        [8, ['*7(<)', '1', '(<...)', '7', '*8', '9', '10', '*9(>)']],
        [9, ['*8(<)', '1', '(<...)', '7', '8', '*9', '10', '*10(>)']],
        [10, ['*9(<)', '1', '(<...)', '7', '8', '9', '*10', '10(>)']],
      ])('should return correct model for %s of 10', (activePage, result) => {
        expect(
          formatPaginationModelToASCII(
            createPaginationModel({ activePage, pageTotal: 10, pageRange, showLastPage: false })
          )
        ).toEqual(result);
      });
    });
  });
});

describe('getTotalPages()', () => {
  it('should return the amount of pages', () => {
    expect(getTotalPages(100, 10)).toBe(10);
  });

  it('should return the ceil amount of pages', () => {
    expect(getTotalPages(91, 10)).toBe(10);
  });

  it('should return the minimum of one page if total amount of items is < 1', () => {
    expect(getTotalPages(0, 10)).toBe(1);
  });

  it('should return the minimum of one page if total amount of items per page is < 1', () => {
    expect(getTotalPages(10, 0)).toBe(10);
  });
});

describe('getCurrentActivePage()', () => {
  it('should return the minimum of one page', () => {
    expect(getCurrentActivePage(0, 10)).toBe(1);
  });

  it('should not be higher than total pages', () => {
    expect(getCurrentActivePage(15, 10)).toBe(10);
  });
});
