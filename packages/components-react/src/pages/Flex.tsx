/* Auto Generated File */
import { PFlex, PFlexItem } from '@porsche-design-system/components-react';

export const FlexPage = (): JSX.Element => {
  const style = `
    p-flex-item p {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 4px 2vw;
      box-sizing: border-box;
      text-align: center;
      background-color: lightskyblue;
    }

    p-flex-item:nth-child(1n) p {
      background-color: skyblue;
    }

    p-flex-item:nth-child(2n) p {
      background-color: deepskyblue;
    }

    p-flex-item:nth-child(3n) p {
      background-color: dodgerblue;
    }

    p-flex-item:nth-child(4n) p {
      background-color: royalblue;
    }

    p-flex-item.align-self p {
      background-color: darkviolet;
    }

    p-flex.wrap p {
      min-width: 10rem;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground" title="should show basic usage">
        <PFlex>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should display inline-flex">
        <PFlex inline={true}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
        </PFlex>
        <PFlex inline={true}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt display mode depending on viewport">
        <PFlex inline={{ base: false, l: true }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
        </PFlex>
        <PFlex inline={{ base: false, l: true }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render flex items with direction 'row'">
        <PFlex direction="row">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render flex items with direction 'row-reverse'">
        <PFlex direction="row-reverse">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render flex items with direction 'column'">
        <PFlex direction="column">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render flex items with direction 'column-reverse'">
        <PFlex direction="column-reverse">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt direction of flex items depending on viewport">
        <PFlex direction={{ base: 'column', l: 'row' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render flex items by wrap mode 'nowrap'">
        <PFlex className="wrap" wrap="nowrap">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render flex items by wrap mode 'wrap'">
        <PFlex className="wrap" wrap="wrap">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render flex items by wrap mode 'wrap-reverse'">
        <PFlex className="wrap" wrap="wrap-reverse">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt wrap mode depending on viewport">
        <PFlex className="wrap" wrap={{ base: 'nowrap', l: 'wrap-reverse' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with justify-content mode 'flex-start'">
        <PFlex justifyContent="flex-start">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with justify-content mode 'flex-end'">
        <PFlex justifyContent="flex-end">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with justify-content mode 'center'">
        <PFlex justifyContent="center">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with justify-content mode 'space-between'">
        <PFlex justifyContent="space-between">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with justify-content mode 'space-around'">
        <PFlex justifyContent="space-around">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with justify-content mode 'space-evenly'">
        <PFlex justifyContent="space-evenly">
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt justify-content mode depending on viewport">
        <PFlex justifyContent={{ base: 'flex-start', l: 'flex-end' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-items mode 'stretch'">
        <PFlex alignItems="stretch" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-items mode 'flex-start'">
        <PFlex alignItems="flex-start" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-items mode 'flex-end'">
        <PFlex alignItems="flex-end" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-items mode 'center'">
        <PFlex alignItems="center" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-items mode 'baseline'">
        <PFlex alignItems="baseline" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt align-items mode depending on viewport">
        <PFlex alignItems={{ base: 'flex-start', l: 'flex-end' }} style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-content mode 'stretch'">
        <PFlex className="wrap" wrap="wrap" alignContent="stretch" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-content mode 'flex-start'">
        <PFlex className="wrap" wrap="wrap" alignContent="flex-start" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-content mode 'flex-end'">
        <PFlex className="wrap" wrap="wrap" alignContent="flex-end" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-content mode 'center'">
        <PFlex className="wrap" wrap="wrap" alignContent="center" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-content mode 'space-between'">
        <PFlex className="wrap" wrap="wrap" alignContent="space-between" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-content mode 'space-around'">
        <PFlex className="wrap" wrap="wrap" alignContent="space-around" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-content mode 'space-evenly'">
        <PFlex className="wrap" wrap="wrap" alignContent="space-evenly" style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt align-content mode depending on viewport">
        <PFlex className="wrap" wrap="wrap" alignContent={{ base: 'flex-start', l: 'flex-end' }} style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
          <PFlexItem>
            <p>5</p>
          </PFlexItem>
          <PFlexItem>
            <p>6</p>
          </PFlexItem>
          <PFlexItem>
            <p>7</p>
          </PFlexItem>
          <PFlexItem>
            <p>8</p>
          </PFlexItem>
          <PFlexItem>
            <p>9</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by defined width">
        <PFlex>
          <PFlexItem width="one-quarter">
            <p>one-quarter</p>
          </PFlexItem>
          <PFlexItem width="one-quarter">
            <p>one-quarter</p>
          </PFlexItem>
          <PFlexItem width="one-quarter">
            <p>one-quarter</p>
          </PFlexItem>
          <PFlexItem width="one-quarter">
            <p>one-quarter</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem width="one-third">
            <p>one-third</p>
          </PFlexItem>
          <PFlexItem width="one-third">
            <p>one-third</p>
          </PFlexItem>
          <PFlexItem width="one-third">
            <p>one-third</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem width="half">
            <p>half</p>
          </PFlexItem>
          <PFlexItem width="half">
            <p>half</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem width="two-thirds">
            <p>two-thirds</p>
          </PFlexItem>
          <PFlexItem width="one-third">
            <p>one-third</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem width="three-quarters">
            <p>three-quarters</p>
          </PFlexItem>
          <PFlexItem width="one-quarter">
            <p>one-quarter</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem width="full">
            <p>full</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt width depending on viewport">
        <PFlex className="wrap" wrap="wrap">
          <PFlexItem width={{ base: 'half', l: 'one-quarter' }}>
            <p>1</p>
          </PFlexItem>
          <PFlexItem width={{ base: 'half', l: 'one-quarter' }}>
            <p>2</p>
          </PFlexItem>
          <PFlexItem width={{ base: 'half', l: 'one-quarter' }}>
            <p>3</p>
          </PFlexItem>
          <PFlexItem width={{ base: 'half', l: 'one-quarter' }}>
            <p>4</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by defined offset">
        <PFlex>
          <PFlexItem offset="one-quarter" width="three-quarters">
            <p>Offset: quarter</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem offset="one-third" width="two-thirds">
            <p>Offset: third</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem offset="half" width="half">
            <p>Offset: half</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem offset="two-thirds" width="one-third">
            <p>Offset: 2 thirds</p>
          </PFlexItem>
        </PFlex>
        <PFlex>
          <PFlexItem offset="three-quarters" width="one-quarter">
            <p>Offset: 3 quarters</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt offset depending on viewport">
        <PFlex>
          <PFlexItem offset={{ base: 'none', l: 'one-third' }}>
            <p>Responsive offset</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-self mode 'auto'">
        <PFlex alignItems="flex-end" style={{ height: '180px' }}>
          <PFlexItem className="align-self" alignSelf="stretch">
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem className="align-self" alignSelf="auto">
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-self mode 'stretch'">
        <PFlex style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem className="align-self" alignSelf="stretch">
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-self mode 'flex-start'">
        <PFlex style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem className="align-self" alignSelf="flex-start">
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-self mode 'flex-end'">
        <PFlex style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem className="align-self" alignSelf="flex-end">
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-self mode 'center'">
        <PFlex style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem className="align-self" alignSelf="center">
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render with align-self mode 'baseline'">
        <PFlex style={{ height: '180px' }}>
          <PFlexItem className="align-self" alignSelf="baseline">
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem className="align-self" alignSelf="baseline" style={{ marginTop: '1rem' }}>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt align-self mode depending on viewport">
        <PFlex style={{ height: '180px' }}>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem>
            <p>2</p>
          </PFlexItem>
          <PFlexItem className="align-self" alignSelf={{ base: 'flex-start', l: 'flex-end' }}>
            <p>3</p>
          </PFlexItem>
          <PFlexItem>
            <p>4</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by grow mode '0'">
        <PFlex>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem grow={0}>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by grow mode '1'">
        <PFlex>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem grow={1}>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt grow mode depending on viewport">
        <PFlex>
          <PFlexItem>
            <p>1</p>
          </PFlexItem>
          <PFlexItem grow={{ base: 1, l: 0 }}>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by shrink mode '1'">
        <PFlex>
          <PFlexItem shrink={1} style={{ width: '80%' }}>
            <p>1</p>
          </PFlexItem>
          <PFlexItem style={{ width: '80%' }}>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by shrink mode '0'">
        <PFlex>
          <PFlexItem shrink={0} style={{ width: '80%' }}>
            <p>1</p>
          </PFlexItem>
          <PFlexItem style={{ width: '80%' }}>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt shrink mode depending on viewport">
        <PFlex>
          <PFlexItem shrink={{ base: 0, l: 1 }} style={{ width: '80%' }}>
            <p>1</p>
          </PFlexItem>
          <PFlexItem style={{ width: '80%' }}>
            <p>2</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by predefined flex shorthand mode 'initial'">
        <PFlex>
          <PFlexItem flex="initial">
            <p>1 - short content</p>
          </PFlexItem>
          <PFlexItem flex="initial">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </PFlexItem>
          <PFlexItem flex="initial">
            <p>3 - short content</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by predefined flex shorthand mode 'auto'">
        <PFlex>
          <PFlexItem flex="auto">
            <p>1 - short content</p>
          </PFlexItem>
          <PFlexItem flex="auto">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </PFlexItem>
          <PFlexItem flex="auto">
            <p>3 - short content</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by predefined flex shorthand mode 'equal'">
        <PFlex>
          <PFlexItem flex="equal">
            <p>1 - short content</p>
          </PFlexItem>
          <PFlexItem flex="equal">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </PFlexItem>
          <PFlexItem flex="equal">
            <p>3 - short content</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should render by predefined flex shorthand mode 'none'">
        <PFlex>
          <PFlexItem flex="none">
            <p>1 - short content</p>
          </PFlexItem>
          <PFlexItem flex="none">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </PFlexItem>
          <PFlexItem flex="none">
            <p>3 - short content</p>
          </PFlexItem>
        </PFlex>
      </div>

      <div className="playground" title="should adapt predefined flex shorthand mode depending on viewport">
        <PFlex>
          <PFlexItem flex={{ base: 'initial', l: 'equal' }}>
            <p>1 - short content</p>
          </PFlexItem>
          <PFlexItem flex={{ base: 'initial', l: 'equal' }}>
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </PFlexItem>
          <PFlexItem flex={{ base: 'initial', l: 'equal' }}>
            <p>3 - short content</p>
          </PFlexItem>
        </PFlex>
      </div>
    </>
  );
};
