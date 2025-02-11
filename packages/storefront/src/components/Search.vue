<template>
  <ais-instant-search class="search" :index-name="getAlgoliaIndexName()" :search-client="searchClient">
    <ais-search-box :class-names="{ 'ais-SearchBox': 'search' }">
      <debounced-search-box :on-focus="shouldDisplayHits" v-on:query-change="shouldDisplayHits" />
    </ais-search-box>
    <div v-if="displayHits" class="spacer">
      <ais-state-results
        :class-names="{
          'ais-StateResults': 'state-results',
        }"
      >
        <template v-slot="{ results: { hits } }">
          {{ onHitsChange(hits) }}
          <ais-hits
            :transform-items="transformItems"
            :class-names="{
              'ais-Hits': 'hits',
              'ais-Hits-item': 'hits__item',
            }"
          >
            <template v-slot:item="{ item }">
              <p-heading :theme="storefrontTheme" size="small" tag="h2" class="category">{{ item.category }}</p-heading>
              <ul>
                <li v-for="(hit, index) in item.hits" :key="index">
                  <p-link-pure :theme="storefrontTheme" class="link" icon="none" @click="() => (displayHits = false)">
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
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_KEY } from '@/../storefront.config';
import DebouncedSearchBox from '@/components/DebouncedSearchBox.vue';
import type { AlgoliaRecord, AlgoliaRequest, AlgoliaResult } from '@/models';
import { type StorefrontTheme } from '@/models';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import algoliasearch from 'algoliasearch/lite';
import { SearchClient } from 'algoliasearch/lite';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
  components: {
    DebouncedSearchBox,
  },
})
export default class Search extends Vue {
  @Prop({ default: false }) public hideNavigation!: boolean;

  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  public algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_KEY, {
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache({ serializable: false }),
  });

  public displayHits = false;

  public searchClient = {
    ...this.algoliaClient,
    search: (requests: AlgoliaRequest[]): ReturnType<SearchClient['search']> => {
      // remove initial search
      // https://algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/vue/#detecting-empty-search-requests
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
    this.$store.commit('setIsSearchActive', this.displayHits && hits.length > 0);
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
  // TODO: the Search component can be simplified in general, in terms of markup, styles and javascript
  @use '@porsche-design-system/components-js/styles' as *;

  .search {
    position: relative;
  }

  .spacer {
    @include pds-media-query-min('m') {
      position: absolute;
      bottom: -20px;
      left: 50%;
      z-index: 1;
      filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.3));

      &::before {
        content: '';
        position: absolute;
        border-style: solid;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 12px 12px;
        border-color: transparent transparent var(--theme-custom-background-search);
      }
    }
  }

  .ais-hits-list,
  ul {
    list-style: none;
  }

  .link {
    width: 100%;
    margin: $pds-spacing-static-x-small 0;
    display: inline-block;
    text-decoration: none;
  }

  .state-results > div {
    @include pds-media-query-min('m') {
      position: absolute;
      width: 263px;
      max-height: 70vh;
      right: 0;
      top: 0;
      transform: translate(50%, 0);
      padding: $pds-spacing-static-medium 0;
      border-radius: $pds-border-radius-small;
      background: var(--theme-custom-background-search);
      overflow: auto;
      z-index: 1;
    }
  }

  .category {
    padding-bottom: $pds-spacing-static-small;
  }

  ::v-deep(.hits__item) {
    list-style: none;

    @include pds-media-query-max('m') {
      margin-top: $pds-spacing-fluid-large;
    }

    @include pds-media-query-min('m') {
      padding: $pds-spacing-static-small $pds-spacing-static-large $pds-spacing-static-small;
    }
  }
</style>
