import { Component } from '@angular/core';

@Component({
  selector: 'page-flex',
  styles: [`
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

    p-flex-item[align-self] > p,
    p-flex-item[class*="p-flex__item--align-self-"] > p {
      background-color: deeppink;
    }

    p-flex[wrap] p {
      min-width: 10rem;
    }
  `],
  template: `
    <div class="playground" title="should show basic usage">
      <p-flex>
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should display inline-flex">
      <p-flex [inline]="true">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
      </p-flex>
      <p-flex [inline]="true">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt display mode depending on viewport">
      <p-flex [inline]="{ base: false, l: true }">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
      </p-flex>
      <p-flex [inline]="{ base: false, l: true }">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render flex items with direction 'row'">
      <p-flex [direction]="'row'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render flex items with direction 'row-reverse'">
      <p-flex [direction]="'row-reverse'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render flex items with direction 'column'">
      <p-flex [direction]="'column'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render flex items with direction 'column-reverse'">
      <p-flex [direction]="'column-reverse'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt direction of flex items depending on viewport">
      <p-flex [direction]="{ base: 'column', l: 'row' }">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render flex items by wrap mode 'nowrap'">
      <p-flex wrap="nowrap">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render flex items by wrap mode 'wrap'">
      <p-flex wrap="wrap">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render flex items by wrap mode 'wrap-reverse'">
      <p-flex wrap="wrap-reverse">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt wrap mode depending on viewport">
      <p-flex wrap="{ base: 'nowrap', l: 'wrap-reverse' }">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with justify-content mode 'flex-start'">
      <p-flex [justifyContent]="'flex-start'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with justify-content mode 'flex-end'">
      <p-flex [justifyContent]="'flex-end'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with justify-content mode 'center'">
      <p-flex [justifyContent]="'center'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with justify-content mode 'space-between'">
      <p-flex [justifyContent]="'space-between'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with justify-content mode 'space-around'">
      <p-flex [justifyContent]="'space-around'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with justify-content mode 'space-evenly'">
      <p-flex [justifyContent]="'space-evenly'">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt justify-content mode depending on viewport">
      <p-flex [justifyContent]="{ base: 'flex-start', l: 'flex-end' }">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-items mode 'stretch'">
      <p-flex [alignItems]="'stretch'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-items mode 'flex-start'">
      <p-flex [alignItems]="'flex-start'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-items mode 'flex-end'">
      <p-flex [alignItems]="'flex-end'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-items mode 'center'">
      <p-flex [alignItems]="'center'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-items mode 'baseline'">
      <p-flex [alignItems]="'baseline'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt align-items mode depending on viewport">
      <p-flex [alignItems]="{ base: 'flex-start', l: 'flex-end' }" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-content mode 'stretch'">
      <p-flex wrap="wrap" [alignContent]="'stretch'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-content mode 'flex-start'">
      <p-flex wrap="wrap" [alignContent]="'flex-start'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-content mode 'flex-end'">
      <p-flex wrap="wrap" [alignContent]="'flex-end'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-content mode 'center'">
      <p-flex wrap="wrap" [alignContent]="'center'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-content mode 'space-between'">
      <p-flex wrap="wrap" [alignContent]="'space-between'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-content mode 'space-around'">
      <p-flex wrap="wrap" [alignContent]="'space-around'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-content mode 'space-evenly'">
      <p-flex wrap="wrap" [alignContent]="'space-evenly'" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt align-content mode depending on viewport">
      <p-flex wrap="wrap" [alignContent]="{ base: 'flex-start', l: 'flex-end' }" style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item>
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
        <p-flex-item>
          <p>5</p>
        </p-flex-item>
        <p-flex-item>
          <p>6</p>
        </p-flex-item>
        <p-flex-item>
          <p>7</p>
        </p-flex-item>
        <p-flex-item>
          <p>8</p>
        </p-flex-item>
        <p-flex-item>
          <p>9</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by defined width">
      <p-flex>
        <p-flex-item [width]="'one-quarter'">
          <p>one-quarter</p>
        </p-flex-item>
        <p-flex-item [width]="'one-quarter'">
          <p>one-quarter</p>
        </p-flex-item>
        <p-flex-item [width]="'one-quarter'">
          <p>one-quarter</p>
        </p-flex-item>
        <p-flex-item [width]="'one-quarter'">
          <p>one-quarter</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [width]="'one-third'">
          <p>one-third</p>
        </p-flex-item>
        <p-flex-item [width]="'one-third'">
          <p>one-third</p>
        </p-flex-item>
        <p-flex-item [width]="'one-third'">
          <p>one-third</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [width]="'half'">
          <p>half</p>
        </p-flex-item>
        <p-flex-item [width]="'half'">
          <p>half</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [width]="'two-thirds'">
          <p>two-thirds</p>
        </p-flex-item>
        <p-flex-item [width]="'one-third'">
          <p>one-third</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [width]="'three-quarters'">
          <p>three-quarters</p>
        </p-flex-item>
        <p-flex-item [width]="'one-quarter'">
          <p>one-quarter</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [width]="'full'">
          <p>full</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt width depending on viewport">
      <p-flex wrap="wrap">
        <p-flex-item [width]="{ base: 'half', l: 'one-quarter' }">
          <p>1</p>
        </p-flex-item>
        <p-flex-item [width]="{ base: 'half', l: 'one-quarter' }">
          <p>2</p>
        </p-flex-item>
        <p-flex-item [width]="{ base: 'half', l: 'one-quarter' }">
          <p>3</p>
        </p-flex-item>
        <p-flex-item [width]="{ base: 'half', l: 'one-quarter' }">
          <p>4</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by defined offset">
      <p-flex>
        <p-flex-item [offset]="'one-quarter'" [width]="'three-quarters'">
          <p>Offset: quarter</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [offset]="'one-third'" [width]="'two-thirds'">
          <p>Offset: third</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [offset]="'half'" [width]="'half'">
          <p>Offset: half</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [offset]="'two-thirds'" [width]="'one-third'">
          <p>Offset: 2 thirds</p>
        </p-flex-item>
      </p-flex>
      <p-flex>
        <p-flex-item [offset]="'three-quarters'" [width]="'one-quarter'">
          <p>Offset: 3 quarters</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt offset depending on viewport">
      <p-flex>
        <p-flex-item [offset]="{ base: 'none', l: 'one-third' }">
          <p>Responsive offset</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-self mode 'auto'">
      <p-flex style="height: 180px;" [alignItems]="'flex-end'">
        <p-flex-item [alignSelf]="'stretch'">
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item align-self="auto">
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-self mode 'stretch'">
      <p-flex style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item [alignSelf]="'stretch'">
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-self mode 'flex-start'">
      <p-flex style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item [alignSelf]="'flex-start'">
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-self mode 'flex-end'">
      <p-flex style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item [alignSelf]="'flex-end'">
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-self mode 'center'">
      <p-flex style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item [alignSelf]="'center'">
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render with align-self mode 'baseline'">
      <p-flex style="height: 180px;">
        <p-flex-item [alignSelf]="'baseline'">
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item [alignSelf]="'baseline'" style="margin-top: 1rem;">
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt align-self mode depending on viewport">
      <p-flex style="height: 180px;">
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
        <p-flex-item [alignSelf]="{ base: 'flex-start', l: 'flex-end' }">
          <p>3</p>
        </p-flex-item>
        <p-flex-item>
          <p>4</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by grow mode '0'">
      <p-flex>
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item [grow]="0">
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by grow mode '1'">
      <p-flex>
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item [grow]="1">
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt grow mode depending on viewport">
      <p-flex>
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item [grow]="{ base: 1, l: 0 }">
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by shrink mode '1'">
      <p-flex>
        <p-flex-item [shrink]="1" style="width: 80%;">
          <p>1</p>
        </p-flex-item>
        <p-flex-item style="width: 80%;">
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by shrink mode '0'">
      <p-flex>
        <p-flex-item [shrink]="0" style="width: 80%;">
          <p>1</p>
        </p-flex-item>
        <p-flex-item style="width: 80%;">
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt shrink mode depending on viewport">
      <p-flex>
        <p-flex-item [shrink]="{ base: 0, l: 1 }" style="width: 80%;">
          <p>1</p>
        </p-flex-item>
        <p-flex-item style="width: 80%;">
          <p>2</p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by predefined flex shorthand mode 'initial'">
      <p-flex>
        <p-flex-item [flex]="'initial'">
          <p>
            1 - short content
          </p>
        </p-flex-item>
        <p-flex-item [flex]="'initial'">
          <p>
            2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space
          </p>
        </p-flex-item>
        <p-flex-item [flex]="'initial'">
          <p>
            3 - short content
          </p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by predefined flex shorthand mode 'auto'">
      <p-flex>
        <p-flex-item [flex]="'auto'">
          <p>
            1 - short content
          </p>
        </p-flex-item>
        <p-flex-item [flex]="'auto'">
          <p>
            2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space
          </p>
        </p-flex-item>
        <p-flex-item [flex]="'auto'">
          <p>
            3 - short content
          </p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by predefined flex shorthand mode 'equal'">
      <p-flex>
        <p-flex-item [flex]="'equal'">
          <p>
            1 - short content
          </p>
        </p-flex-item>
        <p-flex-item [flex]="'equal'">
          <p>
            2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space
          </p>
        </p-flex-item>
        <p-flex-item [flex]="'equal'">
          <p>
            3 - short content
          </p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should render by predefined flex shorthand mode 'none'">
      <p-flex>
        <p-flex-item [flex]="'none'">
          <p>
            1 - short content
          </p>
        </p-flex-item>
        <p-flex-item [flex]="'none'">
          <p>
            2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space
          </p>
        </p-flex-item>
        <p-flex-item [flex]="'none'">
          <p>
            3 - short content
          </p>
        </p-flex-item>
      </p-flex>
    </div>

    <div class="playground" title="should adapt predefined flex shorthand mode depending on viewport">
      <p-flex>
        <p-flex-item [flex]="{base: 'initial', l: 'equal'}">
          <p>
            1 - short content
          </p>
        </p-flex-item>
        <p-flex-item [flex]="{base: 'initial', l: 'equal'}">
          <p>
            2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space
          </p>
        </p-flex-item>
        <p-flex-item [flex]="{base: 'initial', l: 'equal'}">
          <p>
            3 - short content
          </p>
        </p-flex-item>
      </p-flex>
    </div>
  `
})
export class FlexComponent {
}
