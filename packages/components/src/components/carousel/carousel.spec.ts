import * as splideModule from '@splidejs/splide';
import { Splide } from '@splidejs/splide';
import * as breakpointCustomizableUtils from '../../utils/breakpoint-customizable';
import * as breakpointObserverUtils from '../../utils/breakpoint-observer';
import * as breakpointObserverUtilsUtils from '../../utils/breakpoint-observer-utils';
import * as hasDescription from '../../utils/form/hasDescription';
import * as hasHeading from '../../utils/form/hasHeading';
import * as jsonUtils from '../../utils/json';
import * as warnIfDeprecatedPropIsUsed from '../../utils/log/warnIfDeprecatedPropIsUsed';
import * as validatePropsUtils from '../../utils/validation/validateProps';
import { Carousel } from './carousel';
import * as carouselUtils from './carousel-utils';

const splideMock = {
  index: 0,
  on: (_, __) => ({}) as Splide,
  mount: () => {},
  Components: { Elements: { slides: [] } },
} as Splide;

const getContainerEl = (): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'splide';

  const track = document.createElement('div');
  track.className = 'splide__track';

  const list = document.createElement('div');
  list.className = 'splide__list';

  track.append(list);
  container.append(track);

  return container;
};

const getHostEl = (): HTMLElement => {
  const host = document.createElement('p-carousel');
  host.attachShadow({ mode: 'open' });
  return host;
};

let originalMatchMedia: typeof window.matchMedia;
beforeAll(() => {
  originalMatchMedia = window.matchMedia;
  // global window matchMedia mock does not work here
  // @ts-ignore
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
});

afterAll(() => {
  window.matchMedia = originalMatchMedia;
});

describe('connectedCallback', () => {
  it('should call this.observeBreakpointChange()', () => {
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.connectedCallback();
    expect(spy).toHaveBeenCalledWith();
  });

  describe('on reconnect', () => {
    it('should call this.updateSlidesAndPagination()', () => {
      const component = new Carousel();
      component.host = document.createElement('p-carousel');
      component['splide'] = splideMock;
      const spy = jest.spyOn(component, 'updateSlidesAndPagination' as any).mockImplementation();

      component.connectedCallback();
      expect(spy).toHaveBeenCalledWith();
    });

    it('should call this.registerSplideHandlers() with correct parameters', () => {
      const component = new Carousel();
      component.host = document.createElement('p-carousel');
      component['splide'] = splideMock;
      jest.spyOn(component, 'updateSlidesAndPagination' as any).mockImplementation();
      const spy = jest.spyOn(component, 'registerSplideHandlers' as any);

      component.connectedCallback();
      expect(spy).toHaveBeenCalledWith(component['splide']);
    });
  });
});

describe('componentWillLoad', () => {
  it('should call parseJSON() in private "parsedSlidesPerPage()" with correct parameters', () => {
    const spy = jest.spyOn(breakpointCustomizableUtils, 'parseJSON').mockReturnValue(5);
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    component.slidesPerPage = 2;

    component.componentWillLoad();
    expect(spy).toHaveBeenCalledWith(2);

    expect(component.slidesPerPage).toBe(2);
    expect((component as any).parsedSlidesPerPage).toBe(5);
  });

  it('should call this.updateSlidesAndPagination()', () => {
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    const spy = jest.spyOn(component, 'updateSlidesAndPagination' as any);

    component.componentWillLoad();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call this.observeBreakpointChange()', () => {
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    const spy = jest.spyOn(component, 'observeBreakpointChange' as any);

    component.componentWillLoad();
    expect(spy).toHaveBeenCalledWith();
  });
});

describe('componentDidLoad', () => {
  it('should call getSplideBreakpoints() with correct parameters', () => {
    jest.spyOn(splideModule, 'Splide').mockReturnValue(splideMock);
    const spy = jest.spyOn(carouselUtils, 'getSplideBreakpoints');
    const component = new Carousel();
    component.host = getHostEl();
    component['container'] = getContainerEl(); // ref to actual container element
    component.slidesPerPage = 3;

    component.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(3);
  });

  it('should call parseJSONAttribute() with correct parameter', () => {
    jest.spyOn(splideModule, 'Splide').mockReturnValue(splideMock);
    const spy = jest.spyOn(jsonUtils, 'parseJSONAttribute');
    const component = new Carousel();
    component.host = getHostEl();
    component['container'] = getContainerEl(); // ref to actual container element
    component.intl = { first: 'first' };

    component.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(component.intl);
  });

  it('should call Splide constructor with correct parameters and set this.splide', () => {
    const spy = jest.spyOn(splideModule, 'Splide').mockReturnValue(splideMock);

    const component = new Carousel();
    component.host = getHostEl();
    component['container'] = getContainerEl(); // ref to actual container element
    expect(component['splide']).toBeUndefined();

    component.componentDidLoad();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0]).toMatchSnapshot();
    expect(component['splide']).toBe(splideMock);
  });

  it('should call Splide constructor with correct parameters and set this.splide for slidesPerPage=auto', () => {
    const spy = jest.spyOn(splideModule, 'Splide').mockReturnValue(splideMock);

    const component = new Carousel();
    component.host = getHostEl();
    component['container'] = getContainerEl(); // ref to actual container element
    component.slidesPerPage = 'auto';
    expect(component['splide']).toBeUndefined();

    component.componentDidLoad();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0]).toMatchSnapshot();
    expect(component['splide']).toBe(splideMock);
  });

  it('should call this.registerSplideHandlers() with correct parameters', () => {
    jest.spyOn(splideModule, 'Splide').mockReturnValue(splideMock);
    const component = new Carousel();
    component.host = getHostEl();
    component['container'] = getContainerEl(); // ref to actual container element
    const spy = jest.spyOn(component, 'registerSplideHandlers' as any);

    component.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(splideMock);
  });
});

describe('render', () => {
  it('should call warnIfDeprecatedPropIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(warnIfDeprecatedPropIsUsed, 'warnIfDeprecatedPropIsUsed');
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    component.wrapContent = true;
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component, 'wrapContent');
  });

  it('should call hasHeading() with correct parameters', () => {
    const spy = jest.spyOn(hasHeading, 'hasHeading');
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    component.host.attachShadow({ mode: 'open' });
    component.heading = 'heading';

    component.render();
    expect(spy).toHaveBeenCalledWith(component.host, component.heading);
  });

  it('should call hasDescription() with correct parameters', () => {
    const spy = jest.spyOn(hasDescription, 'hasDescription');
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    component.host.attachShadow({ mode: 'open' });
    component.description = 'description';

    component.render();
    expect(spy).toHaveBeenCalledWith(component.host, component.description);
  });

  it('should call parseJSON() with correct parameter and set this.disablePagination', () => {
    jest.spyOn(validatePropsUtils, 'validateProps').mockImplementation();
    const spy = jest.spyOn(breakpointCustomizableUtils, 'parseJSON').mockReturnValue(false);
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    component.host.attachShadow({ mode: 'open' });
    component.disablePagination = true;

    component.render();
    expect(spy).toHaveBeenCalledWith(true);

    expect(component.disablePagination).toBe(false);
  });
});

describe('componentDidUpdate', () => {
  it('should call this.splide.refresh()', () => {
    jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const refreshSpy: () => Splide = jest.fn();
    const component = new Carousel();
    component['splide'] = { refresh: refreshSpy } as Splide;

    component.componentDidUpdate();
    expect(refreshSpy).toHaveBeenCalledWith();
  });

  it('should set drag in this.splide.options to true when amountOfPages > 1', () => {
    jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const component = new Carousel();

    const mockSplideInstance = {
      options: {},
      refresh: () => {},
    } as Splide;

    component['splide'] = mockSplideInstance;
    component['amountOfPages'] = 2;

    component.componentDidUpdate();
    expect(mockSplideInstance.options.drag).toBe(true);
  });

  it('should set drag in this.splide.options to false when amountOfPages <= 1', () => {
    jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const component = new Carousel();

    component['splide'] = {
      options: {},
      refresh: () => {},
    } as Splide;
    component['amountOfPages'] = 1;

    component.componentDidUpdate();
    expect(component['splide'].options.drag).toBe(false);
  });

  it('should set drag in this.splide.options to true when slidesPerPage set to auto', () => {
    jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const component = new Carousel();

    const mockSplideInstance = {
      options: {},
      refresh: () => {},
    } as Splide;

    component['splide'] = mockSplideInstance;
    component['slidesPerPage'] = 'auto';

    component.componentDidUpdate();
    expect(mockSplideInstance.options.drag).toBe(true);
  });

  it('should call renderPagination when hasNavigation = true', () => {
    jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockReturnValueOnce();
    const renderPaginationSpy = jest.spyOn(carouselUtils, 'renderPagination').mockImplementation();
    const component = new Carousel();
    component['splide'] = {
      options: {},
      refresh: () => {},
    } as Splide;
    Object.defineProperty(component, 'hasNavigation', { value: true });

    component.componentDidUpdate();
    expect(renderPaginationSpy).toHaveBeenCalledWith(
      component['paginationEl'],
      component['amountOfPages'],
      0,
      component['splide']
    );
  });

  it('should not call renderPagination when hasNavigation = false', () => {
    const renderPaginationSpy = jest.spyOn(carouselUtils, 'renderPagination').mockImplementation();
    const component = new Carousel();
    component['splide'] = {
      options: {},
      refresh: () => {},
    } as Splide;
    Object.defineProperty(component, 'hasNavigation', { value: false });

    component.componentDidUpdate();
    expect(renderPaginationSpy).not.toHaveBeenCalled();
  });

  it('should call updatePrevNextButtons() with correct parameters when hasNavigation = true', () => {
    const spy = jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const component = new Carousel();
    Object.defineProperty(component, 'hasNavigation', { value: true });
    component['splide'] = {
      refresh: () => {},
    } as Splide;

    component.componentDidUpdate();
    expect(spy).toHaveBeenCalledWith(component['btnPrev'], component['btnNext'], component['splide']);
  });

  it('should not call updatePrevNextButtons() when hasNavigation = false', () => {
    const spy = jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const component = new Carousel();
    Object.defineProperty(component, 'hasNavigation', { value: false });
    component['splide'] = {
      refresh: () => {},
    } as Splide;

    component.componentDidUpdate();
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('disconnectedCallback', () => {
  it('should call unobserveBreakpointChange() with correct parameters', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'unobserveBreakpointChange');
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    component['splide'] = { destroy: jest.fn() as any } as Splide;

    component.disconnectedCallback();
    expect(spy).toHaveBeenCalledWith(component.host);
  });

  it('should call this.splide.destroy()', () => {
    const destroySpy: () => Splide = jest.fn();
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    component['splide'] = { destroy: destroySpy } as Splide;

    component.disconnectedCallback();
    expect(destroySpy).toHaveBeenCalledWith();
  });
});

describe('registerSplideHandlers()', () => {
  it('should call this.splide.on() with correct parameters', () => {
    const onSpy: (_, __) => Splide = jest.fn();
    const component = new Carousel();
    const splide = { ...splideMock, on: onSpy } as Splide;

    component['registerSplideHandlers'](splide);
    expect(onSpy).toHaveBeenCalledTimes(2);
    expect(onSpy).toHaveBeenNthCalledWith(1, 'mounted', expect.any(Function));
    expect(onSpy).toHaveBeenNthCalledWith(2, 'move', expect.any(Function));
  });

  it('should call updatePrevNextButtons() and renderPagination() when this.splide.options.drag = true with correct parameters on mounted event', () => {
    const updatePrevNextButtonsSpy = jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const renderPaginationSpy = jest.spyOn(carouselUtils, 'renderPagination').mockImplementation();
    const component = new Carousel();
    component['splide'] = new Splide(getContainerEl(), { drag: true }); // actual implementation for verifying event emission
    component['registerSplideHandlers'](component['splide']);

    component['splide'].emit('mounted');
    expect(updatePrevNextButtonsSpy).toHaveBeenCalledWith(
      component['btnPrev'],
      component['btnNext'],
      component['splide']
    );
    expect(renderPaginationSpy).toHaveBeenCalledWith(
      component['paginationEl'],
      component['amountOfPages'],
      0,
      component['splide']
    );
  });

  it('should not call updatePrevNextButtons() and renderPagination() when this.splide.options.drag = false on mounted event', () => {
    const updatePrevNextButtonsSpy = jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const renderPaginationSpy = jest.spyOn(carouselUtils, 'renderPagination').mockImplementation();
    const component = new Carousel();
    component['splide'] = new Splide(getContainerEl(), { drag: false }); // actual implementation for verifying event emission
    component['registerSplideHandlers'](component['splide']);

    component['splide'].emit('mounted');
    expect(updatePrevNextButtonsSpy).not.toHaveBeenCalled();
    expect(renderPaginationSpy).not.toHaveBeenCalled();
  });

  it('should call updatePrevNextButtons(), updatePagination(), this.change.emit() and this.carouselChange.emit() with correct parameters on splide events', () => {
    const updatePrevNextButtonsSpy = jest.spyOn(carouselUtils, 'updatePrevNextButtons').mockImplementation();
    const updatePaginationSpy = jest.spyOn(carouselUtils, 'updatePagination').mockImplementation();
    const changeEmitSpy = jest.fn();
    const carouselChangeEmitSpy = jest.fn();
    const component = new Carousel();
    component['amountOfPages'] = 2; // hasNavigation = true
    component['splide'] = new Splide(getContainerEl()); // actual implementation for verifying event emission
    component['update'] = { emit: changeEmitSpy };
    component['carouselChange'] = { emit: carouselChangeEmitSpy };
    component['registerSplideHandlers'](component['splide']);

    component['splide'].emit('move', 1, 0);
    expect(updatePrevNextButtonsSpy).toHaveBeenCalledWith(
      component['btnPrev'],
      component['btnNext'],
      component['splide']
    );
    expect(updatePaginationSpy).toHaveBeenCalledWith(component['paginationEl'], 2, 1);
    expect(changeEmitSpy).toHaveBeenCalledWith({ activeIndex: 1, previousIndex: 0 });
    expect(carouselChangeEmitSpy).toHaveBeenCalledWith({ activeIndex: 1, previousIndex: 0 });
  });

  it('should call this.splide.mount()', () => {
    const mountSpy: (_, __) => Splide = jest.fn();
    const splide = { ...splideMock, mount: mountSpy } as Splide;
    const component = new Carousel();

    component['registerSplideHandlers'](splide);
    expect(mountSpy).toHaveBeenCalledWith();
  });
});

describe('observeBreakpointChange()', () => {
  it('should not call observeBreakpointChange() if slidesPerPage is a number', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const component = new Carousel();
    component.slidesPerPage = 1;

    component['observeBreakpointChange']();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call observeBreakpointChange() with correct parameters if slidesPerPage is an object', () => {
    const spy = jest.spyOn(breakpointObserverUtils, 'observeBreakpointChange');
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    component.slidesPerPage = { base: 2, m: 3 };

    component['observeBreakpointChange']();
    expect(spy).toHaveBeenCalledWith(component.host, component['updateAmountOfPages']);
  });
});

describe('updateSlidesAndPagination()', () => {
  it('should call getSlides() with correct parameter and set this.slides', () => {
    const slide1 = document.createElement('div');
    slide1.id = 'slide1';
    const slide2 = document.createElement('div');
    slide2.id = 'slide2';
    const getSlidesMock = [slide1, slide2];
    const spy = jest.spyOn(carouselUtils, 'getSlidesAndAddAttributes').mockReturnValue(getSlidesMock);
    const component = new Carousel();
    component.host = document.createElement('p-carousel');
    expect(component['slides']).toEqual([]);

    component['updateSlidesAndPagination']();
    expect(spy).toHaveBeenCalledWith(component.host);
    expect(component['slides']).toBe(getSlidesMock);
  });

  it('should call this.updateAmountOfPages()', () => {
    jest.spyOn(carouselUtils, 'getSlidesAndAddAttributes').mockImplementation(() => []);
    const component = new Carousel();
    const spy = jest.spyOn(component, 'updateAmountOfPages' as any);

    component['updateSlidesAndPagination']();
    expect(spy).toHaveBeenCalledWith();
  });
});

describe('updateAmountOfPages()', () => {
  it('should call getCurrentMatchingBreakpointValue() and getAmountOfPages() with correct parameters and set this.amountOfPages', () => {
    const getAmountOfPagesSpy = jest.spyOn(carouselUtils, 'getAmountOfPages').mockReturnValue(5);
    const getCurrentMatchingBreakpointValueSpy = jest
      .spyOn(breakpointObserverUtilsUtils, 'getCurrentMatchingBreakpointValue')
      .mockReturnValue(11);
    const mathRoundSpy = jest.spyOn(Math, 'round').mockReturnValue(12);
    const component = new Carousel();
    component.slidesPerPage = 1;
    component['slides'] = new Array(2);
    expect(component['amountOfPages']).toBeUndefined();

    component['updateAmountOfPages']();
    expect(getCurrentMatchingBreakpointValueSpy).toHaveBeenCalledWith(1);
    expect(mathRoundSpy).toHaveBeenCalledWith(11);
    expect(getAmountOfPagesSpy).toHaveBeenCalledWith(2, 12);
    expect(component['amountOfPages']).toBe(5);
  });

  it('should call getCurrentMatchingBreakpointValue() and getAmountOfPages() with correct parameters and set this.amountOfPages for slidesPerPage=auto', () => {
    const getAmountOfPagesSpy = jest.spyOn(carouselUtils, 'getAmountOfPages').mockReturnValue(5);
    const getCurrentMatchingBreakpointValueSpy = jest.spyOn(
      breakpointObserverUtilsUtils,
      'getCurrentMatchingBreakpointValue'
    );
    const mathRoundSpy = jest.spyOn(Math, 'round').mockReturnValue(12);
    const component = new Carousel();
    component.slidesPerPage = 'auto';
    component['slides'] = new Array(2);
    expect(component['amountOfPages']).toBeUndefined();

    component['updateAmountOfPages']();
    expect(getCurrentMatchingBreakpointValueSpy).not.toHaveBeenCalledWith();
    expect(mathRoundSpy).not.toHaveBeenCalled();
    expect(getAmountOfPagesSpy).toHaveBeenCalledWith(2, 1); // 'auto' causes a value of 1
    expect(component['amountOfPages']).toBe(5);
  });

  it('should call renderPagination() with correct parameters', () => {
    jest.spyOn(carouselUtils, 'getAmountOfPages').mockReturnValue(5);
    const spy = jest.spyOn(carouselUtils, 'renderPagination');
    const component = new Carousel();
    component['slides'] = new Array(2);
    component['splide'] = { index: 1 } as Splide;

    component['updateAmountOfPages']();
    expect(spy).toHaveBeenCalledWith(component['paginationEl'], 5, 1, component['splide']);
  });
});
