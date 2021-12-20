<template>
  <ais-instant-search :index-name="getAlgoliaIndexName()" :search-client="searchClient">
    <ais-search-box>
      <debounced-search-box :on-focus="shouldDisplayHits" v-on:query-change="shouldDisplayHits" />
    </ais-search-box>

    <ais-state-results>
      <template v-slot="{ results: { hits } }">
        {{ onHitsChange(hits) }}
        <ais-hits
          v-show="displayHits"
          :transform-items="transformItems"
          :class-names="{
            'ais-Hits': 'hits',
            'ais-Hits-item': 'hits-item',
          }"
        >
          <template v-slot:item="{ item }">
            <section>
              <p-text :weight="'semibold'" :tag="'div'" :size="'small'" class="category">{{ item.category }}</p-text>
              <ul>
                <li v-for="(hit, index) in item.hits" :key="index">
                  <p-link-pure class="link" icon="none" @click="() => (displayHits = false)">
                    <router-link :to="hit.url"> {{ hit.page }} {{ hit.tab ? ' - ' + hit.tab : '' }} </router-link>
                  </p-link-pure>
                </li>
              </ul>
            </section>
          </template>
        </ais-hits>
      </template>
    </ais-state-results>
  </ais-instant-search>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import algoliasearch from 'algoliasearch/lite';
  import { createInMemoryCache } from '@algolia/cache-in-memory';
  import { ALGOLIA_APP_ID, ALGOLIA_READONLY_KEY } from '@/../storefront.config';
  import DebouncedSearchBox from '@/components/DebouncedSearchBox.vue';
  import { Prop } from 'vue-property-decorator';

  type AlgoliaRecord = {
    objectID: string;
    name: string;
    content: string;
    category: string;
    page: string;
    tab?: string;
    url: string;
  };

  type AlgoliaResult = {
    category: string;
    hits: AlgoliaRecord[];
  };

  type AlgoliaRequest = {
    indexName: string;
    params: AlgoliaRequestParams;
  };

  type AlgoliaRequestParams = {
    facets: string[];
    query: string;
    tagFilters: string;
    highlightPreTag?: string;
    highlightPostTag?: string;
  };

  @Component({
    components: {
      DebouncedSearchBox,
    },
  })
  export default class Search extends Vue {
    @Prop({ default: false }) public hideNavigation!: boolean;

    public algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_READONLY_KEY, {
      responsesCache: createInMemoryCache(),
      requestsCache: createInMemoryCache({ serializable: false }),
    });

    public displayHits = false;

    public searchClient = {
      ...this.algoliaClient,
      algoliaClient: this.algoliaClient,
      search(requests: AlgoliaRequest[]) {
        // remove initial search
        if (requests.every(({ params }: AlgoliaRequest) => !params?.query.trim())) {
          return Promise.resolve({
            results: requests.map(() => ({
              hits: [],
              nbHits: 0,
              nbPages: 0,
              page: 0,
              processingTimeMS: 0,
            })),
          });
        }
        return this.algoliaClient.search(requests);
      },
    };

    onHitsChange(hits: AlgoliaResult[]): void {
      this.$emit('hide-navigation-change', this.displayHits && hits.length > 0);
    }

    shouldDisplayHits(query: string): void {
      this.displayHits = !!query;
    }

    getAlgoliaIndexName(): string {
      const baseHref = (document.querySelector('base') as HTMLBaseElement).getAttribute('href') as string;
      // on localhost baseHref is '/'
      return baseHref.length > 1 ? baseHref.slice(1, -1).replace('/', '_') : 'localhost';
    }

    transformItems(items: AlgoliaRecord[]): AlgoliaResult[] {
      return items.reduce((results, current) => {
        const categoryIndex = results.findIndex((result) => result.category === current.category);
        if (categoryIndex >= 0) {
          // reduce amount of displayed hits per category to 5 when using distinct on PAGE instead of CATEGORY
          results[categoryIndex].hits.length < 5 && results[categoryIndex].hits.push(current);
        } else {
          results.push({ category: current.category, hits: [current] });
        }
        return results;
      }, [] as AlgoliaResult[]);
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  ul,
  li {
    list-style: none;
  }

  .link {
    width: 100%;
    margin: $p-spacing-4 0;
    display: inline-block;
    text-decoration: none;
  }
  .hits {
    position: absolute;
    width: p-px-to-rem(280px);
    background: $p-color-background-default;
    z-index: 1;
    left: 0;
  }
  .ais-SearchBox {
    margin-bottom: p-px-to-rem(24px);
  }

  .category {
    padding-bottom: $p-spacing-8;
  }
</style>

<style lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  .hits-item {
    padding: $p-spacing-8 $p-spacing-32 $p-spacing-8;
  }
</style>
