import { newSpecPage } from '@stencil/core/testing';
import { Pagination } from '../../../src/components/navigation/pagination/pagination';

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
