import { PGrid as Grid, PGridItem as GridItem } from '@porsche-design-system/components-react';
import React from 'react';

export const GridPage = (): JSX.Element => {
  const style = `
    p-grid-item p {
      margin: 0;
      padding: 4px 0;
      text-align: center;
      color: #fff;
      background-color: lightskyblue;
    }

    p-grid ~ p-grid p {
      margin - top: 4px;
    }
  `;
  return (
    <>
      <style children={style} />

      <div className="playground" title="should render by defined size">
        <Grid>
          <GridItem size="12">
            <p>12</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="1">
            <p>1</p>
          </GridItem>
          <GridItem size="11">
            <p>11</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="2">
            <p>2</p>
          </GridItem>
          <GridItem size="10">
            <p>10</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="3">
            <p>3</p>
          </GridItem>
          <GridItem size="9">
            <p>9</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="4">
            <p>4</p>
          </GridItem>
          <GridItem size="8">
            <p>8</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="5">
            <p>5</p>
          </GridItem>
          <GridItem size="7">
            <p>7</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="6">
            <p>6</p>
          </GridItem>
          <GridItem size="6">
            <p>6</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="7">
            <p>7</p>
          </GridItem>
          <GridItem size="5">
            <p>5</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="8">
            <p>8</p>
          </GridItem>
          <GridItem size="4">
            <p>4</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="9">
            <p>9</p>
          </GridItem>
          <GridItem size="3">
            <p>3</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="10">
            <p>10</p>
          </GridItem>
          <GridItem size="2">
            <p>2</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem size="11">
            <p>11</p>
          </GridItem>
          <GridItem size="1">
            <p>1</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should adapt size depending on viewport">
        <Grid>
          <GridItem size="{ base: 6, m: 2 }">
            <p>A</p>
          </GridItem>
          <GridItem size="{ base: 6, m: 10 }">
            <p>B</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should render by defined offset">
        <Grid>
          <GridItem offset="1" size="11">
            <p>1</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="2" size="10">
            <p>2</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="3" size="9">
            <p>3</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="4" size="8">
            <p>4</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="5" size="7">
            <p>5</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="6" size="6">
            <p>6</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="7" size="5">
            <p>7</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="8" size="4">
            <p>8</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="9" size="3">
            <p>9</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="10" size="2">
            <p>10</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem offset="11" size="1">
            <p>11</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should adapt offset depending on viewport">
        <Grid>
          <GridItem offset="{ base: 6, m: 2 }" size="{ base: 6, m: 10 }">
            <p>A</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should render by direction 'row'">
        <Grid direction="row">
          <GridItem size="4">
            <p>A</p>
          </GridItem>
          <GridItem size="4">
            <p>B</p>
          </GridItem>
          <GridItem size="4">
            <p>C</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should render by direction 'row-reverse'">
        <Grid direction="row-reverse">
          <GridItem size="4">
            <p>A</p>
          </GridItem>
          <GridItem size="4">
            <p>B</p>
          </GridItem>
          <GridItem size="4">
            <p>C</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should render by direction 'column'">
        <Grid direction="column">
          <GridItem size="4">
            <p>A</p>
          </GridItem>
          <GridItem size="4">
            <p>B</p>
          </GridItem>
          <GridItem size="4">
            <p>C</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should render by direction 'column-reverse'">
        <Grid direction="column-reverse">
          <GridItem size="4">
            <p>A</p>
          </GridItem>
          <GridItem size="4">
            <p>B</p>
          </GridItem>
          <GridItem size="4">
            <p>C</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should adapt direction depending on viewport">
        <Grid direction="{ base: 'column', m: 'row' }">
          <GridItem size="{ base: 12, m: 4 }">
            <p>A</p>
          </GridItem>
          <GridItem size="{ base: 12, m: 4 }">
            <p>B</p>
          </GridItem>
          <GridItem size="{ base: 12, m: 4 }">
            <p>C</p>
          </GridItem>
        </Grid>
      </div>

      <div className="playground" title="should render nested grid elements correctly">
        <Grid>
          <GridItem size="6">
            <Grid>
              <GridItem size="6">
                <p>A</p>
              </GridItem>
              <GridItem size="6">
                <p>B</p>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem size="6">
            <Grid>
              <GridItem size="4">
                <p>A</p>
              </GridItem>
              <GridItem size="8">
                <p>B</p>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </div>
    </>
  );
};
