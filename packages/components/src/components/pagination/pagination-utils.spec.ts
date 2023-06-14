import { createPaginationModel, getTotalPages, getCurrentActivePage, createRange, ItemType } from './pagination-utils';
import type { PaginationItem } from './pagination-utils';

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
  describe('for pageTotal = 1', () => {
    it('should return correct model for 1 of 1', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 1, pageTotal: 1, pageRange: 1 }))
      ).toEqual(['1(<)', '*1', '1(>)']);
    });
  });

  describe('for pageTotal = 10', () => {
    it('should return correct model for 1 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 1, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['1(<)', '*1', '2', '3', '4', '5', '(...>)', '10', '*2(>)']);
    });

    it('should return correct model for 2 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 2, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*1(<)', '1', '*2', '3', '4', '5', '(...>)', '10', '*3(>)']);
    });

    it('should return correct model for 3 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 3, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*2(<)', '1', '2', '*3', '4', '5', '(...>)', '10', '*4(>)']);
    });

    it('should return correct model for 4 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 4, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*3(<)', '1', '2', '3', '*4', '5', '(...>)', '10', '*5(>)']);
    });

    it('should return correct model for 5 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 5, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*4(<)', '1', '(<...)', '4', '*5', '6', '(...>)', '10', '*6(>)']);
    });

    it('should return correct model for 6 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 6, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*5(<)', '1', '(<...)', '5', '*6', '7', '(...>)', '10', '*7(>)']);
    });

    it('should return correct model for 7 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 7, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*6(<)', '1', '(<...)', '6', '*7', '8', '9', '10', '*8(>)']);
    });

    it('should return correct model for 8 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 8, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*7(<)', '1', '(<...)', '6', '7', '*8', '9', '10', '*9(>)']);
    });

    it('should return correct model for 9 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 9, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*8(<)', '1', '(<...)', '6', '7', '8', '*9', '10', '*10(>)']);
    });

    it('should return correct model for 10 of 10', () => {
      expect(
        formatPaginationModelToASCII(createPaginationModel({ activePage: 10, pageTotal: 10, pageRange: 1 }))
      ).toEqual(['*9(<)', '1', '(<...)', '6', '7', '8', '9', '*10', '10(>)']);
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
