/* Auto Generated File */
import { PGrid, PGridItem } from '@porsche-design-system/components-react';

export const GridPage = (): JSX.Element => {
  const style = `
    p-grid-item > p {
      margin: 0;
      padding: 4px 0;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }

    p-grid ~ p-grid p {
      margin-top: 4px;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground" title="should render by defined size">
        <PGrid>
          <PGridItem size={12}>
            <p>12</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={1}>
            <p>1</p>
          </PGridItem>
          <PGridItem size={11}>
            <p>11</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={2}>
            <p>2</p>
          </PGridItem>
          <PGridItem size={10}>
            <p>10</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={3}>
            <p>3</p>
          </PGridItem>
          <PGridItem size={9}>
            <p>9</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={4}>
            <p>4</p>
          </PGridItem>
          <PGridItem size={8}>
            <p>8</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={5}>
            <p>5</p>
          </PGridItem>
          <PGridItem size={7}>
            <p>7</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={6}>
            <p>6</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>6</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={7}>
            <p>7</p>
          </PGridItem>
          <PGridItem size={5}>
            <p>5</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={8}>
            <p>8</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>4</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={9}>
            <p>9</p>
          </PGridItem>
          <PGridItem size={3}>
            <p>3</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={10}>
            <p>10</p>
          </PGridItem>
          <PGridItem size={2}>
            <p>2</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem size={11}>
            <p>11</p>
          </PGridItem>
          <PGridItem size={1}>
            <p>1</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should adapt size depending on viewport">
        <PGrid>
          <PGridItem size={{ base: 6, m: 2 }}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={{ base: 6, m: 10 }}>
            <p>B</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by defined offset">
        <PGrid>
          <PGridItem offset={1} size={11}>
            <p>1</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={2} size={10}>
            <p>2</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={3} size={9}>
            <p>3</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={4} size={8}>
            <p>4</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={5} size={7}>
            <p>5</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={6} size={6}>
            <p>6</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={7} size={5}>
            <p>7</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={8} size={4}>
            <p>8</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={9} size={3}>
            <p>9</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={10} size={2}>
            <p>10</p>
          </PGridItem>
        </PGrid>
        <PGrid>
          <PGridItem offset={11} size={1}>
            <p>11</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should adapt offset depending on viewport">
        <PGrid>
          <PGridItem offset={{ base: 6, m: 2 }} size={{ base: 6, m: 10 }}>
            <p>A</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by direction 'row'">
        <PGrid direction="row">
          <PGridItem size={4}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by direction 'row-reverse'">
        <PGrid direction="row-reverse">
          <PGridItem size={4}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by direction 'column'">
        <PGrid direction="column">
          <PGridItem size={4}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by direction 'column-reverse'">
        <PGrid direction="column-reverse">
          <PGridItem size={4}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={4}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should adapt direction depending on viewport">
        <PGrid direction={{ base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' }}>
          <PGridItem size={{ base: 12, m: 4 }}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={{ base: 12, m: 4 }}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={{ base: 12, m: 4 }}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by wrap 'wrap'">
        <PGrid wrap="wrap">
          <PGridItem size={6}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by wrap 'nowrap'">
        <PGrid wrap="nowrap">
          <PGridItem size={6}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should adapt wrap depending on viewport">
        <PGrid wrap={{ base: 'wrap', m: 'nowrap' }}>
          <PGridItem size={6}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should adapt direction and wrap depending on viewport">
        <PGrid
          wrap={{ base: 'wrap', xs: 'nowrap', s: 'wrap', m: 'nowrap', l: 'wrap', xl: 'nowrap' }}
          direction={{ base: 'column', m: 'row' }}
        >
          <PGridItem size={6}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>C</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by gutter '16'">
        <PGrid gutter={16}>
          <PGridItem size={6}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by gutter '24'">
        <PGrid gutter={24}>
          <PGridItem size={6}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render by gutter '36'">
        <PGrid gutter={36}>
          <PGridItem size={6}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should adapt gutter, wrap and direction depending on viewport">
        <PGrid
          gutter={{ base: 16, xs: 24, s: 36, m: 16, l: 24, xl: 36 }}
          wrap={{ base: 'wrap', m: 'nowrap' }}
          direction={{ base: 'column', m: 'row' }}
        >
          <PGridItem size={6}>
            <p>A</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
          <PGridItem size={6}>
            <p>B</p>
          </PGridItem>
        </PGrid>
      </div>

      <div className="playground" title="should render nested grid elements correctly">
        <PGrid>
          <PGridItem size={6}>
            <PGrid>
              <PGridItem size={6}>
                <p>A</p>
              </PGridItem>
              <PGridItem size={6}>
                <p>B</p>
              </PGridItem>
            </PGrid>
          </PGridItem>
          <PGridItem size={6}>
            <PGrid>
              <PGridItem size={4}>
                <p>A</p>
              </PGridItem>
              <PGridItem size={8}>
                <p>B</p>
              </PGridItem>
            </PGrid>
          </PGridItem>
        </PGrid>
      </div>
    </>
  );
};
