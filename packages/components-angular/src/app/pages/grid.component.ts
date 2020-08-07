import { Component } from '@angular/core';

@Component({
  selector: 'page-grid',
  styles: [`
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
  `],
  template: `
    <div class="playground" title="should render by defined size">
      <p-grid>
        <p-grid-item [size]="12">
          <p>12</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="1">
          <p>1</p>
        </p-grid-item>
        <p-grid-item [size]="11">
          <p>11</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="2">
          <p>2</p>
        </p-grid-item>
        <p-grid-item [size]="10">
          <p>10</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="3">
          <p>3</p>
        </p-grid-item>
        <p-grid-item [size]="9">
          <p>9</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="4">
          <p>4</p>
        </p-grid-item>
        <p-grid-item [size]="8">
          <p>8</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="5">
          <p>5</p>
        </p-grid-item>
        <p-grid-item [size]="7">
          <p>7</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="6">
          <p>6</p>
        </p-grid-item>
        <p-grid-item [size]="6">
          <p>6</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="7">
          <p>7</p>
        </p-grid-item>
        <p-grid-item [size]="5">
          <p>5</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="8">
          <p>8</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>4</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="9">
          <p>9</p>
        </p-grid-item>
        <p-grid-item [size]="3">
          <p>3</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="10">
          <p>10</p>
        </p-grid-item>
        <p-grid-item [size]="2">
          <p>2</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [size]="11">
          <p>11</p>
        </p-grid-item>
        <p-grid-item [size]="1">
          <p>1</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should adapt size depending on viewport">
      <p-grid>
        <p-grid-item [size]="{ base: 6, m: 2 }">
          <p>A</p>
        </p-grid-item>
        <p-grid-item [size]="{ base: 6, m: 10 }">
          <p>B</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should render by defined offset">
      <p-grid>
        <p-grid-item [offset]="1" [size]="11">
          <p>1</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="2" [size]="10">
          <p>2</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="3" [size]="9">
          <p>3</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="4" [size]="8">
          <p>4</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="5" [size]="7">
          <p>5</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="6" [size]="6">
          <p>6</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="7" [size]="5">
          <p>7</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="8" [size]="4">
          <p>8</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="9" [size]="3">
          <p>9</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="10" [size]="2">
          <p>10</p>
        </p-grid-item>
      </p-grid>
      <p-grid>
        <p-grid-item [offset]="11" [size]="1">
          <p>11</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should adapt offset depending on viewport">
      <p-grid>
        <p-grid-item [offset]="{ base: 6, m: 2 }" [size]="{ base: 6, m: 10 }">
          <p>A</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should render by direction 'row'">
      <p-grid [direction]="'row'">
        <p-grid-item [size]="4">
          <p>A</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>B</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>C</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should render by direction 'row-reverse'">
      <p-grid [direction]="'row-reverse'">
        <p-grid-item [size]="4">
          <p>A</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>B</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>C</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should render by direction 'column'">
      <p-grid [direction]="'column'">
        <p-grid-item [size]="4">
          <p>A</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>B</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>C</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should render by direction 'column-reverse'">
      <p-grid [direction]="'column-reverse'">
        <p-grid-item [size]="4">
          <p>A</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>B</p>
        </p-grid-item>
        <p-grid-item [size]="4">
          <p>C</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should adapt direction depending on viewport">
      <p-grid [direction]="{ base: 'column', m: 'row' }">
        <p-grid-item [size]="{ base: 12, m: 4 }">
          <p>A</p>
        </p-grid-item>
        <p-grid-item [size]="{ base: 12, m: 4 }">
          <p>B</p>
        </p-grid-item>
        <p-grid-item [size]="{ base: 12, m: 4 }">
          <p>C</p>
        </p-grid-item>
      </p-grid>
    </div>

    <div class="playground" title="should render nested grid elements correctly">
      <p-grid>
        <p-grid-item [size]="6">
          <p-grid>
            <p-grid-item [size]="6">
              <p>A</p>
            </p-grid-item>
            <p-grid-item [size]="6">
              <p>B</p>
            </p-grid-item>
          </p-grid>
        </p-grid-item>
        <p-grid-item [size]="6">
          <p-grid>
            <p-grid-item [size]="4">
              <p>A</p>
            </p-grid-item>
            <p-grid-item [size]="8">
              <p>B</p>
            </p-grid-item>
          </p-grid>
        </p-grid-item>
      </p-grid>
    </div>
  `
})
export class GridComponent {
}
