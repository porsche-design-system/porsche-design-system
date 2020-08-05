import { PFlex as Flex, PFlexItem as FlexItem } from '@porsche-design-system/components-react';
import React from 'react';

export const FlexPage = (): JSX.Element => {
  const style = `
    p-flex-item > p {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 4px 2vw;
      box-sizing: border-box;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }

    p-flex-item:nth-child(1n) > p {
      background-color: skyblue;
    }

    p-flex-item:nth-child(2n) > p {
      background-color: deepskyblue;
    }

    p-flex-item:nth-child(3n) > p {
      background-color: dodgerblue;
    }

    p-flex-item:nth-child(4n) > p {
      background-color: royalblue;
    }

    p-flex-item[align-self] > p {
      background-color: deeppink;
    }

    p-flex[wrap] p {
      min-width: 10rem;
    }
  `;
  return (
    <>
      <style children={style} />

      <div className="playground" title="should show basic usage">
        <Flex>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should display inline-flex">
        <Flex inline="true">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
        </Flex>
        <Flex inline="true">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt display mode depending on viewport">
        <Flex inline="{ base: false, l: true }">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
        </Flex>
        <Flex inline="{ base: false, l: true }">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render flex items with direction 'row'">
        <Flex direction="row">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render flex items with direction 'row-reverse'">
        <Flex direction="row-reverse">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render flex items with direction 'column'">
        <Flex direction="column">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render flex items with direction 'column-reverse'">
        <Flex direction="column-reverse">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt direction of flex items depending on viewport">
        <Flex direction="{ base: 'column', l: 'row' }">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render flex items by wrap mode 'nowrap'">
        <Flex wrap="nowrap">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render flex items by wrap mode 'wrap'">
        <Flex wrap="wrap">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render flex items by wrap mode 'wrap-reverse'">
        <Flex wrap="wrap-reverse">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt wrap mode depending on viewport">
        <Flex wrap="{ base: 'nowrap', l: 'wrap-reverse' }">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with justify-content mode 'flex-start'">
        <Flex justify-content="flex-start">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with justify-content mode 'flex-end'">
        <Flex justify-content="flex-end">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with justify-content mode 'center'">
        <Flex justify-content="center">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with justify-content mode 'space-between'">
        <Flex justify-content="space-between">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with justify-content mode 'space-around'">
        <Flex justify-content="space-around">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with justify-content mode 'space-evenly'">
        <Flex justify-content="space-evenly">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt justify-content mode depending on viewport">
        <Flex justify-content="{ base: 'flex-start', l: 'flex-end' }">
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-items mode 'stretch'">
        <Flex align-items="stretch" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-items mode 'flex-start'">
        <Flex align-items="flex-start" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-items mode 'flex-end'">
        <Flex align-items="flex-end" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-items mode 'center'">
        <Flex align-items="center" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-items mode 'baseline'">
        <Flex align-items="baseline" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt align-items mode depending on viewport">
        <Flex align-items="{ base: 'flex-start', l: 'flex-end' }" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-content mode 'stretch'">
        <Flex wrap="wrap" align-content="stretch" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-content mode 'flex-start'">
        <Flex wrap="wrap" align-content="flex-start" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-content mode 'flex-end'">
        <Flex wrap="wrap" align-content="flex-end" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-content mode 'center'">
        <Flex wrap="wrap" align-content="center" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-content mode 'space-between'">
        <Flex wrap="wrap" align-content="space-between" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-content mode 'space-around'">
        <Flex wrap="wrap" align-content="space-around" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-content mode 'space-evenly'">
        <Flex wrap="wrap" align-content="space-evenly" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt align-content mode depending on viewport">
        <Flex wrap="wrap" align-content="{ base: 'flex-start', l: 'flex-end' }" style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
          <FlexItem>
            <p>5</p>
          </FlexItem>
          <FlexItem>
            <p>6</p>
          </FlexItem>
          <FlexItem>
            <p>7</p>
          </FlexItem>
          <FlexItem>
            <p>8</p>
          </FlexItem>
          <FlexItem>
            <p>9</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by defined width">
        <Flex>
          <FlexItem width="one-quarter">
            <p>one-quarter</p>
          </FlexItem>
          <FlexItem width="one-quarter">
            <p>one-quarter</p>
          </FlexItem>
          <FlexItem width="one-quarter">
            <p>one-quarter</p>
          </FlexItem>
          <FlexItem width="one-quarter">
            <p>one-quarter</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem width="one-third">
            <p>one-third</p>
          </FlexItem>
          <FlexItem width="one-third">
            <p>one-third</p>
          </FlexItem>
          <FlexItem width="one-third">
            <p>one-third</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem width="half">
            <p>half</p>
          </FlexItem>
          <FlexItem width="half">
            <p>half</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem width="two-thirds">
            <p>two-thirds</p>
          </FlexItem>
          <FlexItem width="one-third">
            <p>one-third</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem width="three-quarters">
            <p>three-quarters</p>
          </FlexItem>
          <FlexItem width="one-quarter">
            <p>one-quarter</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem width="full">
            <p>full</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt width depending on viewport">
        <Flex wrap="wrap">
          <FlexItem width="{ base: 'half', l: 'one-quarter' }">
            <p>1</p>
          </FlexItem>
          <FlexItem width="{ base: 'half', l: 'one-quarter' }">
            <p>2</p>
          </FlexItem>
          <FlexItem width="{ base: 'half', l: 'one-quarter' }">
            <p>3</p>
          </FlexItem>
          <FlexItem width="{ base: 'half', l: 'one-quarter' }">
            <p>4</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by defined offset">
        <Flex>
          <FlexItem offset="one-quarter" width="three-quarters">
            <p>Offset: quarter</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem offset="one-third" width="two-thirds">
            <p>Offset: third</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem offset="half" width="half">
            <p>Offset: half</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem offset="two-thirds" width="one-third">
            <p>Offset: 2 thirds</p>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem offset="three-quarters" width="one-quarter">
            <p>Offset: 3 quarters</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt offset depending on viewport">
        <Flex>
          <FlexItem offset="{ base: 'none', l: 'one-third' }">
            <p>Responsive offset</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-self mode 'auto'">
        <Flex style={{ height: 180 }} align-items="flex-end">
          <FlexItem align-self="stretch">
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem align-self="auto">
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-self mode 'stretch'">
        <Flex style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem align-self="stretch">
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-self mode 'flex-start'">
        <Flex style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem align-self="flex-start">
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-self mode 'flex-end'">
        <Flex style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem align-self="flex-end">
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-self mode 'center'">
        <Flex style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem align-self="center">
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render with align-self mode 'baseline'">
        <Flex style={{ height: 180 }}>
          <FlexItem align-self="baseline">
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem align-self="baseline" style={{ marginTop: '1rem' }}>
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt align-self mode depending on viewport">
        <Flex style={{ height: 180 }}>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem>
            <p>2</p>
          </FlexItem>
          <FlexItem align-self="{ base: 'flex-start', l: 'flex-end' }">
            <p>3</p>
          </FlexItem>
          <FlexItem>
            <p>4</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by grow mode '0'">
        <Flex>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem grow="0">
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by grow mode '1'">
        <Flex>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem grow="1">
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt grow mode depending on viewport">
        <Flex>
          <FlexItem>
            <p>1</p>
          </FlexItem>
          <FlexItem grow="{ base: 1, l: 0 }">
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by shrink mode '1'">
        <Flex>
          <FlexItem shrink="1" style={{ width: '80%' }}>
            <p>1</p>
          </FlexItem>
          <FlexItem style={{ width: '80%' }}>
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by shrink mode '0'">
        <Flex>
          <FlexItem shrink="0" style={{ width: '80%' }}>
            <p>1</p>
          </FlexItem>
          <FlexItem style={{ width: '80%' }}>
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt shrink mode depending on viewport">
        <Flex>
          <FlexItem shrink="{ base: 0, l: 1 }" style={{ width: '80%' }}>
            <p>1</p>
          </FlexItem>
          <FlexItem style={{ width: '80%' }}>
            <p>2</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by predefined flex shorthand mode 'initial'">
        <Flex>
          <FlexItem flex="initial">
            <p>1 - short content</p>
          </FlexItem>
          <FlexItem flex="initial">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </FlexItem>
          <FlexItem flex="initial">
            <p>3 - short content</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by predefined flex shorthand mode 'auto'">
        <Flex>
          <FlexItem flex="auto">
            <p>1 - short content</p>
          </FlexItem>
          <FlexItem flex="auto">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </FlexItem>
          <FlexItem flex="auto">
            <p>3 - short content</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by predefined flex shorthand mode 'equal'">
        <Flex>
          <FlexItem flex="equal">
            <p>1 - short content</p>
          </FlexItem>
          <FlexItem flex="equal">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </FlexItem>
          <FlexItem flex="equal">
            <p>3 - short content</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should render by predefined flex shorthand mode 'none'">
        <Flex>
          <FlexItem flex="none">
            <p>1 - short content</p>
          </FlexItem>
          <FlexItem flex="none">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </FlexItem>
          <FlexItem flex="none">
            <p>3 - short content</p>
          </FlexItem>
        </Flex>
      </div>

      <div className="playground" title="should adapt predefined flex shorthand mode depending on viewport">
        <Flex>
          <FlexItem flex="{base: 'initial', l: 'equal'}">
            <p>1 - short content</p>
          </FlexItem>
          <FlexItem flex="{base: 'initial', l: 'equal'}">
            <p>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p>
          </FlexItem>
          <FlexItem flex="{base: 'initial', l: 'equal'}">
            <p>3 - short content</p>
          </FlexItem>
        </Flex>
      </div>
    </>
  );
};
