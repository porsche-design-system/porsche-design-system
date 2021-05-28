# Table

## Live Example

<Playground>
  <p-table ref="table">
    <p-table-head>
      <p-table-row>
        <p-table-head-cell v-for="(item, index) in headData" :key="index" ref="headCells">{{ item.name }}</p-table-head-cell>
      </p-table-row>
    </p-table-head>
    <p-table-body>
      <p-table-row v-for="(item, index) in bodyData" :key="index">
        <p-table-cell>
          <p-flex>
            <p-flex-item>
              <img :src="item.imageUrl" width="80" style="margin-right: 8px" alt="">
            </p-flex-item>
            <p-flex-item>
              <p-text weight="semibold">{{ item.model }}</p-text>
              <p-text size="x-small">{{ item.date }}</p-text>
            </p-flex-item>
          </p-flex>
        </p-table-cell>
        <p-table-cell>{{ item.interest }}</p-table-cell>
        <p-table-cell>{{ item.vin }}</p-table-cell>
        <p-table-cell>{{ item.purchaseIntention }}</p-table-cell>
        <p-table-cell>{{ item.status }}</p-table-cell>
        <p-table-cell>{{ item.leadId }}</p-table-cell>
        <p-table-cell>
          <p-button-pure icon="edit">
            <span style="white-space: nowrap">Edit Lead</span>
          </p-button-pure>
        </p-table-cell>
        <p-table-cell>
          <p-button variant="tertiary" icon="refresh">
            <span style="white-space: nowrap">Overwrite</span>
          </p-button>
        </p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>
</Playground>

## Framework Implementations

<p-tabs>
  <p-tabs-item label="Angular">
    <pre><code class="language-ts">{{ angularExample }}</code></pre>
  </p-tabs-item>
  <p-tabs-item label="React">
  <pre><code class="language-tsx">{{ reactExample }}</code></pre>
  </p-tabs-item>
</p-tabs>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { highlight, languages } from 'prismjs';
  import { data, head, getTableCodeSample } from '@porsche-design-system/shared';

  @Component
  export default class Code extends Vue {
    headData = head;
    bodyData = data;
    angularExample = getTableCodeSample('angular');
    reactExample = getTableCodeSample('react');

    mounted(): void {
      this.syncHeadCellProperties();
      this.registerEvents();
      
      this.$el.querySelectorAll('code').forEach((el) => {
        const { className } = el;
        if (className === 'language-ts') {
          el.innerHTML = highlight(el.innerText, languages.markup, 'markup');
        } else if (className === 'language-tsx') {
          el.innerHTML = highlight(el.innerText, languages.jsx, 'language-jsx');
        }
      });
    }

    registerEvents(): void {
      const { table } = this.$refs;
      table.addEventListener('sortingChange', (e) => {
        const { key, direction } = e.detail;
        this.headData = this.headData.map((x) => ({ ...x, isSorting: false, ...(x.key === key && e.detail) }));
        this.bodyData = [...this.bodyData].sort((a, b) => (direction === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])));
        this.syncHeadCellProperties();
      });
    }

    syncHeadCellProperties(): void {
      this.$refs.headCells.forEach((cell, i) => {
        cell.item = this.headData[i];
      });
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  code,
  pre {
    color: $p-color-default;
    text-shadow: 0 1px rgba(255, 255, 255, 0.3);
  }

  pre {
    code ::v-deep {
      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #aaa;
      }

      .token.punctuation {
        color: #999;
      }

      .token.property,
      .token.tag,
      .token.boolean,
      .token.number,
      .token.constant,
      .token.symbol {
        color: #0cf;
      }

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin {
        color: royalblue;
      }

      .token.operator,
      .token.entity,
      .token.url,
      .toke.variable,
      .token.inserted {
        color: yellowgreen;
      }

      .token.atrule,
      .token.attr-value,
      .token.keyword {
        color: deeppink;
      }

      .token.script {
        color: hotpink;
      }

      .token.regex,
      .token.important {
        color: orange;
      }

      .token.deleted {
        color: red;
      }
    }
  }
</style>