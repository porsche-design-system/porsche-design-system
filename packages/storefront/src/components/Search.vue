<template>
  <ais-instant-search :index-name="getAlgoliaIndexName()" :search-client="searchClient">
    <ais-search-box :class-names="{ 'ais-SearchBox': 'search' }">
      <debounced-search-box :on-focus="shouldDisplayHits" v-on:query-change="shouldDisplayHits" />
    </ais-search-box>
    <div v-show="displayHits" class="spacer">
      <ais-state-results>
        <template v-slot="{ results: { hits } }">
          {{ onHitsChange(hits) }}
          <ais-hits
            v-show="displayHits"
            :transform-items="transformItems"
            :class-names="{
              'ais-Hits': 'hits',
              'ais-Hits-item': 'hits__item',
            }"
          >
            <template v-slot:item="{ item }">
              <p-heading size="small" tag="h2" class="category">{{ item.category }}</p-heading>
              <ul>
                <li v-for="(hit, index) in item.hits" :key="index">
                  <p-link-pure class="link" icon="none" @click="() => (displayHits = false)">
                    <router-link :to="hit.url">{{ hit.page }} {{ hit.tab ? ' - ' + hit.tab : '' }}</router-link>
                  </p-link-pure>
                </li>
              </ul>
            </template>
          </ais-hits>
        </template>
      </ais-state-results>
    </div>
  </ais-instant-search>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import algoliasearch from 'algoliasearch/lite';
  import { createInMemoryCache } from '@algolia/cache-in-memory';
  import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_KEY } from '@/../storefront.config';
  import DebouncedSearchBox from '@/components/DebouncedSearchBox.vue';
  import { Prop } from 'vue-property-decorator';
  import type { AlgoliaRecord, AlgoliaRequest, AlgoliaResult } from '@/models';
  import { SearchClient } from 'algoliasearch/lite';

  @Component({
    components: {
      DebouncedSearchBox,
    },
  })
  export default class Search extends Vue {
    @Prop({ default: false }) public hideNavigation!: boolean;

    public algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_KEY, {
      responsesCache: createInMemoryCache(),
      requestsCache: createInMemoryCache({ serializable: false }),
    });

    public displayHits = false;

    public searchClient = {
      ...this.algoliaClient,
      search: (requests: AlgoliaRequest[]): ReturnType<SearchClient['search']> => {
        // remove initial search
        // https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/vue/#detecting-empty-search-requests
        if (requests.every(({ params }: AlgoliaRequest) => !params?.query.trim())) {
          return Promise.resolve({
            results: requests.map(() => ({
              hits: [],
              nbHits: 0,
              nbPages: 0,
              page: 0,
              processingTimeMS: 0,
            })),
          }) as unknown as ReturnType<SearchClient['search']>;
        } else {
          return this.algoliaClient.search(requests);
        }
      },
    };

    onHitsChange(hits: AlgoliaResult[]): void {
      this.$emit('onSearchActiveChange', this.displayHits && hits.length > 0);
    }

    shouldDisplayHits(query: string): void {
      this.displayHits = !!query;
    }

    getAlgoliaIndexName(): string {
      const baseHref = document.querySelector('base')!.getAttribute('href')!;
      // on localhost baseHref is '/'
      return baseHref.includes('/issue/')
        ? 'latest'
        : baseHref.length > 1
        ? baseHref.slice(1, -1).replace('/', '_')
        : 'latest';
    }

    transformItems(items: AlgoliaRecord[]): AlgoliaResult[] {
      return items.reduce((results, current) => {
        const categoryIndex = results.findIndex((result) => result.category === current.category);
        if (categoryIndex >= 0) {
          // reduce amount of displayed hits per category to 5 when using distinct on 'page' instead of 'category''
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
  @use '@porsche-design-system/components-js/styles' as *;

  .spacer {
    position: absolute;
    right: $pds-spacing-static-small;
    padding: 1.5rem;
    bottom: -24px;
    z-index: 1;
    filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.3));
    @include pds-media-query-min-max('base', 's') {
      right: initial;
      width: 100%;
      filter: none;
    }
  }

  .spacer::before {
    content: '';
    position: absolute;
    border-style: solid;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 12px 12px;
    border-color: transparent transparent $pds-theme-light-background-base;
    @include pds-media-query-min-max('base', 's') {
      top: 36px;
      bottom: initial;
    }
  }

  ul {
    list-style: none;
  }

  .ais-hits-list {
    list-style: none;
  }

  .link {
    width: 100%;
    margin: $pds-spacing-static-x-small 0;
    display: inline-block;
    text-decoration: none;
  }

  .hits {
    position: absolute;
    width: 17.5rem;
    max-height: 90vh;
    right: 0;
    top: $pds-spacing-static-x-large;
    padding: $pds-spacing-static-medium 0;
    border-radius: $pds-border-radius-small;
    background: $pds-theme-light-background-base;
    overflow: auto;
    z-index: 1;
    @include pds-media-query-min-max('base', 's') {
      width: 100%;
    }
  }

  .category {
    padding-bottom: $pds-spacing-static-small;
  }

  :deep(.hits__item) {
    list-style: none;
    @include pds-media-query-min('s') {
      padding: $pds-spacing-static-small $pds-spacing-static-large $pds-spacing-static-small;
    }
  }
</style>
