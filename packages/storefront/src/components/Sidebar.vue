<template>
  <nav>
    <ais-instant-search index-name="some_index" :search-client="searchClient">
      <ais-search-box>
        <debounced-search-box :on-focus="shouldDisplayHits" v-on:query-change="shouldDisplayHits" />
      </ais-search-box>

      <ais-state-results>
        <template v-slot="{ results: { hits } }">
          {{ shouldHideNavigation(hits) }}
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
                      <router-link :to="hit.url">
                        {{ hit.page }} {{ hit.tab ? ' > ' + hit.tab : '' }}
                        <!-- >  {{ hit.name }}-->
                        <!--  <p-text>{{ hit.content }}</p-text>-->
                      </router-link>
                    </p-link-pure>
                  </li>
                </ul>
              </section>
            </template>
          </ais-hits>
        </template>
      </ais-state-results>
    </ais-instant-search>
    <template v-if="!this.hideNavigation">
      <p-accordion
        v-for="(pages, category, index) in config"
        :key="index"
        :heading="category"
        v-bind:open="accordion[category]"
        v-on:accordionChange="toggleActive(category)"
        compact="true"
      >
        <ul>
          <li v-for="(tabs, page, index) in pages" :key="index">
            <p-link-pure class="link" icon="none" :active="isActive(category, page)">
              <router-link :to="getRoute(category, page)">{{ page }}</router-link>
            </p-link-pure>
          </li>
        </ul>
      </p-accordion>
    </template>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import algoliasearch from 'algoliasearch/lite';
  import { createInMemoryCache } from '@algolia/cache-in-memory';
  import { Watch } from 'vue-property-decorator';
  import { StorefrontConfig } from '@/models';
  import { config as storefrontConfig } from '@/../storefront.config';
  import { capitalCase, paramCase } from 'change-case';
  import { Route } from 'vue-router';

  import DebouncedSearchBox from '@/components/DebouncedSearchBox.vue';

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
  export default class Sidebar extends Vue {
    public config: StorefrontConfig = storefrontConfig;
    public paramCase = paramCase;
    public accordion: { [id: string]: boolean } = {};
    public hideNavigation = false;
    public displayHits = false;

    public algoliaClient = algoliasearch('H4KMYOI855', '8201068bd25dcc4d4b33062150d5b4f5', {
      responsesCache: createInMemoryCache(),
      requestsCache: createInMemoryCache({ serializable: false }),
    });

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

    public getRoute(category: string, page: string): string {
      return `/${paramCase(category)}/${paramCase(page)}`;
    }

    public isActive(category: string, page: string): boolean {
      const route = this.getRoute(category, page);
      return this.$route.path.startsWith(route);
    }
    private created(): void {
      Object.keys(this.config).map((category) => {
        this.accordion[category] = false;
      });

      // sort components alphabetically
      const { Components: unorderedComponents } = this.config;
      const orderedComponents: typeof unorderedComponents = {};
      Object.keys(this.config.Components)
        .sort()
        .forEach((category) => {
          orderedComponents[category] = unorderedComponents[category];
        });
      this.config.Components = orderedComponents;
    }

    @Watch('$route')
    private onRouteChange(to: Route): void {
      this.accordion = { ...this.accordion, [Sidebar.category(to)]: true };
    }

    toggleActive(category: string): void {
      this.accordion = { ...this.accordion, [category]: !this.accordion[category] };
    }

    shouldHideNavigation(hits: AlgoliaResult[]): void {
      this.hideNavigation = this.displayHits && hits.length > 0;
    }

    shouldDisplayHits(query: string): void {
      this.displayHits = !!query;
    }

    private static category(route: Route): string {
      const { category } = route.params;
      return category ? capitalCase(category) : '';
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

  p-link-pure {
    width: 100%;
  }
</style>

<style lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  .hits-item {
    padding: $p-spacing-8 $p-spacing-32 $p-spacing-8;
  }
</style>
